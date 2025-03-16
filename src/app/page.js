import HomeComponent from "@/components/home/Home";

export const metadata = {
  title: "Home | Shiv Shakti Home Appliance Services",
  description:
    "Best AC Repair & Installation Services in Jaipur. Get expert help now!",
  keywords: "AC repair Jaipur, AC service, home appliance repair",
  openGraph: {
    title: "Best AC Repair & Installation Services",
    description:
      "Expert home appliance repair & AC services in Jaipur. Contact now!",
    url: "https://yourwebsite.com/",
    images: ["https://yourwebsite.com/og-image.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home | Shiv Shakti Home Appliance Services",
    description:
      "Top-rated AC repair services in Jaipur with 24/7 expert support.",
    images: ["https://yourwebsite.com/og-image.jpg"],
  },
};

export default function HomePage() {
  return <HomeComponent />;
}
