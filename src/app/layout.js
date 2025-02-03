"use client"
import NavBar from "./components/NavBar";
import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <title>Quanto eu devo?</title>
        {children}
      </body>
    </html>
  );
}
