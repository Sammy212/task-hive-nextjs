import { Public_Sans } from "next/font/google";
import "./globals.css";
import "@/styles/typography.css";
import StyledComponentsRegistry from "@/lib/AntRegistry";
import { ClerkProvider } from "@clerk/nextjs";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"]
});

export const metadata = {
  title: "TaskHive",
  description: "Building Bridges Between Work and Life",
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  minimumScale: 1.0,
  maximumScale: 1.0,
  userScalable: "no",
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        signIn: {
          variables: { colorPrimary: "#f9aa11"},
        },
        signUp: {
          variables: { colorPrimary: "#f9aa11"},
        },
      }}
    >
      <html lang="en">
        <body className={publicSans.className}>
          <StyledComponentsRegistry>
            {children}
          </StyledComponentsRegistry>
        </body>
      </html>
    </ClerkProvider>
  );
}
