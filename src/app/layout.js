import Navbar from "./NavigationBar";
import Footer from "./Footer"
import "../styles/globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AniWrapped",
  description: "Cool site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" >
      <body className={inter.className + " bg-bg-color text-secondary-color"}>
        <header className="fixed top-0">
          <Navbar />
        </header>
        <main className="flex justify-center">
          <div className="w-2/4 mt-10 bg-primary-color rounded-t-xl">
          {children}
          </div>
        </main>
        <footer className="mb-10 mt-1 flex justify-center">
          <div className="w-2/4 bg-primary-color p-10 rounded-b-xl">
            <Footer />
          </div>
        </footer>
      </body>
    </html>
  );
}
