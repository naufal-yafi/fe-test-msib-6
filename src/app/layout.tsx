import Footer from "@component/Footer";
import DarkModeProvider from "@config/DarkModeProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FE Test ADS Digital Partner - Web NextJS | Muhammad Naufal Yafi'",
  description: "Technology using NextJS and MUI",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>
        <DarkModeProvider>{children}</DarkModeProvider>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
