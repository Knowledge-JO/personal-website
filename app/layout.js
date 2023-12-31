import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Knowledge JO",
  description:
    "Knowledge Okhakumhe, a skilled frontend and backend developer,creating complex APIs and full stack webb Apps with python-django, building secure and gase efficient smart contracts on Ethereum and other EVM compatible blockchains. Using latest frontend frameworks to craft reponsive and lightening fast websites.",
  publisher: "Knowledge Okhakumhe",
  authors: [
    { name: "Knowledge Okhakumhe", url: "https://knowledgejo.vercel.app/" },
  ],
  metadataBase: new URL("https://knowledgejo.vercel.app/"),
  openGraph: {
    title: "Knowledge Okhakumhe | Skilled Frontend and backend Developer",
    description:
      "Knowledge Okhakumhe, a skilled frontend and backend developer,creating complex APIs and full stack webb Apps with python-django, building secure and gase efficient smart contracts on Ethereum and other EVM compatible blockchains. Using latest frontend frameworks to craft reponsive and lightening fast websites.",
    url: "https://knowledgejo.vercel.app/",
    siteName: "KnowledgeJO",
    images: [
      {
        url: "/thumbnail.png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
  twitter: {
    card: "summary_large_image",
    title: "Knowledge Okhakumhe | Skilled Frontend and backend Developer",
    description:
      "Knowledge Okhakumhe, a skilled frontend and backend developer,creating complex APIs and full stack webb Apps with python-django, building secure and gase efficient smart contracts on Ethereum and other EVM compatible blockchains. Using latest frontend frameworks to craft reponsive and lightening fast websites.",
    creator: "KnowledgeJO",
    images: ["/thumbnail.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
