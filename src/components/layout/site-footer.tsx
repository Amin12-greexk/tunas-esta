import Link from "next/link";

type FooterProps = {
  logoUrl?: string;
  siteTitle: string;
  socials?: {
    instagram?: string;
    linkedin?: string;
    whatsapp?: string;
    email?: string;
    phone?: string;
  };
};

export function SiteFooter({ logoUrl, siteTitle, socials }: FooterProps) {
  return (
    <footer className="border-t bg-zinc-50">
      <div className="container flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
        <div className="flex items-center gap-3">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt={`${siteTitle} Logo`} className="h-10 w-auto" />
          ) : (
            <span className="font-semibold">{siteTitle}</span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600">
          {socials?.instagram && <Link href={socials.instagram}>Instagram</Link>}
          {socials?.linkedin && <Link href={socials.linkedin}>LinkedIn</Link>}
          {socials?.whatsapp && <Link href={socials.whatsapp}>WhatsApp</Link>}
          {socials?.email && <Link href={`mailto:${socials.email}`}>Email</Link>}
          {socials?.phone && <Link href={`tel:${socials.phone}`}>{socials.phone}</Link>}
        </div>
      </div>
    </footer>
  );
}
