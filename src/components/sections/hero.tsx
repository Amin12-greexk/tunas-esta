import Image from "next/image";
import Link from "next/link";

type HeroProps = {
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  bgUrl?: string;
};

export function Hero({ headline, subheadline, ctaText, ctaHref, bgUrl }: HeroProps) {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-zinc-100">
      {bgUrl && (
        <Image
          src={bgUrl}
          alt="Hero background"
          fill
          className="object-cover opacity-40"
          priority
        />
      )}

      <div className="relative z-10 container text-center">
        <h1 className="text-4xl font-bold text-zinc-900 md:text-6xl">{headline}</h1>
        {subheadline && (
          <p className="mt-4 text-lg text-zinc-700 md:text-xl">{subheadline}</p>
        )}
        {ctaText && ctaHref && (
          <Link
            href={ctaHref}
            className="mt-6 inline-block rounded-xl bg-brand-500 px-6 py-3 font-medium text-white hover:bg-brand-600"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  );
}
