import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function Toast() {
  const { toast } = useStore();

  if (!toast) return null;

  const isError = toast.type === 'error';
  const isInfo = toast.type === 'info';

  return (
    <div className="fixed bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-3 duration-300 pointer-events-none">
      <div className={`px-4 sm:px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold border pointer-events-auto backdrop-blur-md ${
        isError 
          ? 'bg-red-50 text-red-800 border-red-200' 
          : isInfo 
          ? 'bg-blue-50 text-blue-800 border-blue-200' 
          : 'bg-[#561026] text-white border-[#EE7B99]/40 shadow-soft'
      }`}>
        {isError ? (
          <AlertCircle className="w-4 h-4 text-red-500" />
        ) : isInfo ? (
          <Info className="w-4 h-4 text-blue-500" />
        ) : (
          <CheckCircle2 className="w-4 h-4 text-[#FFE6EC]" />
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
