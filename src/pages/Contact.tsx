import { CONTACT_INFO } from '../components/ContactButtons';

export default function Contact() {
  const handleWhatsApp = () => {
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=Hi%20🙂%20I'd%20like%20to%20get%20more%20information%20about%20your%20RO%20purifiers%20and%20pricing.`, '_blank');
  };

  const handlePhone = () => {
    window.location.href = `tel:${CONTACT_INFO.phone}`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${CONTACT_INFO.email}`;
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
        <p className="text-center text-gray-600 mb-12">
          Get in touch with us for any inquiries about our RO purifiers
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Phone</h3>
                  <p className="text-gray-600 text-sm">Call us directly</p>
                </div>
              </div>
              <p className="text-lg font-semibold mb-4 text-green-700">{CONTACT_INFO.phone}</p>
              <button
                onClick={handlePhone}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all duration-300 font-semibold transform hover:scale-105"
              >
                Call Now
              </button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">WhatsApp</h3>
                  <p className="text-gray-600 text-sm">Chat with us</p>
                </div>
              </div>
              <p className="text-lg font-semibold mb-4 text-green-600">{CONTACT_INFO.phone}</p>
              <button
                onClick={handleWhatsApp}
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-all duration-300 font-semibold transform hover:scale-105"
              >
                WhatsApp Now
              </button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-slate-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Email</h3>
                  <p className="text-gray-600 text-sm">Send us a message</p>
                </div>
              </div>
              <p className="text-lg font-semibold mb-4 text-slate-700">{CONTACT_INFO.email}</p>
              <button
                onClick={handleEmail}
                className="w-full bg-slate-700 text-white py-3 rounded-lg hover:bg-slate-800 transition-all duration-300 font-semibold transform hover:scale-105"
              >
                Send Email
              </button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Service Area</h3>
                  <p className="text-gray-600 text-sm">Where we serve</p>
                </div>
              </div>
              <p className="text-lg font-semibold text-green-700">Pan India</p>
              <p className="text-gray-600 mt-2 text-sm">
                We provide installation and service support across all major cities in India.
              </p>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-2 text-gray-900">Business Hours</h3>
            <p className="text-gray-700">Monday - Saturday: 9:00 AM - 7:00 PM</p>
            <p className="text-gray-700">Sunday: 10:00 AM - 5:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
