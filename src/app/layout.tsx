import { Metadata } from "next";
import "./globals.css";
import "@mantine/core/styles.css";
import { Header } from "@/components/header/header";
import { MantineProvider } from "@mantine/core";

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
        <MantineProvider>
          <Header />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
