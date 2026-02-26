import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = claimsData.claims.sub;
    const { event_id } = await req.json();

    if (!event_id) {
      return new Response(JSON.stringify({ error: "event_id is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch event details
    const { data: event, error: eventError } = await supabase
      .from("events")
      .select("*")
      .eq("id", event_id)
      .single();

    if (eventError || !event) {
      return new Response(JSON.stringify({ error: "Event not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!event.is_paid) {
      return new Response(JSON.stringify({ error: "This is a free event" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Determine price (early bird or regular)
    let amount = event.ticket_price || 0;
    if (event.early_bird_price && event.early_bird_seats) {
      // Count existing registrations to check early bird availability
      const adminClient = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
      );
      const { count } = await adminClient
        .from("event_registrations")
        .select("*", { count: "exact", head: true })
        .eq("event_id", event_id);

      if ((count || 0) < event.early_bird_seats) {
        amount = event.early_bird_price;
      }
    }

    const amountInPaise = Math.round(amount * 100);

    // Create Razorpay order
    const keyId = Deno.env.get("RAZORPAY_KEY_ID")!;
    const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET")!;

    const razorpayRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(`${keyId}:${keySecret}`),
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: "INR",
        receipt: `event_${event_id}_${userId}`.substring(0, 40),
        notes: {
          event_id,
          user_id: userId,
        },
      }),
    });

    if (!razorpayRes.ok) {
      const errText = await razorpayRes.text();
      console.error("Razorpay error:", errText);
      return new Response(JSON.stringify({ error: "Failed to create order" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const order = await razorpayRes.json();

    // Create a pending registration
    const { error: regError } = await supabase
      .from("event_registrations")
      .insert([{
        user_id: userId,
        event_id,
        status: "pending_payment",
        payment_status: "pending",
        payment_amount: amount,
        payment_id: order.id,
      }]);

    if (regError && regError.code !== "23505") {
      console.error("Registration error:", regError);
    }

    // Fetch user profile for prefill
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, email, phone")
      .eq("user_id", userId)
      .single();

    return new Response(
      JSON.stringify({
        order_id: order.id,
        amount: amountInPaise,
        currency: "INR",
        key_id: keyId,
        prefill: {
          name: profile?.full_name || "",
          email: profile?.email || "",
          contact: profile?.phone || "",
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
