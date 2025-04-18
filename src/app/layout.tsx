import type { Metadata } from "next";

import { Header } from "@/components/Header";
import { ThemeContextProvider } from "@/hooks/useTheme";

import "./globals.scss";
import { LoginContextProvider } from "@/context/LoginContext";

export const metadata: Metadata = {
  title: "Save Money",
  description: "App de gestão financeira",
};

export default function RootLayout({ children } : { children: React.ReactNode }) {
  return (
    <html lang="en">

      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <link 
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"
        />
        
      </head>

      <body>
        <LoginContextProvider>
          <ThemeContextProvider>
            <Header />
            {children}
          </ThemeContextProvider>
        </LoginContextProvider>
      </body>
      
    </html>
  );
}
