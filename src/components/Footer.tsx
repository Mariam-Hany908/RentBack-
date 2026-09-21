import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Lock, Truck, Scale, Headphones, Heart } from 'lucide-react';
import { CATEGORIES_LIST, EGYPT_GOVERNORATES } from '../mockData';

export const Footer: React.FC = () => {
  const { language, setActiveView, setSelectedCategory, setSupportModalOpen, t } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800 text-center sm:text-start">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">
                {t('مستخدمون موثقون رسمياً', 'Verified Real Users')}
              </h4>
              <p className="text-xs text-slate-400">
                {t('مطابقة بالرقم القومي المصري والفحص الحيوي', 'National ID & biometric KYC check')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">
                {t('دفع وحجز مؤمن 100%', 'Protected Payments')}
              </h4>
              <p className="text-xs text-slate-400">
                {t('حفظ الأموال حتى استلام المنتج والتأكد من سلامته', 'Funds held securely until inspection')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">
                {t('شحن وتوصيل واسترجاع مدار', 'Managed Delivery & Return')}
              </h4>
              <p className="text-xs text-slate-400">
                {t('من الباب إلى الباب عبر شركاء شحن معتمدين', 'Door-to-door courier service')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">
                {t('فحص رقمي وحماية من التلف', 'AI Inspection & Protection')}
              </h4>
              <p className="text-xs text-slate-400">
                {t('سجل فحص قبل وبعد لتسوية أي نزاع بنزاهة', 'Before/after condition records')}
              </p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 py-12 border-b border-slate-800 text-sm">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-lg">
                R
              </div>
              <span className="text-2xl font-black text-white">RentBack</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-emerald-500/30">
                {t('مصر 🇪🇬', 'Egypt')}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {t(
                'المنصة التكنولوجية الأولى في مصر لتأجير المنتجات المادية بين الأفراد مع حماية متكاملة. نقوم بفحص الهويات، فحص المنتجات بالذكاء الاصطناعي، إدارة عمليات الشحن والاسترجاع، وحفظ مستحقات الملاك والمستأجرين.',
                'The premier peer-to-peer rental marketplace in Egypt with end-to-end trust. Verified users, AI condition checks, managed courier pickup/delivery, and secure rental protection.'
              )}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                <ShieldCheck className="w-4 h-4" />
                {t('سياسة منع التواصل المباشر للسلامة', 'Safe Intermediary Policy')}
              </div>
              <p className="text-slate-400 text-[11px]">
                {t(
                  'لحماية أمان الملاك والمستأجرين، لا يتم نشر أرقام الهواتف أو العناوين الخاصة. جميع المعاملات والشحن والاستفسارات تدار حصرياً من خلال المنصة.',
                  'To safeguard community safety, personal phone numbers and direct contacts are private. All interactions, payments, and pickups are mediated by RentBack.'
                )}
              </p>
            </div>
          </div>

          {/* Popular Categories */}
          <div>
            <h5 className="font-bold text-white mb-3 text-xs uppercase tracking-wider text-emerald-400">
              {t('الأقسام الشائعة', 'Popular Categories')}
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              {CATEGORIES_LIST.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setActiveView('category_listing');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition cursor-pointer"
                  >
                    {language === 'ar' ? cat.nameAr : cat.nameEn}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Egyptian Governorates */}
          <div>
            <h5 className="font-bold text-white mb-3 text-xs uppercase tracking-wider text-emerald-400">
              {t('المحافظات المغطاة', 'Covered Governorates')}
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {EGYPT_GOVERNORATES.map((gov) => (
                <li key={gov.en} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>{language === 'ar' ? gov.ar : gov.en}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Actions & Support */}
          <div>
            <h5 className="font-bold text-white mb-3 text-xs uppercase tracking-wider text-emerald-400">
              {t('روابط المنصة', 'Platform Links')}
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setActiveView('list_item');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition"
                >
                  {t('إضافة منتج للتأجير (مالك)', 'List Your Item (Owner)')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('identity_verification');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition"
                >
                  {t('توثيق بطاقة الرقم القومي', 'Identity KYC Verification')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('disputes');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition"
                >
                  {t('نظام فض النزاعات والأضرار', 'Dispute Resolution')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('admin_dashboard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition"
                >
                  {t('لوحة المشرف والإدارة', 'Admin Console')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSupportModalOpen(true)}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 mt-2"
                >
                  <Headphones className="w-3.5 h-3.5" />
                  {t('فريق دعم رنت باك', 'RentBack Support Desk')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()} RentBack Egypt. {t('جميع الحقوق محفوظة.', 'All rights reserved.')}
          </p>
          <div className="flex items-center gap-2">
            <span>{t('الأسعار بالجنيه المصري (EGP)', 'Prices in Egyptian Pounds (EGP)')}</span>
            <span>•</span>
            <span className="text-emerald-500 font-medium">
              {t('نموذج عمل آمن وتأجير تشاركي', 'Safe Peer-to-Peer Rental Economy')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
