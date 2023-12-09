import Navbar from "./NavigationBar";
import Footer from "./Footer";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { ApolloWrapper } from "@/lib/ApolloWrapper";

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
        className={inter.className + " h-full bg-bg-color text-secondary-color"}
      >
          <Providers>
            <header className="fixed top-0">
              <Navbar />
            </header>
            <main className="flex justify-center">
              <div className="w-full bg-primary-color sm:mt-10 sm:w-2/4 sm:rounded-t-xl">
              <ApolloWrapper>{children}</ApolloWrapper>
              </div>
            </main>
            <footer className="mb-0 mt-1 flex justify-center sm:mb-10">
              <div className="w-full bg-primary-color p-10 sm:w-2/4 sm:rounded-b-xl">
                <Footer />
              </div>
            </footer>
          </Providers>
      </body>
    </html>
  );
}
