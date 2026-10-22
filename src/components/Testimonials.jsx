import React from 'react';
import { SAMPLE_TESTIMONIALS } from '../data/testimonials';
import { Star, GraduationCap, Quote, CheckCircle2 } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#F4ACB7]/20">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#892B42] bg-[#FFE6EC] px-3.5 py-1 rounded-full mb-2">
          <GraduationCap className="w-4 h-4 text-[#EE7B99]" />
          Loved by College Campuses
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#561026]">
          What Campus Girls Say
        </h2>
        <p className="text-xs sm:text-sm text-[#7A6B6B] mt-1.5">
          Real feedback from young women rocking Sree Ethnic Finds to lectures, fests, and library sessions.
        </p>

        {/* Clear Prototype Disclaimer Badge */}
        <div className="mt-3 inline-block bg-[#F5EBE0] text-[#751734] px-3 py-1 rounded-full text-[11px] font-medium border border-[#D5BDAF]/40">
          ℹ️ <strong>Prototype Notice:</strong> Clearly labelled sample student reviews for demonstration until genuine verified customer reviews are published.
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SAMPLE_TESTIMONIALS.map((review) => (
          <div
            key={review.id}
            className="bg-white p-6 rounded-3xl border border-[#F4ACB7]/30 shadow-card hover:shadow-soft transition-all duration-300 flex flex-col justify-between relative"
          >
            <div className="space-y-3">
              {/* Stars & Date */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#EE7B99] text-[#EE7B99]" />
                  ))}
                </div>
                <span className="text-[10px] text-[#A09393]">{review.date}</span>
              </div>

              {/* Product Badge */}
              <div className="text-[11px] font-semibold text-[#961E42] bg-[#FFF5F7] px-2.5 py-1 rounded-lg inline-block border border-[#F4ACB7]/20">
                Purchased: {review.product}
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-[#5C4D4D] italic leading-relaxed">
                "{review.comment}"
              </p>
            </div>

            {/* Student Info */}
            <div className="flex items-center gap-3 pt-4 mt-4 border-t border-[#F4ACB7]/20">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-10 h-10 rounded-full object-cover border border-[#EE7B99]/40"
              />
              <div>
                <div className="text-xs font-bold text-[#561026] flex items-center gap-1">
                  <span>{review.name}</span>
                  <CheckCircle2 className="w-3 h-3 text-[#2B9348]" title="Verified Student Buyer" />
                </div>
                <div className="text-[10px] text-[#7A6B6B] font-medium">
                  {review.college}
                </div>
                <div className="text-[9px] text-[#961E42]">
                  {review.year}
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
