import { Geist, Instrument_Serif } from "next/font/google";
import Link from "next/link";
import Header from "@/app/components/Header";
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Morrow — Good things for every day",
    template: "%s | Morrow",
  },
  description:
    "Thoughtful finds for the way you live. Meet the pieces you’ll reach for, day after day.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <div className="bg-forest px-4 py-2.5 text-center text-[11px] font-medium tracking-[0.12em] text-paper/90 sm:text-xs">
          GOOD THINGS, PICKED WITH CARE <span className="px-2 text-paper/45">·</span> A LITTLE MORE EVERYDAY
        </div>
        <Header />
        <div className="flex-1">{children}</div>
        <footer id="footer" className="bg-forest text-paper">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-12 lg:px-12 lg:py-20">
            <div className="lg:col-span-7">
              <Link
                href="/"
                className="font-serif text-6xl leading-none tracking-[-0.05em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper sm:text-8xl"
              >
                morrow<span className="text-paper/65">.</span>
              </Link>
              <p className="mt-5 max-w-sm text-sm leading-6 text-paper/75">
                Good things, picked with care. A little more everyday.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-sm lg:col-span-5 lg:pt-3">
              <div>
                <p className="mb-4 text-[11px] uppercase tracking-[0.16em] text-paper/55">
                  Browse
                </p>
                <Link
                  href="/#collection"
                  className="block py-1 text-paper underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
                >
                  The collection
                </Link>
                <Link
                  href="/cart"
                  className="block py-1 text-paper underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
                >
                  Your cart
                </Link>
              </div>
              <div>
                <p className="mb-4 text-[11px] uppercase tracking-[0.16em] text-paper/55">
                  The shop
                </p>
                <Link
                  href="/#about"
                  className="block py-1 text-paper underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
                >
                  How we choose
                </Link>
                <Link
                  href="/"
                  className="block py-1 text-paper underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
                >
                  Back to the beginning
                </Link>
              </div>
            </div>
            <p className="border-t border-paper/20 pt-5 text-xs text-paper/60 lg:col-span-12">
              © {new Date().getFullYear()} Morrow. Good things for the everyday.
            </p>
          </div>
        </footer>
        <SpeedInsights />
      </body>
    </html>
  );
}
