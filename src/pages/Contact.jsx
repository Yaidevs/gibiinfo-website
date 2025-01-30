import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Have questions? We're here to help! Get in touch with our team.
        </p>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                We'd love to hear from you. Please fill out this form and we'll
                get back to you as soon as possible.
              </p>

              <div className="space-y-6">
                <ContactInfo
                  icon="mail"
                  title="Email"
                  text="info@gibiinfo.com"
                />
                <ContactInfo icon="phone" title="Phone" text="(123) 456-7890" />
                <ContactInfo
                  icon="map-pin"
                  title="Location"
                  text="Ethiopia , Oromia , Jimma"
                />
              </div>
            </div>

            {/* Form */}
            <div className="bg-white/30 backdrop-blur-lg shadow-lg rounded-lg p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                  label="Name"
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                />
                <InputField
                  label="Email"
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <InputField
                  label="Subject"
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                />
                <TextareaField
                  label="Message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-primary/90 shadow-md"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.122919476343!2d36.82815857581701!3d7.673188192362839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17b10749a8d9b4c1%3A0x86c73f118b760dc9!2sJimma%2C%20Ethiopia!5e0!3m2!1sen!2s!4v1706600000000!5m2!1sen!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}

// Contact Info Card Component
const ContactInfo = ({ icon, title, text }) => (
  <div className="flex items-center space-x-4">
    <div className="bg-primary/10 p-3 rounded-full">
      <svg
        className="w-6 h-6 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {icon === "mail" && (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        )}
        {icon === "phone" && (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        )}
        {icon === "map-pin" && (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
        )}
      </svg>
    </div>
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  </div>
);

// Input Field Component
const InputField = ({ label, id, type, value, onChange }) => (
  <div className="flex flex-col space-y-1">
    <label htmlFor={id} className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="p-3 w-full border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-primary outline-none transition-all duration-200"
      required
    />
  </div>
);

// Textarea Field Component
const TextareaField = ({ label, id, value, onChange }) => (
  <InputField
    label={label}
    id={id}
    type="textarea"
    value={value}
    onChange={onChange}
  />
);
