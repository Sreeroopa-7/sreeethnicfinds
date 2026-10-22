import React from 'react';
import { X, Ruler, HelpCircle } from 'lucide-react';
import { SIZE_CHART } from '../data/products';
import { useStore } from '../context/StoreContext';

export default function SizeGuideModal() {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useStore();

  if (!isSizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      
      <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#F4ACB7]/40 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setIsSizeGuideOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-[#561026] hover:bg-[#FFE6EC] transition-colors"
          aria-label="Close Size Guide"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-9 h-9 rounded-full bg-[#FFE6EC] flex items-center justify-center text-[#D94B73]">
            <Ruler className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#561026]">College Kurti Size Guide</h3>
            <p className="text-xs text-[#7A6B6B]">Standard garment measurements for Indian women</p>
          </div>
        </div>

        {/* Size Chart Table */}
        <div className="mt-6 overflow-x-auto border border-[#F4ACB7]/30 rounded-2xl shadow-2xs">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#FFF5F7] text-[#561026] font-semibold border-b border-[#F4ACB7]/30">
              <tr>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Bust (in)</th>
                <th className="py-3 px-4">Waist (in)</th>
                <th className="py-3 px-4">Hip (in)</th>
                <th className="py-3 px-4">Kurti Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4ACB7]/20 text-[#4A3E3D]">
              {SIZE_CHART.map((item) => (
                <tr key={item.size} className="hover:bg-[#FFFDF9] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#892B42]">{item.size}</td>
                  <td className="py-3 px-4">{item.bust}</td>
                  <td className="py-3 px-4">{item.waist}</td>
                  <td className="py-3 px-4">{item.hip}</td>
                  <td className="py-3 px-4">{item.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measuring Tips */}
        <div className="mt-6 bg-[#FAF6F0] p-4 rounded-2xl border border-[#F5EBE0] space-y-2 text-xs text-[#5C4D4D]">
          <div className="font-bold text-[#561026] flex items-center gap-1.5 text-sm">
            <HelpCircle className="w-4 h-4 text-[#EE7B99]" />
            How to Measure for Kurtis:
          </div>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Bust:</strong> Measure around the fullest part of your chest, keeping tape comfortably loose.</li>
            <li><strong>Waist:</strong> Measure around your natural waistline (above the navel).</li>
            <li><strong>Hip:</strong> Measure around the widest part of your hips/derriere.</li>
            <li><strong>Campus Comfort Tip:</strong> For everyday college wear where you want free movement during classes and travel, we recommend picking 1 size up if you are between two sizes.</li>
          </ul>
        </div>

        {/* Return Policy note */}
        <div className="mt-4 text-center">
          <p className="text-[11px] text-[#892B42] font-medium">
            ✨ Don't worry if it doesn't fit! Sree Ethnic Finds offers a 7-day hassle-free size exchange.
          </p>
        </div>

        {/* Got it button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="px-6 py-2.5 bg-[#561026] hover:bg-[#751734] text-white text-xs font-semibold rounded-full shadow-sm"
          >
            Got It, Close Guide
          </button>
        </div>

      </div>

    </div>
  );
}
