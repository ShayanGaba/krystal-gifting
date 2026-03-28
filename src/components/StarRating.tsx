// ─── src/components/StarRating.tsx ───────────────────────────────────────────
// ✅ Fractional star support — 4.7 shows 4 full + 70% filled star
// Uses CSS linear-gradient clip technique — no images, no libraries

import React from 'react';

interface StarRatingProps {
  rating: number;       // e.g. 4.7
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

export default function StarRating({
  rating, size = 'sm', showValue = false, reviewCount, className = '',
}: StarRatingProps) {
  const pct    = (rating / 5) * 100; // e.g. 4.7/5 = 94%
  const sizes  = { sm: 'w-3 h-3', md: 'w-4 h-4', lg: 'w-5 h-5' };
  const starSz = sizes[size];

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {/* Star container — gradient clip trick */}
      <div className="relative flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {/* Background stars (empty) */}
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className={`${starSz} text-white/15`} viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          ))}
        </div>

        {/* Foreground stars (filled) — clipped to exact % */}
        <div
          className="absolute inset-0 flex gap-0.5 overflow-hidden"
          style={{ width: `${pct}%` }}
        >
          {[...Array(5)].map((_, i) => (
            <svg key={i} className={`${starSz} text-primary flex-shrink-0`} viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          ))}
        </div>
      </div>

      {showValue && (
        <span className="text-xs text-white/60 font-ui">
          {rating}
          {reviewCount !== undefined && (
            <span className="text-white/30 ml-1">({reviewCount})</span>
          )}
        </span>
      )}
    </div>
  );
}