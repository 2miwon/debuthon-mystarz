import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./Providiers";

export const metadata: Metadata = {
  title: "MyStarz",
  description: "내가 가장 빛이 날 때,스타와 내가 함께 증명하는 지금",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
