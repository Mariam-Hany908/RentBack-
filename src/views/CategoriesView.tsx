import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_LIST } from '../mockData';
import { Sparkles, ChevronRight, ChevronLeft, Package } from 'lucide-react';

export const CategoriesView: React.FC = () => {
  const { language, navigateToCategory, t } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>RentBack Catalog</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black">
          {t('جميع أقسام التأجير المتاحة في مصر', 'All Rental Categories in Egypt')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          {t(
            'اختر القسم المناسب لتصفح آلاف المنتجات المفحوصة والموثوقة القريبة منك بأفضل الأسعار اليومية والأسبوعية.',
            'Browse thousands of verified rental products by category with insured delivery and damage protection.'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES_LIST.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigateToCategory(cat.id)}
            className="group bg-white rounded-3xl border border-slate-200 hover:border-emerald-500 overflow-hidden shadow-xs hover:shadow-xl transition cursor-pointer flex flex-col justify-between"
          >
            <div className="aspect-[16/9] bg-slate-100 overflow-hidden relative">
              <img
                src={cat.image}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute top-3 right-3 rtl:right-3 ltr:left-3 px-2.5 py-1 rounded-full bg-slate-900/80 text-white text-xs font-bold backdrop-blur-xs">
                {cat.count} {t('منتج', 'items')}
              </div>
            </div>

            <div className="p-5 flex items-center justify-between">
              <div>
                <h3 className="font-black text-slate-900 text-base group-hover:text-emerald-700 transition">
                  {language === 'ar' ? cat.nameAr : cat.nameEn}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t('توصيل مدار • فحص ذكي • دفع آمن', 'Courier delivery • AI verified')}
                </p>
              </div>

              <div className="w-10 h-10 rounded-2xl bg-slate-50 group-hover:bg-emerald-600 group-hover:text-white text-slate-700 flex items-center justify-center transition shrink-0">
                {language === 'ar' ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
