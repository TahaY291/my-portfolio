import type { Metadata } from "next";
import './globals.css'



export const metadata: Metadata = {
  title: "Portfolio — Creative Developer",
  description: "Personal portfolio showcasing projects and skills",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}