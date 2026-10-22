import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppFloatingButton() {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent("Hi Sree Ethnic Finds! I need help picking a college kurti size or checking delivery to my campus.");
    window.open(`https://wa.me/917012897623?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Tooltip Bubble */}
      {showTooltip && (
        <div className="mb-2 bg-white px-3.5 py-2 rounded-2xl shadow-lg border border-[#F4ACB7]/40 text-xs text-[#561026] flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span>Need college sizing advice? Chat with us! 💬</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-[#961E42]/60 hover:text-[#961E42]"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={handleOpenWhatsApp}
        className="w-13 h-13 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        aria-label="Chat with Sree Ethnic Finds on WhatsApp"
        title="WhatsApp Student Support"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
      </button>

    </div>
  );
}
