import { Orbitron, Rajdhani, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Chrome } from "./chrome";

const display = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const body = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

const description =
  "Knowledge Okhakumhe — AI infrastructure engineer. Model Context Protocol servers, retrieval-augmented memory, prompt compilation, and agent tool surfaces with real permission boundaries. Open to roles in the US, UK, Germany, UAE and Australia.";

export const metadata = {
  title: {
    default: "Knowledge Okhakumhe | AI Infrastructure Engineer",
    template: "%s | Knowledge Okhakumhe",
  },
  description,
  keywords: [
    "Knowledge Okhakumhe",
    "AI infrastructure engineer",
    "backend engineer",
    "TypeScript",
    "NestJS",
    "Next.js",
    "PostgreSQL",
    "Model Context Protocol",
    "RAG",
    "pgvector",
    "full-stack engineer",
  ],
  publisher: "Knowledge Okhakumhe",
  authors: [
    { name: "Knowledge Okhakumhe", url: "https://knowledgejo.vercel.app/" },
  ],
  metadataBase: new URL("https://knowledgejo.vercel.app/"),
  openGraph: {
    title: "Knowledge Okhakumhe | AI Infrastructure Engineer",
    description,
    url: "https://knowledgejo.vercel.app/",
    siteName: "Knowledge Okhakumhe",
    images: [{ url: "/thumbnail.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Knowledge Okhakumhe | AI Infrastructure Engineer",
    description,
    creator: "@Knowledge_JO",
    images: ["/thumbnail.png"],
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport = {
  themeColor: "#03040a",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="font-sans antialiased">
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}
