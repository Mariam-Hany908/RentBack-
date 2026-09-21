import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  MapPin,
  Star,
  Sparkles,
  Calendar,
  Lock,
  Truck,
  Heart,
  Share2,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Headphones,
  Video,
  FileCheck,
  AlertCircle,
  PackageCheck,
} from 'lucide-react';

export const ProductDetailsView: React.FC = () => {
  const {
    language,
    products,
    selectedProductId,
    favorites,
    toggleFavorite,
    setBookingModalOpen,
    setSupportModalOpen,
    setActiveView,
    t,
  } = useApp();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const isFav = favorites.includes(product.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <button
          onClick={() => setActiveView('home')}
          className="hover:text-emerald-700 transition"
        >
          {t('الرئيسية', 'Home')}
        </button>
        <span>/</span>
        <button
          onClick={() => setActiveView('category_listing')}
          className="hover:text-emerald-700 transition"
        >
          {language === 'ar' ? product.categoryAr : product.category}
        </button>
        <span>/</span>
        <span className="text-slate-900 truncate max-w-xs font-bold">
          {language === 'ar' ? product.nameAr : product.name}
        </span>
      </nav>

      {/* Main Grid: Gallery & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Gallery Column (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image Display */}
          <div className="relative aspect-[4/3] bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 shadow-sm group">
            <img
              src={product.images[activeImageIdx] || product.images[0]}
              alt={language === 'ar' ? product.nameAr : product.name}
              className="w-full h-full object-cover transition duration-300"
            />

            {/* Top Badges */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-md pointer-events-auto backdrop-blur-xs">
                <ShieldCheck className="w-4 h-4" />
                {t('منتج مفحوص وموثق رسمياً', 'RentBack Verified Item')}
              </span>

              <div className="flex items-center gap-2 pointer-events-auto">
                <button
                  onClick={handleShare}
                  className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-700 hover:text-emerald-600 shadow-sm transition"
                  title={t('مشاركة الرابط', 'Share link')}
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-sm transition"
                  title={t('حفظ في المفضلة', 'Save')}
                >
                  <Heart
                    className={`w-4 h-4 transition ${
                      isFav ? 'fill-rose-500 text-rose-500' : 'text-slate-600 hover:text-rose-500'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Video preview button if available or simulated */}
            <button
              onClick={() => setShowVideoModal(true)}
              className="absolute bottom-4 right-4 rtl:right-4 ltr:left-4 px-3 py-1.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-white text-xs font-bold flex items-center gap-2 backdrop-blur-xs transition shadow-lg cursor-pointer"
            >
              <Video className="w-4 h-4 text-emerald-400" />
              <span>{t('فيديو فحص الحالة التشغيلية', 'Watch Operating Video')}</span>
            </button>

            {copiedLink && (
              <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center text-white text-sm font-bold animate-in fade-in">
                ✓ {t('تم نسخ رابط المنتج بنجاح!', 'Product link copied to clipboard!')}
              </div>
            )}
          </div>

          {/* Thumbnails list */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`w-20 h-20 rounded-2xl overflow-hidden border-2 shrink-0 transition ${
                  activeImageIdx === idx
                    ? 'border-emerald-600 ring-2 ring-emerald-500/30'
                    : 'border-slate-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* AI Inspection Card */}
          {product.aiInspection && (
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 border border-slate-800 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white">
                      {t('تقرير الفحص الذكي للذكاء الاصطناعي (AI Inspection)', 'AI Product Inspection Report')}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {t('تحليل بصري متعدد الزوايا قبل إتاحة المنتج للتأجير', 'Automated optical scan & defect verification')}
                    </p>
                  </div>
                </div>

                <div className="text-end">
                  <div className="text-xl font-black text-emerald-400">
                    {product.aiInspection.conditionScore}/100
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold">
                    {t('درجة الجاهزية', 'Condition Score')}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2 border-t border-slate-800">
                <div className="bg-slate-800/60 rounded-xl p-3 space-y-1">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">
                    {t('الأضرار المرئية', 'Visible Flaws')}
                  </span>
                  <span className="font-semibold text-slate-200 line-clamp-2">
                    {language === 'ar'
                      ? product.aiInspection.visibleDamageAr
                      : product.aiInspection.visibleDamage}
                  </span>
                </div>

                <div className="bg-slate-800/60 rounded-xl p-3 space-y-1">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">
                    {t('اكتمال الملحقات', 'Completeness')}
                  </span>
                  <span className="font-semibold text-slate-200">
                    {language === 'ar'
                      ? product.aiInspection.completenessAr
                      : product.aiInspection.completeness}
                  </span>
                </div>

                <div className="bg-slate-800/60 rounded-xl p-3 space-y-1">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">
                    {t('مستوى المخاطر', 'Risk Level')}
                  </span>
                  <span className="font-semibold text-emerald-400">
                    {language === 'ar'
                      ? product.aiInspection.riskLevelAr
                      : product.aiInspection.riskLevel}
                  </span>
                </div>

                <div className="bg-slate-800/60 rounded-xl p-3 space-y-1">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">
                    {t('توصية الذكاء الاصطناعي', 'AI Verdict')}
                  </span>
                  <span className="font-semibold text-amber-300">
                    {language === 'ar'
                      ? product.aiInspection.recommendationAr
                      : product.aiInspection.recommendation}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Product Specifications & Details */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-emerald-600" />
              <span>{t('المواصفات الفنية والبيانات', 'Technical Specifications')}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between">
                <span className="text-slate-500 font-medium">{t('العلامة التجارية', 'Brand')}:</span>
                <span className="font-bold text-slate-900">{product.brand}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between">
                <span className="text-slate-500 font-medium">{t('الموديل / الطراز', 'Model')}:</span>
                <span className="font-bold text-slate-900">{product.model}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between">
                <span className="text-slate-500 font-medium">{t('سنة الشراء', 'Purchase Year')}:</span>
                <span className="font-bold text-slate-900">{product.purchaseYear}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between">
                <span className="text-slate-500 font-medium">{t('مدة الاستخدام الفعلية', 'Usage Duration')}:</span>
                <span className="font-bold text-slate-900">
                  {language === 'ar' ? product.usageDurationAr : product.usageDuration}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between">
                <span className="text-slate-500 font-medium">{t('الحالة العامة', 'Condition')}:</span>
                <span className="font-bold text-emerald-700">
                  {language === 'ar' ? product.conditionAr : product.condition}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between">
                <span className="text-slate-500 font-medium">{t('الرقم التسلسلي المسجل', 'Serial Number')}:</span>
                <span className="font-mono font-bold text-slate-700">{product.serialNumber || 'SN-REG-OK'}</span>
              </div>

              {/* Dynamic specs map */}
              {Object.entries(language === 'ar' ? product.specificationsAr : product.specifications).map(
                ([key, val]) => (
                  <div
                    key={key}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between"
                  >
                    <span className="text-slate-500 font-medium">{key}:</span>
                    <span className="font-bold text-slate-900">{val}</span>
                  </div>
                )
              )}
            </div>

            {/* Included Accessories */}
            {product.includedAccessories && product.includedAccessories.length > 0 && (
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <span className="text-xs font-bold text-slate-800 block">
                  {t('الملحقات المرفقة مع المنتج (المستلمة ومطابقة بالفحص):', 'Included Accessories:')}
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.includedAccessories.map((acc, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
                    >
                      <PackageCheck className="w-3.5 h-3.5 text-emerald-600" />
                      {acc}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right / Pricing & Owner Sidebar (5 cols) */}
        <div className="lg:col-span-5 space-y-6 sticky top-24">
          {/* Main Booking Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-5">
            {/* Title & Location */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold">
                  {language === 'ar' ? product.categoryAr : product.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {language === 'ar' ? product.governorateAr : product.governorate}
                  {product.areaAr && ` • ${language === 'ar' ? product.areaAr : product.area}`}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-slate-950 leading-snug">
                {language === 'ar' ? product.nameAr : product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating > 0 ? product.rating.toFixed(1) : t('جديد', 'New')}</span>
                </div>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-500">
                  {product.reviewsCount} {t('تقييم مستأجرين سابقين', 'verified reviews')}
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium block">
                  {t('سعر الإيجار اليومي', 'Daily Rental Rate')}
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-3xl font-black text-slate-950">{product.dailyPrice}</span>
                  <span className="text-sm font-bold text-emerald-700">{t('ج.م / يوم', 'EGP / day')}</span>
                </div>
              </div>

              {product.weeklyPrice && (
                <div className="text-end">
                  <span className="text-xs text-slate-500 font-medium block">
                    {t('عرض الأسبوع (خصم)', 'Weekly Discount')}
                  </span>
                  <span className="text-sm font-bold text-slate-800">
                    {product.weeklyPrice} {t('ج.م / أسبوع', 'EGP/wk')}
                  </span>
                </div>
              )}
            </div>

            {/* Breakdown Snapshot */}
            <div className="space-y-2 text-xs text-slate-600 pt-1">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>{t('مبلغ التأمين المسترد (Security Deposit):', 'Refundable Deposit:')}</span>
                <span className="font-bold text-slate-900">{product.securityDeposit} ج.م</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>{t('توصيل واسترجاع بوسطة من الباب للباب:', 'Door-to-door Delivery:')}</span>
                <span className="font-bold text-slate-900">50 ج.م</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>{t('رسوم حماية المنصة والضمان:', 'Platform Protection Fee:')}</span>
                <span className="font-bold text-slate-900">20 ج.م</span>
              </div>
            </div>

            {/* Primary Action Button: Rent Now */}
            <button
              onClick={() => setBookingModalOpen(true)}
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base transition shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Calendar className="w-5 h-5" />
              <span>{t('تأجير المنتج الآن (Rent Now)', 'Rent Now')}</span>
            </button>

            {/* Safe Intermediary Note */}
            <p className="text-[11px] text-center text-slate-500 leading-relaxed">
              {t(
                '🔒 أموالك محفوظة في نظام حماية التأجير للمنصة، ولا تحول للمالك إلا بعد استلامك والتأكد من سلامة المنتج.',
                '🔒 Protected escrow simulation: Funds are released to owner only after successful inspection.'
              )}
            </p>
          </div>

          {/* Owner Section (Verified Host without private phone number!) */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {t('معلومات المالك المعتمد', 'Verified Owner Information')}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                {t('هوية وطنية موثقة', 'National ID Verified')}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-lg">
                {product.ownerName.charAt(0)}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-slate-900">
                  {language === 'ar' ? product.ownerNameAr : product.ownerName}
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <div className="flex items-center text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{product.ownerRating.toFixed(2)}</span>
                  </div>
                  <span>•</span>
                  <span>
                    {product.ownerCompletedRentals} {t('عملية تأجير ناجحة', 'rentals completed')}
                  </span>
                </div>
              </div>
            </div>

            {/* Privacy Guarantee Banner: No direct contacts */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t('حماية الخصوصية ومنع التواصل الخارجي', 'Privacy Protected')}</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {t(
                  'لحماية أمان الملاك والمستأجرين، لا تعرض أرقام الهواتف أو الواتساب. جميع التنسيقات وعمليات الشحن تتم تحت إشراف منصة رنت باك.',
                  'Personal phone numbers are hidden to protect privacy. All logistics are handled via RentBack.'
                )}
              </p>

              <button
                onClick={() => setSupportModalOpen(true)}
                className="w-full py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Headphones className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t('تواصل مع دعم المنصة للاستفسار', 'Contact Platform Support')}</span>
              </button>
            </div>
          </div>

          {/* Product Trust Section (Pillars) */}
          <div className="bg-emerald-50/70 rounded-3xl p-5 border border-emerald-100 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              {t('ضمانات رنت باك للتأجير الآمن', 'RentBack Trust Guarantees')}
            </h4>

            <div className="space-y-2.5 text-xs text-emerald-950">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>{t('فحص المنتج:', 'Product Reviewed:')} </strong>
                  {t('تمت مراجعة الصور وفحص العيوب والملحقات مسبقاً.', 'Photos and accessories verified.')}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>{t('هوية موثقة:', 'Identity Verified:')} </strong>
                  {t('هوية المالك مطابقة رسمياً بالرقم القومي.', 'Owner identity confirmed with Egyptian ID.')}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>{t('توصيل واسترجاع:', 'Delivery Available:')} </strong>
                  {t('شحن من الباب للباب عبر بوسطة ورنت باك إكسبريس.', 'Door-to-door courier service.')}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>{t('حماية الدفع:', 'Payment Protection:')} </strong>
                  {t('استرداد كامل للتأمين عند إرجاع المنتج بسلامة.', 'Full security deposit refund upon clean return.')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-slate-900 text-white rounded-3xl w-full max-w-xl overflow-hidden border border-slate-700 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base">
                  {t('فيديو فحص الحالة والتشغيل المعتمد', 'Verified Operating Condition Video')}
                </h3>
              </div>
              <button
                onClick={() => setShowVideoModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video bg-black rounded-2xl overflow-hidden relative flex items-center justify-center border border-slate-800">
              <img
                src={product.images[0]}
                alt=""
                className="w-full h-full object-cover opacity-40 blur-xs"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-lg shadow-emerald-600/40 animate-pulse">
                  ▶
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {language === 'ar' ? product.nameAr : product.name}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {t(
                      'تم توثيق تشغيل الجهاز واختبار أزراره وفحص المحرك قبل رفعه للمنصة',
                      'Operating motors and ports fully documented and recorded'
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <span>{t('مدة المقطع: 0:45 ثانية • دقة 1080p', 'Length: 0:45s • Full HD')}</span>
              <button
                onClick={() => setShowVideoModal(false)}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold"
              >
                {t('إغلاق والمعاينة', 'Close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
