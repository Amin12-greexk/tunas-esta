// src/components/job-application-form.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, X, CheckCircle, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useI18n } from "@/lib/i18n";

const applicationSchema = z.object({
  fullName: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Alamat email tidak valid"),
  phone: z.string().min(10, "Nomor telepon minimal 10 digit"),
  coverLetter: z.string().min(50, "Surat lamaran minimal 50 karakter"),
  yearsOfExperience: z.string(),
  currentCompany: z.string().optional(),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  portfolioUrl: z.string().url().optional().or(z.literal("")),
  availability: z.string(),
  expectedSalary: z.string().optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

export function JobApplicationForm({
  jobTitle,
  emailTo,
}: {
  jobTitle: string;
  emailTo: string;
}) {
  const { t } = useI18n();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast({
          title: t("job.form.fileTooLarge.title", "File terlalu besar"),
          description: t("job.form.fileTooLarge.desc", "Unggah file di bawah 5MB"),
          variant: "destructive",
        });
        return;
      }
      setResumeFile(file);
    }
  };

  const onSubmit = async (data: ApplicationFormData) => {
    if (!resumeFile) {
      toast({
        title: t("job.form.cvRequired.title", "CV wajib diunggah"),
        description: t("job.form.cvRequired.desc", "Silakan unggah CV Anda"),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Build multipart payload so backend bisa terima file + fields
      const formData = new FormData();
      formData.append("jobTitle", jobTitle);
      formData.append("emailTo", emailTo);
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("coverLetter", data.coverLetter);
      formData.append("yearsOfExperience", data.yearsOfExperience);
      if (data.currentCompany) formData.append("currentCompany", data.currentCompany);
      formData.append("linkedinUrl", data.linkedinUrl ?? "");
      formData.append("portfolioUrl", data.portfolioUrl ?? "");
      formData.append("availability", data.availability);
      if (data.expectedSalary) formData.append("expectedSalary", data.expectedSalary);
      formData.append("resume", resumeFile);

      // TODO: ganti endpoint ini sesuai API-mu (mis. /api/job-applications)
      // Contoh POST; biar tidak error tanpa backend, ini di-comment:
      // const resp = await fetch("/api/job-applications", { method: "POST", body: formData });
      // if (!resp.ok) throw new Error("Failed to submit application");

      // Simulasi submit sukses (hapus kalau sudah pakai fetch asli)
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setIsSubmitted(true);
      toast({
        title: t("job.form.success.title", "Lamaran terkirim!"),
        description: t("job.form.success.desc", "Kami akan meninjau dan menghubungi Anda segera."),
      });

      setTimeout(() => {
        reset();
        setResumeFile(null);
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Submit application error:", error);
      toast({
        title: t("job.form.error.title", "Terjadi kesalahan"),
        description: t("job.form.error.desc", "Gagal mengirim lamaran. Coba lagi."),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header / Context */}
      <div className="rounded-xl border border-zinc-200 bg-white p-4 sm:p-5">
        <p className="text-sm text-zinc-600">
          {t("job.form.applying", "Melamar untuk:")} <span className="font-semibold text-zinc-900">{jobTitle}</span>
        </p>
        <p className="mt-1 text-xs text-zinc-500">
          {t("job.form.routed", "Lamaran akan dikirim ke:")} <span className="font-mono">{emailTo}</span>
        </p>
      </div>

      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-900">{t("job.form.personal", "Data Pribadi")}</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-zinc-700">
              {t("job.form.name", "Nama Lengkap *")}
            </label>
            <input
              {...register("fullName")}
              id="fullName"
              type="text"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="Nama Anda"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-700">
              {t("job.form.email", "Alamat Email *")}
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="email@contoh.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-zinc-700">
              {t("job.form.phone", "Nomor Telepon *")}
            </label>
            <input
              {...register("phone")}
              id="phone"
              type="tel"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="+62 812 3456 7890"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="currentCompany" className="mb-2 block text-sm font-medium text-zinc-700">
              {t("job.form.company", "Perusahaan Saat Ini")}
            </label>
            <input
              {...register("currentCompany")}
              id="currentCompany"
              type="text"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="PT Contoh Indonesia"
            />
          </div>
        </div>
      </div>

      {/* Professional Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-900">{t("job.form.professional", "Informasi Profesional")}</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="yearsOfExperience" className="mb-2 block text-sm font-medium text-zinc-700">
              {t("job.form.experience", "Pengalaman Kerja *")}
            </label>
            <select
              {...register("yearsOfExperience")}
              id="yearsOfExperience"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Pilih pengalaman</option>
              <option value="0-1">0-1 tahun</option>
              <option value="1-3">1-3 tahun</option>
              <option value="3-5">3-5 tahun</option>
              <option value="5-10">5-10 tahun</option>
              <option value="10+">10+ tahun</option>
            </select>
            {errors.yearsOfExperience && (
              <p className="mt-1 text-sm text-red-600">{errors.yearsOfExperience.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="availability" className="mb-2 block text-sm font-medium text-zinc-700">
              {t("job.form.availability", "Ketersediaan *")}
            </label>
            <select
              {...register("availability")}
              id="availability"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Pilih ketersediaan</option>
              <option value="immediately">Siap segera</option>
              <option value="2weeks">Notice 2 minggu</option>
              <option value="1month">Notice 1 bulan</option>
              <option value="2months">Notice 2 bulan</option>
              <option value="other">Lainnya</option>
            </select>
            {errors.availability && (
              <p className="mt-1 text-sm text-red-600">{errors.availability.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="linkedinUrl" className="mb-2 block text-sm font-medium text-zinc-700">
              {t("job.form.linkedin", "Profil LinkedIn")}
            </label>
            <input
              {...register("linkedinUrl")}
              id="linkedinUrl"
              type="url"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="https://linkedin.com/in/nama"
            />
            {errors.linkedinUrl && (
              <p className="mt-1 text-sm text-red-600">{errors.linkedinUrl.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="portfolioUrl" className="mb-2 block text-sm font-medium text-zinc-700">
              {t("job.form.portfolio", "Portofolio/Situs")}
            </label>
            <input
              {...register("portfolioUrl")}
              id="portfolioUrl"
              type="url"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="https://contoh.com"
            />
            {errors.portfolioUrl && (
              <p className="mt-1 text-sm text-red-600">{errors.portfolioUrl.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="expectedSalary" className="mb-2 block text-sm font-medium text-zinc-700">
            {t("job.form.salary", "Ekspektasi Gaji (IDR)")}
          </label>
          <input
            {...register("expectedSalary")}
            id="expectedSalary"
            type="text"
            className="w-full rounded-xl border border-zinc-200 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="cth: 10-15 juta/bulan"
          />
        </div>
      </div>

      {/* Cover Letter */}
      <div>
        <label htmlFor="coverLetter" className="mb-2 block text-sm font-medium text-zinc-700">
          {t("job.form.cover", "Surat Lamaran *")}
        </label>
        <textarea
          {...register("coverLetter")}
          id="coverLetter"
          rows={6}
          className="w-full resize-none rounded-xl border border-zinc-200 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-500"
          placeholder="Jelaskan minat Anda pada posisi ini dan alasan Anda cocok..."
        />
        {errors.coverLetter && (
          <p className="mt-1 text-sm text-red-600">{errors.coverLetter.message}</p>
        )}
      </div>

      {/* Resume Upload */}
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700">
          {t("job.form.upload.label", "Resume/CV * (PDF, DOC, DOCX - maks 5MB)")}
        </label>
        <div className="relative">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
            id="resume-upload"
          />
          <label
            htmlFor="resume-upload"
            className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-dashed border-zinc-300 px-4 py-6 transition-colors hover:border-brand-500"
          >
            <Upload className="h-6 w-6 text-zinc-400" />
            <span className="text-zinc-600">
              {resumeFile ? resumeFile.name : t("job.form.upload.placeholder", "Klik untuk unggah atau seret & jatuhkan")}
            </span>
          </label>
          {resumeFile && (
            <button
              type="button"
              onClick={() => setResumeFile(null)}
              className="absolute right-2 top-2 rounded-lg bg-red-100 p-1 text-red-600 transition-colors hover:bg-red-200"
              aria-label="Remove uploaded resume"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || isSubmitted}
        className={`flex w-full items-center justify-center gap-2 rounded-xl px-8 py-4 font-semibold text-white transition-all duration-300 ${
          isSubmitted
            ? "bg-green-600 hover:bg-green-700"
            : "bg-brand-600 hover:bg-brand-700 hover:shadow-xl"
        } ${isSubmitting ? "cursor-not-allowed opacity-70" : ""}`}
      >
        {isSubmitted ? (
          <>
            <CheckCircle className="h-5 w-5" />
            {t("job.form.submitted", "Lamaran Terkirim!")}
          </>
        ) : isSubmitting ? (
          <>
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            {t("job.form.submitting", "Mengirim...")}
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            {t("job.form.submit", "Kirim Lamaran")}
          </>
        )}
      </button>
    </form>
  );
}
