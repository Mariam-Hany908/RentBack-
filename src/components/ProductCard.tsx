import React from 'react';
import { RentalProduct } from '../types';
import { useApp } from '../context/AppContext';
import { ShieldCheck, MapPin, Star, Heart, Sparkles, Check } from 'lucide-react';

interface ProductCardProps {
  product: RentalProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language, favorites, toggleFavorite, navigateToProduct, setSelectedProductId, setBookingModalOpen, t } = useApp();

  const isFav = favorites.includes(product.id);

  const handleQuickRent = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProductId(product.id);
    setBookingModalOpen(true);
  };

  return (
    <div
      onClick={() => navigateToProduct(product.id)}
      className="group bg-white rounded-2xl border border-slate-200 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-200 overflow-hidden cursor-pointer flex flex-col h-full"
    >
      {/* Image Container with Badges */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <img
          src={product.images[0]}
          alt={language === 'ar' ? product.nameAr : product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          loading="lazy"
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />

        {/* Top Badges */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none">
          {/* Verification Badge */}
          {product.isProductReviewed && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-600/95 text-white text-[11px] font-bold shadow-sm backdrop-blur-xs pointer-events-auto">
              <ShieldCheck className="w-3.5 h-3.5" />
              {t('مفحوص وموثق', 'Verified')}
            </span>
          )}

          {/* Condition Badge */}
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/95 text-slate-800 text-[10px] font-bold shadow-xs backdrop-blur-xs pointer-events-auto">
            {language === 'ar' ? product.conditionAr : product.condition}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className={`absolute bottom-2.5 ${
            language === 'ar' ? 'left-2.5' : 'right-2.5'
          } w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center transition shadow-sm hover:scale-110 active:scale-90`}
          title={isFav ? t('إزالة من المفضلة', 'Remove from favorites') : t('إضافة للمفضلة', 'Save to favorites')}
        >
          <Heart
            className={`w-4 h-4 transition ${
              isFav ? 'fill-rose-500 text-rose-500' : 'text-slate-600 hover:text-rose-500'
            }`}
          />
        </button>

        {/* AI Inspection Score Pill */}
        {product.aiInspection && (
          <div
            className={`absolute bottom-2.5 ${
              language === 'ar' ? 'right-2.5' : 'left-2.5'
            } px-2 py-0.5 rounded-full bg-slate-900/80 text-white text-[10px] font-semibold flex items-center gap-1 backdrop-blur-xs`}
          >
            <Sparkles className="w-2.5 h-2.5 text-amber-400" />
            <span>AI: {product.aiInspection.conditionScore}/100</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Location */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              {language === 'ar' ? product.categoryAr : product.category}
            </span>
            <span className="flex items-center gap-1 text-slate-500 text-[11px]">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span>
                {language === 'ar' ? product.governorateAr : product.governorate}
                {product.areaAr && ` • ${language === 'ar' ? product.areaAr : product.area}`}
              </span>
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug group-hover:text-emerald-700 transition">
            {language === 'ar' ? product.nameAr : product.name}
          </h3>

          {/* Owner & Rating */}
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating > 0 ? product.rating.toFixed(1) : t('جديد', 'New')}</span>
              <span className="text-slate-400 font-normal text-[11px]">
                ({product.reviewsCount})
              </span>
            </div>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600 truncate text-[11px]">
              {language === 'ar' ? product.ownerNameAr : product.ownerName}
            </span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-slate-950">
                {product.dailyPrice}
              </span>
              <span className="text-xs font-bold text-emerald-700">
                {t('ج.م / يوم', 'EGP / day')}
              </span>
            </div>
            {product.weeklyPrice && (
              <div className="text-[10px] text-slate-400">
                {product.weeklyPrice} {t('ج.م / أسبوع', 'EGP / week')}
              </div>
            )}
          </div>

          <button
            onClick={handleQuickRent}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-semibold text-xs transition duration-150 active:scale-95 shrink-0 shadow-sm"
          >
            {t('تأجير الآن', 'Rent Now')}
          </button>
        </div>
      </div>
    </div>
  );
};
