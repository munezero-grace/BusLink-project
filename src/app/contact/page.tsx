'use client';

import { useState } from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission to backend
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: ''
    });
    alert('Your message has been sent. We will get back to you soon!');
  };

  return (
    <main 
      className="min-h-screen pt-12 pb-16 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/images/bus-hero.jpg)' }}
    >
      {/* Page Title */}
      <div className="container mx-auto px-4 mb-12">
        <h1 className="text-5xl font-bold text-white text-center">Get in Touch</h1>
      </div>

      {/* Contact Form Container */}
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Contact Form */}
            <div className="w-full md:w-2/3 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">First name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  {/* Last Name */}
                  <div>
                    <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">Last name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+250 780 000 000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>
                
                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here......."
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-light text-white px-12 py-3 rounded-full transition-colors duration-300"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
            
            {/* Contact Information */}
            <div className="w-full md:w-1/3 bg-primary-dark text-white p-8 flex flex-col justify-center">
              <div className="space-y-8">
                {/* Location */}
                <div className="flex items-start space-x-4">
                  <FaMapMarkerAlt className="text-2xl text-primary mt-1" />
                  <p>Kacyiru sector, Kigali</p>
                </div>
                
                {/* Email */}
                <div className="flex items-center space-x-4">
                  <FaEnvelope className="text-2xl text-primary" />
                  <p>tech@example.com</p>
                </div>
                
                {/* Phone */}
                <div className="flex items-center space-x-4">
                  <FaPhone className="text-2xl text-primary" />
                  <p>+250 780 000 000</p>
                </div>
                
                {/* Social Media Icons */}
                <div className="flex items-center space-x-6 mt-8">
                  <a href="#" aria-label="Twitter" className="text-white hover:text-primary transition-colors">
                    <FaTwitter className="text-2xl" />
                  </a>
                  <a href="#" aria-label="Facebook" className="text-white hover:text-primary transition-colors">
                    <FaFacebook className="text-2xl" />
                  </a>
                  <a href="#" aria-label="Instagram" className="text-white hover:text-primary transition-colors">
                    <FaInstagram className="text-2xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Map Section */}
      <section className="w-full h-96 mt-16">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63799.41051610002!2d30.0333854!3d-1.9441631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca6eef12d6443%3A0xed139784e825cd16!2sKacyiru%2C%20Kigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1650123456789!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Kacyiru sector map"
        />
      </section>
    </main>
  );
}
