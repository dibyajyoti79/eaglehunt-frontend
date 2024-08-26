import { resourcesLinks, platformLinks, communityLinks } from "../constants";
import { Linkedin, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-20 border-t py-10 border-neutral-700">
      {/* <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <h3 className="text-md font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            {resourcesLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-neutral-300 hover:text-white"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-4">Platform</h3>
          <ul className="space-y-2">
            {platformLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-neutral-300 hover:text-white"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-4">Community</h3>
          <ul className="space-y-2">
            {communityLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-neutral-300 hover:text-white"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div> */}
      <div className="container mx-auto flex flex-col items-center">
        <p className="text-sm mb-4">
          &copy; {new Date().getFullYear()} EHC. All rights reserved.
        </p>
        <div className="flex space-x-6 mb-4">
          <a
            href="https://www.linkedin.com/company/ehc"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin className="text-neutral-400 hover:text-blue-600 transition duration-200 w-6 h-6" />
          </a>
          <a
            href="https://www.facebook.com/ehc"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <Facebook className="text-neutral-400 hover:text-blue-600 transition duration-200 w-6 h-6" />
          </a>
          <a
            href="https://twitter.com/ehc"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <Twitter className="text-neutral-400 hover:text-blue-600 transition duration-200 w-6 h-6" />
          </a>
          <a
            href="https://www.instagram.com/ehc"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram className="text-neutral-400 hover:text-blue-600 transition duration-200 w-6 h-6" />
          </a>
        </div>
        <p className="text-sm text-neutral-500">
          Designed and developed by EHC.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
