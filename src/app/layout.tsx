import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/sidebar";
import { WorkArea } from "@/components/work-area";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xperiments",
  description: "Design engineering practice — components, animations, transitions.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex h-full min-h-screen">
        <Sidebar />
        <WorkArea>{children}</WorkArea>
      </body>
    </html>
  );
}
