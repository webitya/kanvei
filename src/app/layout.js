

import "./globals.css";


import NavbarSwitcher from "@/component/navbar/NavbarSwitcher";

export const metadata = {
  title: "Welcome to Kanvei Home Page",
  description: "India's No. eccomerce Plotform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
                <body >
                   <NavbarSwitcher/>
                    {children}
               </body>
    </html>
  );
}
