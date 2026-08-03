import type { Metadata } from "next";
import type { ReactNode } from "react";
import "gra-ui/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "gra-ui",
  description: "React components composed with shadcn/ui.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
