export async function GET() {
    return new Response(
      JSON.stringify({
        title: "AC Repair in Jaipur | Refrigerator, Washing Machine & Home Services",
        description:
          "Best AC repair, refrigerator repair, washing machine repair & geyser repair services in Jaipur. Quick & reliable doorstep service.",
        keywords: "AC repair Jaipur, washing machine repair, refrigerator repair, geyser repair, home appliance repair Jaipur",
        image: "https://www.shivshaktiss.in/opengraph-image.jpg",
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
  