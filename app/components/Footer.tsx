import Image from "next/image";
import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TikTokIcon,
} from "./icons/SocialIcons";

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    Icon: InstagramIcon,
    hover: "hover:text-[#E4405F] hover:border-[#E4405F] hover:bg-[#E4405F]/10",
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    Icon: FacebookIcon,
    hover: "hover:text-[#1877F2] hover:border-[#1877F2] hover:bg-[#1877F2]/10",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    Icon: LinkedInIcon,
    hover: "hover:text-[#38B6FF] hover:border-[#38B6FF] hover:bg-[#38B6FF]/10",
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    Icon: TikTokIcon,
    hover: "hover:text-[#25F4EE] hover:border-[#25F4EE] hover:bg-[#25F4EE]/10",
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
      <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-6 px-6 py-10 sm:px-10">
        <div className="flex items-center gap-6">
          {SOCIAL_LINKS.map(({ label, href, Icon, hover }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`flex h-20 w-20 items-center justify-center rounded-full border border-line-strong text-muted transition-colors ${hover}`}
            >
              <Icon className="h-10 w-10" />
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
