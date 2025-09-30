// src/components/job-application-form.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, X, CheckCircle, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const applicationSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  coverLetter: z.string().min(50, "Cover letter must be at least 50 characters"),
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
  emailTo 
}: { 
  jobTitle: string; 
  emailTo: string;
}) {
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
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
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
        title: "Resume required",
        description: "Please upload your resume",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // TODO: Implement actual form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      toast({
        title: "Application submitted!",
        description: "We'll review your application and get back to you soon.",
      });
      
      setTimeout(() => {
        reset();
        setResumeFile(null);
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-900">Personal Information</h3>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-zinc-700 mb-2">
              Full Name *
            </label>
            <input
              {...register("fullName")}
              type="text"
              className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="John Doe"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-2">
              Email Address *
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 mb-2">
              Phone Number *
            </label>
            <input
              {...register("phone")}
              type="tel"
              className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="+62 812 3456 7890"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="currentCompany" className="block text-sm font-medium text-zinc-700 mb-2">
              Current Company
            </label>
            <input
              {...register("currentCompany")}
              type="text"
              className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="PT Example Indonesia"
            />
          </div>
        </div>
      </div>

      {/* Professional Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-900">Professional Information</h3>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-zinc-700 mb-2">
              Years of Experience *
            </label>
            <select
              {...register("yearsOfExperience")}
              className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            >
              <option value="">Select experience</option>
              <option value="0-1">0-1 years</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5-10">5-10 years</option>
              <option value="10+">10+ years</option>
            </select>
            {errors.yearsOfExperience && (
              <p className="mt-1 text-sm text-red-600">{errors.yearsOfExperience.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="availability" className="block text-sm font-medium text-zinc-700 mb-2">
              Availability *
            </label>
            <select
              {...register("availability")}
              className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            >
              <option value="">Select availability</option>
              <option value="immediately">Immediately</option>
              <option value="2weeks">2 weeks notice</option>
              <option value="1month">1 month notice</option>
              <option value="2months">2 months notice</option>
              <option value="other">Other</option>
            </select>
            {errors.availability && (
              <p className="mt-1 text-sm text-red-600">{errors.availability.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="linkedinUrl" className="block text-sm font-medium text-zinc-700 mb-2">
              LinkedIn Profile
            </label>
            <input
              {...register("linkedinUrl")}
              type="url"
              className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="https://linkedin.com/in/johndoe"
            />
            {errors.linkedinUrl && (
              <p className="mt-1 text-sm text-red-600">{errors.linkedinUrl.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="portfolioUrl" className="block text-sm font-medium text-zinc-700 mb-2">
              Portfolio/Website
            </label>
            <input
              {...register("portfolioUrl")}
              type="url"
              className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="https://johndoe.com"
            />
            {errors.portfolioUrl && (
              <p className="mt-1 text-sm text-red-600">{errors.portfolioUrl.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="expectedSalary" className="block text-sm font-medium text-zinc-700 mb-2">
            Expected Salary (IDR)
          </label>
          <input
            {...register("expectedSalary")}
            type="text"
            className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            placeholder="e.g., 10-15 million/month"
          />
        </div>
      </div>

      {/* Cover Letter */}
      <div>
        <label htmlFor="coverLetter" className="block text-sm font-medium text-zinc-700 mb-2">
          Cover Letter *
        </label>
        <textarea
          {...register("coverLetter")}
          rows={6}
          className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
          placeholder="Tell us why you're interested in this position and what makes you a great fit..."
        />
        {errors.coverLetter && (
          <p className="mt-1 text-sm text-red-600">{errors.coverLetter.message}</p>
        )}
      </div>

      {/* Resume Upload */}
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">
          Resume/CV * (PDF, DOC, DOCX - Max 5MB)
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
            className="flex items-center justify-center gap-3 w-full px-4 py-6 border-2 border-dashed border-zinc-300 rounded-xl hover:border-brand-500 transition-colors cursor-pointer"
          >
            <Upload className="w-6 h-6 text-zinc-400" />
            <span className="text-zinc-600">
              {resumeFile ? resumeFile.name : "Click to upload or drag and drop"}
            </span>
          </label>
          {resumeFile && (
            <button
              type="button"
              onClick={() => setResumeFile(null)}
              className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || isSubmitted}
        className={`w-full px-8 py-4 font-semibold text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
          isSubmitted 
            ? "bg-green-600 hover:bg-green-700" 
            : "bg-brand-600 hover:bg-brand-700 hover:shadow-xl"
        } ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        {isSubmitted ? (
          <>
            <CheckCircle className="w-5 h-5" />
            Application Submitted!
          </>
        ) : isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Submit Application
          </>
        )}
      </button>
    </form>
  );
}