import Navbar from "./NavigationBar";
import Footer from "./Footer";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { ApolloWrapper } from "@/lib/ApolloWrapper";
import GlowingBallsBackground from "./GlowingBall";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AniWrapped",
  description: "Search and compare among 9394903 active AniList users!",
  metadataBase: new URL("https://s4.anilist.co"),
  openGraph: {
    title: "AniWrapped",
    description: "Search and compare among 9394903 active AniList users!",
    //url: 'https://nextjs.org',
    //siteName: 'Next.js',
    images: [
      {
        url: "/file/anilistcdn/media/anime/banner/99420-wwjSxDuLveEu.jpg",
        width: 800,
        height: 600,
      },
      {
        url: "/file/anilistcdn/media/anime/banner/99420-wwjSxDuLveEu.jpg",
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body
        className={inter.className + " h-full bg-bg-color text-secondary-color"}>
          <Providers>
            <div className="z-0">
              <GlowingBallsBackground />
            </div>
            <header className="fixed glow-no-bottom top-0 z-50">
              <Navbar />
            </header>
            <div className="flex justify-center sm:mt-10 sm:mb-10 ">
            <div className="w-full glow-no-bottom sm:w-2/4 sm:rounded-xl">
            <main className="flex justify-center">
              <div className="w-full bg-primary-color z-10 min-h-screen sm:rounded-t-xl">
              <ApolloWrapper>{children}</ApolloWrapper>
              </div>
            </main>
            <footer className="mb-0 border-transparent border flex justify-center">
              <div className="w-full bg-primary-color p-10 sm:rounded-b-xl">
                <Footer />
              </div>
            </footer>
            </div>
            </div>
          </Providers>
      </body>
    </html>
  );
}
