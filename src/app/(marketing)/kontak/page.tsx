// src/app/(marketing)/kontak/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type ContactInfoItem = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  details: string[];
};

export default function KontakPage() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    phone: "",
    subject: "",
    pesan: "",
    // honeypot anti-bot (tetap kosong)
    website: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo: ContactInfoItem[] = [
    {
      icon: MapPin,
      title: "Head Office",
      details: ["Jl. Semarang - Kudus", "Demak, Jawa Tengah 59516", "Indonesia"],
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+62 291 123456"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@tunasesta.co.id"],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 08:00 - 17:00", "Saturday: 08:00 - 12:00", "Sunday: Closed"],
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.website) return; // honeypot
    setIsSubmitting(true);

    try {
      // TODO: ganti ke POST API kamu
      await new Promise((r) => setTimeout(r, 1500));
      setIsSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setTimeout(() => {
        setFormData({
          nama: "",
          email: "",
          phone: "",
          subject: "",
          pesan: "",
          website: "",
        });
        setIsSubmitted(false);
      }, 2500);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold bg-white/20 backdrop-blur-sm rounded-full">
                Get In Touch
              </span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
              <p className="text-lg md:text-xl text-brand-100">
                Have questions about our products or services? We&rsquo;re here to help and would love to hear from you.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gradient-to-b from-white to-zinc-50">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="flex flex-col h-full">
                    <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-brand-600 bg-brand-50 rounded-xl group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900 mb-3">{item.title}</h3>
                    <div className="space-y-1 flex-grow">
                      {item.details.map((detail) => (
                        <p key={detail} className="text-sm text-zinc-600">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-zinc-900 mb-4">Send Us a Message</h2>
                <p className="text-zinc-600">If you have any questions or business inquiries regarding our products/services, please contact us for details.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Honeypot */}
                <input type="text" name="website" value={formData.website} onChange={handleChange} className="hidden" />

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="nama" className="block text-sm font-medium text-zinc-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      id="nama"
                      type="text"
                      name="nama"
                      value={formData.nama}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                      placeholder="+62 812 3456 7890"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-zinc-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select Subject</option>
                      <option value="product">Product Inquiry</option>
                      <option value="export">Export/Import</option>
                      <option value="partnership">Partnership</option>
                      <option value="career">Career</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="pesan" className="block text-sm font-medium text-zinc-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="pesan"
                    name="pesan"
                    value={formData.pesan}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full px-8 py-4 font-semibold text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSubmitted ? "bg-green-600 hover:bg-green-700" : "bg-brand-600 hover:bg-brand-700 hover:shadow-xl"
                  } ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                  aria-live="polite"
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Message Sent Successfully!
                    </>
                  ) : isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-8">
              <div className="relative h-96 bg-zinc-100 rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.8149779232567!2d110.6104739!3d-6.9127130999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70ed003ac95cb5%3A0xb00560c6d36c5b6a!2sPT%20Tunas%20Esta%20Indonesia!5e0!3m2!1sen!2sid!4v1759213346542!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <span className="text-sm font-semibold text-zinc-800">📍 Demak Jawa Tengah</span>
                </div>
              </div>

              {/* Quick Links */}
              <div className="p-8 bg-gradient-to-br from-brand-50 to-white rounded-2xl border border-brand-100">
                <h3 className="text-xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-brand-600" />
                  Quick Contact Options
                </h3>
                <div className="space-y-4">
                  <a
                    href="https://wa.me/6282134567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-white rounded-xl hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884M20.464 3.488A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-900">WhatsApp</p>
                        <p className="text-sm text-zinc-600">Chat with us directly</p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-zinc-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>

                  <a href="tel:+62291123456" className="flex items-center justify-between p-4 bg-white rounded-xl hover:shadow-md transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-900">Call Us</p>
                        <p className="text-sm text-zinc-600">Mon-Fri 8AM-5PM</p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-zinc-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>

                  <a href="mailto:info@tunasesta.co.id" className="flex items-center justify-between p-4 bg-white rounded-xl hover:shadow-md transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-900">Email Us</p>
                        <p className="text-sm text-zinc-600">We&rsquo;ll reply within 24h</p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-zinc-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-b from-white to-zinc-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-zinc-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-zinc-600">Find answers to common questions about our products and services</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "What are your minimum order quantities?",
                  a: "Our minimum order quantity varies by product grade. For export orders, we typically require a minimum of 100kg. Please contact our sales team for specific requirements.",
                },
                {
                  q: "Do you ship internationally?",
                  a: "Yes, we export to over 30 countries worldwide. We handle all necessary export documentation and can arrange shipping to most international destinations.",
                },
                {
                  q: "What certifications do you have?",
                  a: "We are certified with HACCP, ISO 22000:2018, Halal MUI, and BPOM. All our products meet international food safety standards.",
                },
                {
                  q: "How can I become a distributor?",
                  a: "We're always looking for partners worldwide. Please contact our business development team with your company profile and distribution capabilities.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-zinc-900 mb-2">{faq.q}</h3>
                  <p className="text-zinc-600">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
