export function generateSchemaMarkup() {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Shiv Shakti Home Appliance Services",
      "image": "https://www.shivshaktiss.in/logo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123, Main Market, Jaipur",
        "addressLocality": "Jaipur",
        "addressRegion": "RJ",
        "postalCode": "302001",
        "addressCountry": "IN"
      },
      "telephone": "+91-6375477987",
      "url": "https://www.shivshaktiss.in",
      "sameAs": [
        "https://www.facebook.com/shivshakti",
        "https://www.instagram.com/shivshakti"
      ]
    };
  }
  