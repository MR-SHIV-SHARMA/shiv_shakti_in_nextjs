export function generateHreflangTags(locale) {
    return [
      `<link rel="alternate" hreflang="en" href="https://www.shivshaktiss.in/en/" />`,
      `<link rel="alternate" hreflang="hi" href="https://www.shivshaktiss.in/hi/" />`,
    ].join("\n");
  }
  