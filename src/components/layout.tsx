import type { PropsWithChildren } from "react";
import { Header } from "./header";
import { Facebook, Instagram, TwitterIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function Layout({ children }: PropsWithChildren) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-gradient-to-br from-background to-muted">
      <Header />
      <main className="min-h-screen container mx-auto px-4 py-6 md:py-8">
        {children}
      </main>
      <footer className="border-t backdrop-blur supports-[backdrop-filter]:bg-background/60 py-6">
        <div className="container mx-auto px-4 text-center text-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold text-muted-foreground text-sm md:text-base">About Us</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                We are dedicated to providing accurate and up-to-date weather information.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-muted-foreground text-sm md:text-base">Contact</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Email: support@weatherapp.com
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">
                Phone: <span className="font-medium text-blue-400">+256 750 000 000 </span>
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-muted-foreground pb-2 md:pb-3 text-sm md:text-base">Follow Us</h3>
              <div className="flex justify-center space-x-4 md:space-x-6">
                <Link to="#" className="text-muted-foreground hover:text-blue-500">
                  <TwitterIcon size={20} />
                </Link>
                <Link to="#" className="text-muted-foreground hover:text-blue-600">
                  <Facebook size={20} />
                </Link>
                <Link to="#"  className="text-muted-foreground hover:text-pink-600">
                  <Instagram size={20} />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-xs md:text-sm text-muted-foreground">
              &copy; {currentYear} WeatherApp. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}