import Image from "next/image";

type ProductCardProps = {
  nama: string;
  deskripsi: string;
  grade: string;
  fotoUrl?: string;
  spesifikasi?: string[];
};

export function ProductCard({ nama, deskripsi, grade, fotoUrl, spesifikasi }: ProductCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition">
      {fotoUrl && (
        <Image
          src={fotoUrl}
          alt={nama}
          width={400}
          height={250}
          className="mb-4 h-48 w-full rounded-lg object-cover"
        />
      )}
      <h3 className="text-xl font-semibold">{nama}</h3>
      <p className="text-sm text-brand-600 font-medium">Grade {grade}</p>
      <p className="mt-2 text-sm text-zinc-600">{deskripsi}</p>
      {spesifikasi?.length ? (
        <ul className="mt-3 list-disc pl-4 text-sm text-zinc-700">
          {spesifikasi.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
