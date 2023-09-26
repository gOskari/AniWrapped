import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AniWrapped',
  description: 'Cool site',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <nav className="absolute top-0 left-0 flex items-center bg-opacity-30 p-4">
          <Link href="/"className="text-2xl font-semibold text-white-500 ml-8 hover:text-gray-600">AniWrapped</Link>
        </nav>
        {children}
        <footer class="border-t border-gray-300 bg-transparent">
        <div className="container mx-auto text-center">
            <div className="mb-4">
              <a href="https://github.com/gOskari" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
                <i className="fab fa-github"></i> GitHub
              </a>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Copyright &copy; 2023 AniWrapped. All rights reserved.</p>
            </div>
          </div>
        </footer>
        </body>
    </html>
  )
}
