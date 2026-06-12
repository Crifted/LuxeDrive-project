import "./globals.css";

export const metadata = {
  title: "LuxeDrive — Exclusive Automobiles",
  description: "Een persoonlijk geselecteerde collectie van de meest begeerde hyper- en supercars.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
