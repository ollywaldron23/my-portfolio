// app/layout.js
import { Roboto_Flex } from "next/font/google";
import "./globals.css";

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
  weight: ["100", "400", "700"],
});

export const metadata = {
  title: "My Portfolio",
  description: "Personal portfolio site",
  icons: {
    icon: "/icon.png",  // <-- add your favicon path here
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" />
        {/* You can add other icon sizes here */}
      </head>
      <body className={robotoFlex.className}>
        <div id="app">
          {children}
          <footer className="site-footer">
            <p>© 2025 Oliver Waldron</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
