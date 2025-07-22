import { Instagram } from "lucide-react";
import { Facebook } from "lucide-react";
import { Twitter } from "lucide-react";
import { Youtube } from "lucide-react";
export default function Footer() {
    return (
        <footer className="flex flex-col items-center justify-center w-full py-20 bg-[#432507]  text-white/70">
            <div className="flex items-center gap-2">
                <img src="/icon.png" alt="icon" />
                <h1 className="text-2xl font-bold">Releaf</h1>
            </div>
            <p className="mt-4 text-center">
                Copyright © {new Date().getFullYear()} Releaf. All rights
                reserved.
            </p>
            <div className="flex items-center gap-4 mt-5">
                <Instagram />
                <Facebook />
                <Twitter />
                <Youtube />
            </div>
        </footer>
    );
}
