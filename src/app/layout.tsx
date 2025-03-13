import { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header/header";

export const metadata: Metadata = {
  title: "firstblog",
  description: "firstblog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
