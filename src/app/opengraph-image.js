export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png"; // या image/jpeg

export default function ogImage() {
  return new Response(
    "<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='630'>" +
      "<rect width='100%' height='100%' fill='black'/>" +
      "<text x='50%' y='50%' font-size='48' fill='white' text-anchor='middle'>My OpenGraph Image</text>" +
      "</svg>",
    {
      headers: { "Content-Type": contentType },
    }
  );
}
