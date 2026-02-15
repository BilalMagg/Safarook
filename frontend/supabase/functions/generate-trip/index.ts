import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { budget, duration, transport, styles } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are an expert Morocco travel planner AI. Generate a detailed day-by-day itinerary for a trip to Morocco.

IMPORTANT: You MUST respond by calling the "generate_itinerary" function. Do not respond with plain text.

Consider these inputs:
- Budget: $${budget} USD total
- Duration: ${duration} days
- Transport: ${transport}
- Travel styles: ${styles.join(", ")}

Create a realistic, detailed itinerary with actual Moroccan cities and attractions. Include cost estimates that fit within the budget. Suggest practical travel times between locations based on the transport method.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Plan a ${duration}-day Morocco trip with a $${budget} budget using ${transport}, focusing on: ${styles.join(", ")}.` },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_itinerary",
              description: "Generate a structured Morocco travel itinerary",
              parameters: {
                type: "object",
                properties: {
                  title: { type: "string", description: "A catchy title for the trip" },
                  days: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        day: { type: "number" },
                        city: { type: "string" },
                        activities: { type: "array", items: { type: "string" } },
                        cost: { type: "string", description: "Estimated cost for the day e.g. '$45'" },
                        travelTime: { type: "string", description: "Travel time from previous city if applicable" },
                      },
                      required: ["day", "city", "activities", "cost"],
                      additionalProperties: false,
                    },
                  },
                  totalCost: { type: "string", description: "Total estimated trip cost" },
                  tips: { type: "array", items: { type: "string" }, description: "3-5 practical travel tips" },
                },
                required: ["title", "days", "totalCost", "tips"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "generate_itinerary" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits depleted. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall) {
      throw new Error("No tool call in AI response");
    }

    const itinerary = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(itinerary), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-trip error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
