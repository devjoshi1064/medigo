import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const inter = Inter({
  subsets: ["latin"],
})

export const metadata = {
  title: "MediGO - Doctor Appointment Platform",
  description: "Connect with doctors anywhere, anytime with MediMeet.",
};

<meta
  name="format-detection"
  content="telephone=no, date=no, email=no, address=no"
/>

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning={true}>
        <body
          className={`${inter.className} highlighter-context`}  cz-shortcut-listen="true"
          suppressHydrationWarning={true}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* header */}
            <Header />
            <main className="min-h-screen ">
              {children}
            </main>
            {/* footer */}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
