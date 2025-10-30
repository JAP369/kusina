'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

// Your Access Key
const ACCESS_KEY = '294c32bb-9793-4a97-9d59-b7e460ed6343';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const payload = new FormData();
    payload.append('access_key', ACCESS_KEY);

    // REQUIRED by Web3Forms to avoid spam
    payload.append('from_name', formData.name || 'Localhost User');
    payload.append('subject', formData.subject || 'Contact Form - Local Test');

    // Your fields
    payload.append('name', formData.name);
    payload.append('email', formData.email);
    payload.append('phone', formData.phone);
    payload.append('message', formData.message);

    // Honeypot (anti-bot)
    payload.append('botcheck', '');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: payload,
      });

      const data = await res.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        throw new Error(data.message || 'Failed to send');
      }
    } catch (err: any) {
      console.error('Error:', err);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Let&apos;s Connect!</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our menu, catering services, or want to share feedback? 
            Fill out the form below and let&apos;s make something delicious together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-[#FF6B00] mb-6">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] outline-none"
                    placeholder="Your full name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] outline-none"
                      placeholder="+852 1234 5678"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] outline-none"
                  >
                    <option value="" disabled>Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="catering">Catering Services</option>
                    <option value="reservation">Reservation</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership/Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] outline-none resize-none"
                    placeholder="Tell us more..."
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#FF6B00] text-white font-bold py-4 rounded-lg hover:bg-[#FF8533] disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="text-xl" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>

                {submitStatus === 'success' && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    Thank you! Your message has been sent successfully.
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                    Oops! Something went wrong. Try again.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-[#FF6B00] mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-50 p-3 rounded-lg"><FiMapPin className="text-2xl text-[#FF6B00]" /></div>
                  <div><h3 className="font-semibold text-gray-800 mb-1">Location</h3><p className="text-gray-600">1 Morrison Hill Road<br />Wan Chai, Hong Kong</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-orange-50 p-3 rounded-lg"><FiPhone className="text-2xl text-[#FF6B00]" /></div>
                  <div><h3 className="font-semibold text-gray-800 mb-1">Phone</h3><a href="tel:+85212345678" className="text-gray-600 hover:text-[#FF6B00]">+852 1234 5678</a></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-orange-50 p-3 rounded-lg"><FiMail className="text-2xl text-[#FF6B00]" /></div>
                  <div><h3 className="font-semibold text-gray-800 mb-1">Email</h3><a href="mailto:hello@kusina.com" className="text-gray-600 hover:text-[#FF6B00]">hello@kusina.com</a></div>
                </div>
              </div>
              <div className="border-t border-gray-200 my-6"></div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-orange-50 p-3 rounded-lg hover:bg-[#FF6B00] hover:text-white"><FaFacebook className="text-2xl" /></a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-orange-50 p-3 rounded-lg hover:bg-[#FF6B00] hover:text-white"><FaInstagram className="text-2xl" /></a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-[#FF6B00] mb-6">Business Hours</h2>
              <div className="space-y-3">
                <div className="flex justify-between"><span className="text-gray-600">Monday - Friday</span><span className="font-semibold text-gray-800">11:00 AM - 9:00 PM</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Saturday - Sunday</span><span className="font-semibold text-gray-800">10:00 AM - 10:00 PM</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Public Holidays</span><span className="font-semibold text-gray-800">Varies</span></div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-12">
          <div className="bg-white rounded-xl shadow-lg p-4 overflow-hidden">
            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Map placeholder</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}