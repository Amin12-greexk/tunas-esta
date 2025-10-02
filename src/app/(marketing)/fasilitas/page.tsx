// src/app/(marketing)/fasilitas/page.tsx
import { fetchSanity } from "@/lib/sanity.client";
import { qAllFasilitas } from "@/lib/sanity.queries";
import { FacilityCard } from "@/components/facility-card";

type Facility = {
  _id: string;
  nama?: string;
  lokasi?: string;
  kapasitas?: string | number;
  deskripsi?: string;
  fotoUrl?: string;
};

export default async function FasilitasPage() {
  const fasilitas = await fetchSanity<Facility[]>(qAllFasilitas);

  return (
    <main className="container py-16">
      <h1 className="text-3xl font-bold">Fasilitas</h1>
      <p className="mt-2 text-zinc-600">
        Infrastruktur produksi walet modern &amp; higienis.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {fasilitas?.length ? (
          fasilitas.map((f) => (
            <FacilityCard
              key={f._id}
              nama={f.nama ?? ""}
              lokasi={f.lokasi ?? ""}
              kapasitas={String(f.kapasitas ?? "")}
              deskripsi={f.deskripsi ?? ""}
              fotoUrl={f.fotoUrl}
            />
          ))
        ) : (
          <p>Belum ada data fasilitas di CMS.</p>
        )}
      </div>
    </main>
  );
}
