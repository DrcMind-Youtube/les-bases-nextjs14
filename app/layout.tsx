import type { Metadata } from "next";
import { Raleway, Ubuntu } from "next/font/google";
import "./globals.css";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cours Nextjs ",
  description: "Cours Nextjs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="cupcake">
      <body className={raleway.className}>{children}</body>
    </html>
  );
}
