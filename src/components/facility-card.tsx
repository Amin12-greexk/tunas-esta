import Image from "next/image";

type FacilityCardProps = {
  nama: string;
  lokasi: string;
  kapasitas: string;
  deskripsi: string;
  fotoUrl?: string;
};

export function FacilityCard({ nama, lokasi, kapasitas, deskripsi, fotoUrl }: FacilityCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition">
      {fotoUrl && (
        <Image
          src={fotoUrl}
          alt={nama}
          width={500}
          height={300}
          className="mb-4 h-48 w-full rounded-lg object-cover"
        />
      )}
      <h3 className="text-xl font-semibold">{nama}</h3>
      <p className="text-sm text-brand-600">{lokasi}</p>
      <p className="mt-2 text-sm text-zinc-600">{deskripsi}</p>
      {kapasitas && (
        <p className="mt-2 text-xs font-medium text-zinc-700">Kapasitas: {kapasitas}</p>
      )}
    </div>
  );
}
