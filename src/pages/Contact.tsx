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
        <h1 className="text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-500">Contact Us</h1>
        <p className="text-center text-lg text-slate-600 mb-16 max-w-2xl mx-auto">
          Need help selecting the right RO system? Reach out to us for details, pricing, and installation assistance.
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full items-center text-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-1">Phone</h3>
              <p className="text-gray-600 text-sm mb-4">Call us directly</p>

              <div className="flex-grow flex items-center justify-center w-full mb-6">
                <p className="text-xl font-semibold text-blue-600">{CONTACT_INFO.phone}</p>
              </div>

              <button
                onClick={handlePhone}
                className="w-full mt-auto bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold transform hover:-translate-y-1 hover:shadow-md"
              >
                Call Now
              </button>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full items-center text-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-1">WhatsApp</h3>
              <p className="text-gray-600 text-sm mb-4">Chat with us</p>

              <div className="flex-grow flex items-center justify-center w-full mb-6">
                <p className="text-xl font-semibold text-[#25D366]">{CONTACT_INFO.phone}</p>
              </div>

              <button
                onClick={handleWhatsApp}
                className="w-full mt-auto bg-[#25D366] text-white py-3 rounded-xl hover:bg-[#128C7E] transition-all duration-300 font-semibold transform hover:-translate-y-1 hover:shadow-md"
              >
                WhatsApp Now
              </button>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full items-center text-center">
              <div className="bg-slate-100 p-4 rounded-full mb-4">
                <svg className="w-8 h-8 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-1">Email</h3>
              <p className="text-gray-600 text-sm mb-4">Send us a message</p>

              <div className="flex-grow flex items-center justify-center w-full px-2 mb-6">
                <p className="text-[17px] font-semibold text-slate-700 text-center break-words w-full">{CONTACT_INFO.email}</p>
              </div>

              <button
                onClick={handleEmail}
                className="w-full mt-auto bg-slate-800 text-white py-3 rounded-xl hover:bg-slate-900 transition-all duration-300 font-semibold transform hover:-translate-y-1 hover:shadow-md"
              >
                Send Email
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
