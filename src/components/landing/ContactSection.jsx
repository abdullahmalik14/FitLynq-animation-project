import React, { useState } from 'react';
import { Mail, Phone, Twitter, Instagram, Linkedin, Youtube, Facebook, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Section } from '../ui/Section';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    const formToSubmit = {
      ...formData,
      access_key: '1576a9a2-2eb3-4cf2-84dc-bd4c6f8a7610',
      subject: `New Contact Form Submission from ${formData.firstName} ${formData.lastName}`,
      from_name: `${formData.firstName} ${formData.lastName}`,
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formToSubmit)
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setErrorMessage('Failed to connect to the server. Please check your internet.');
    }
  };

  return (
    <Section id="contact" className="reveal-section text-white">
        <div className="grid lg:grid-cols-2 gap-12">
            <div>
            <h2 className="text-6xl md:text-7xl font-black mb-6">
                Get in <span className="text-violet-600">Touch</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10">
                Have questions about our plans or need help getting started? Our team is here to help you succeed.
            </p>
            
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-violet-600/20 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                    <div className="text-sm text-gray-400">Email</div>
                    <div className="text-lg font-bold">support@fitlynq.com</div>
                </div>
                </div>
                
                <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-violet-600/20 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                    <div className="text-sm text-gray-400">Phone</div>
                    <div className="text-lg font-bold">+1 (555) 123-4567</div>
                </div>
                </div>
            </div>

            <div className="mt-10 flex gap-3">
                {[Twitter, Instagram, Linkedin, Youtube, Facebook].map((Icon, i) => (
                <a 
                    key={i}
                    href="#" 
                    className="w-10 h-10 bg-white/5 hover:bg-violet-600/20 border border-white/10 rounded-xl flex items-center justify-center transition-colors hover:scale-105"
                >
                    <Icon className="w-4 h-4" />
                </a>
                ))}
            </div>
            </div>

            <div className="bg-gradient-to-br from-violet-600/10 to-purple-600/5 border border-white/10 rounded-[2rem] p-8">
            <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
            
            {status === 'success' ? (
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-green-500 mb-2">Message Sent!</h4>
                <p className="text-gray-400 mb-6">Thank you for reaching out. We'll get back to you shortly.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-500 rounded-lg transition-colors font-medium"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-600 transition-colors"
                      placeholder="John"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-600 transition-colors"
                      placeholder="Doe"
                    />
                </div>
                </div>
                
                <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-600 transition-colors"
                    placeholder="john@example.com"
                />
                </div>
                
                <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea 
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-600 transition-colors"
                    placeholder="Tell us about your needs..."
                ></textarea>
                </div>
                
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-3 rounded-lg text-sm border border-red-500/20">
                    <AlertCircle className="w-4 h-4" />
                    {errorMessage}
                  </div>
                )}

                <button 
                  disabled={status === 'sending'}
                  className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : 'Send Message'}
                </button>
              </form>
            )}
            </div>
        </div>
    </Section>
  );
};
