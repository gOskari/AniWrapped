import Navbar from "./NavigationBar";
import Footer from "./Footer"
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AniWrapped",
  description: "Cool site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <footer class="border-t border-white/20 bg-transparent">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
