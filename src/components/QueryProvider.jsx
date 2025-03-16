"use client"; // ✅ Ye file Client Component hoga

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; // ✅ Import Devtools
import { useState } from "react";

export default function QueryProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient()); // ✅ QueryClient ko state me rakho

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} /> {/* ✅ Add Devtools */}
    </QueryClientProvider>
  );
}
