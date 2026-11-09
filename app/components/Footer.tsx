import Image from "next/image";
import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TikTokIcon,
} from "./icons/SocialIcons";
import { iconButtonClass } from "./icons/iconButtonClass";

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/labbspace",
    Icon: InstagramIcon,
    hover: "hover:text-[#E4405F]",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/labbspace",
    Icon: FacebookIcon,
    hover: "hover:text-[#1877F2]",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/labbspace",
    Icon: LinkedInIcon,
    hover: "hover:text-[#38B6FF]",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@labbspace",
    Icon: TikTokIcon,
    hover: "hover:text-[#25F4EE]",
  },
];

const FOOTER_LINKS = [
  { label: "Kontakt", href: "/kontakt" },
  { label: "Regulamin wynajmu", href: "/regulamin-wynajmu" },
  { label: "Regulamin Studia", href: "/regulamin-studia" },
  { label: "Polityka Prywatności", href: "/polityka-prywatnosci" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-6 px-6 py-10 tablet:px-10">
        <div className="flex items-center gap-6">
          {SOCIAL_LINKS.map(({ label, href, Icon, hover }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`${iconButtonClass} ${hover}`}
            >
              <Icon className="relative h-7.5 w-7.5" />
            </a>
          ))}
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-paper"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Image
          src="/images/LABB_Lowercase_W.png"
          alt="LABB Studio"
          width={300}
          height={170}
          className="h-12 w-auto object-contain opacity-80"
        />
      </div>
    </footer>
  );
}
