export async function GET() {
    return new Response(
      JSON.stringify({
        title: "Best AC Repair in Jaipur | Shiv Shakti Services",
        description: "Top-rated AC repair & home appliance services in Jaipur. Book now!",
        image: "https://www.shivshaktiss.in/opengraph-image.jpg",
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
  