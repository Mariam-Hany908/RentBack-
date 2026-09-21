import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES_LIST, EGYPT_GOVERNORATES } from '../mockData';
import {
  Search,
  ShieldCheck,
  Calendar,
  CreditCard,
  Truck,
  RotateCcw,
  Sparkles,
  MapPin,
  CheckCircle2,
  DollarSign,
  ChevronRight,
  ChevronLeft,
  Users,
  ShieldAlert,
  Flame,
  Award,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    language,
    products,
    searchQuery,
    setSearchQuery,
    searchGovernorate,
    setSearchGovernorate,
    searchCategory,
    setSearchCategory,
    searchMaxBudget,
    setSearchMaxBudget,
    searchDuration,
    setSearchDuration,
    navigateToCategory,
    setActiveView,
    t,
  } = useApp();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveView('category_listing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const approvedProducts = products.filter((p) => p.approvalStatus === 'approved');
  const popularProducts = approvedProducts.slice(0, 4);
  const recommendedProducts = approvedProducts.slice(4, 10);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Background decorative ambient glow */}
        <div className="absolute -top-40 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          {/* Trust pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              {t(
                'المنصة الموثوقة الأولى في مصر لتأجير المنتجات بأمان وضمان',
                'Egypt’s #1 Verified Peer-to-Peer Rental Intermediary'
              )}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
            {t('أجّر ما تحتاجه.. متى تحتاجه', 'Rent What You Need. When You Need It.')}
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            {t(
              'أجّر منتجات موثوقة ومفحوصة من ملاك حقيقيين في مصر مع دفع آمن وتوصيل واسترجاع مدار بالكامل وحماية من الأضرار.',
              'Rent verified products from trusted owners with secure payments and managed delivery.'
            )}
          </p>

          {/* Comprehensive Search & Filter Box */}
          <div className="pt-4 max-w-4xl mx-auto text-slate-800">
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-slate-200 text-start space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {/* 1. Product Name Query */}
                <div className="lg:col-span-2 space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                    <Search className="w-3.5 h-3.5 text-emerald-600" />
                    {t('اسم المنتج أو الكلمة الدلالية', 'Product Name / Keyword')}
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('مثال: مكواة بخار، كاميرا سوني، شنيور...', 'e.g., Iron, Sony Camera, Drill...')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>

                {/* 2. Category */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    {t('القسم', 'Category')}
                  </label>
                  <select
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
                  >
                    <option value="">{t('جميع الأقسام', 'All Categories')}</option>
                    {CATEGORIES_LIST.map((c) => (
                      <option key={c.id} value={c.id}>
                        {language === 'ar' ? c.nameAr : c.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Governorate */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    {t('المحافظة', 'Governorate')}
                  </label>
                  <select
                    value={searchGovernorate}
                    onChange={(e) => setSearchGovernorate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
                  >
                    <option value="">{t('كل المحافظات (مصر)', 'All Governorates')}</option>
                    {EGYPT_GOVERNORATES.map((g) => (
                      <option key={g.en} value={g.en}>
                        {language === 'ar' ? g.ar : g.en}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 4. Rental Duration */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    {t('مدة التأجير', 'Duration')}
                  </label>
                  <select
                    value={searchDuration}
                    onChange={(e) => setSearchDuration(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
                  >
                    <option value={1}>{t('يوم واحد (24 ساعة)', '1 Day (24 hrs)')}</option>
                    <option value={2}>{t('يومان (48 ساعة)', '2 Days')}</option>
                    <option value={3}>{t('3 أيام (عطلة نهاية أسبوع)', '3 Days')}</option>
                    <option value={7}>{t('أسبوع (7 أيام)', '1 Week (7 Days)')}</option>
                    <option value={14}>{t('أسبوعان (14 يوماً)', '2 Weeks')}</option>
                    <option value={30}>{t('شهر كامل (30 يوماً)', '1 Month (30 Days)')}</option>
                  </select>
                </div>
              </div>

              {/* Bottom Row: Budget Slider + CTA Button */}
              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="w-full sm:w-auto flex items-center gap-3">
                  <div className="text-xs text-slate-600 whitespace-nowrap">
                    <span className="font-bold text-slate-800">{t('أقصى ميزانية يومية:', 'Max daily budget:')} </span>
                    <span className="text-emerald-700 font-extrabold text-sm">{searchMaxBudget} ج.م</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1500"
                    step="25"
                    value={searchMaxBudget}
                    onChange={(e) => setSearchMaxBudget(Number(e.target.value))}
                    className="w-36 accent-emerald-600 cursor-pointer"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm transition shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Search className="w-4 h-4" />
                  <span>{t('بحث في المنتجات المتاحة', 'Search Rentals')}</span>
                </button>
              </div>
            </form>

            {/* Quick search tags */}
            <div className="flex items-center justify-center gap-2 pt-3 text-xs text-slate-400 flex-wrap">
              <span className="font-semibold text-slate-300">{t('شائع البحث:', 'Popular searches:')}</span>
              {[
                { ar: 'مكواة بخار', en: 'Steam Iron' },
                { ar: 'كاميرا سوني', en: 'Sony Camera' },
                { ar: 'شنيور وهيلتي', en: 'Power Drill' },
                { ar: 'بلايستيشن 5', en: 'PlayStation 5' },
                { ar: 'خيمة تخييم', en: 'Camping Tent' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSearchQuery(item.en);
                    setActiveView('category_listing');
                  }}
                  className="px-2.5 py-0.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-[11px] transition cursor-pointer"
                >
                  {language === 'ar' ? item.ar : item.en}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section 4: Popular Categories */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-6 rounded-full bg-emerald-600"></span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {t('الأقسام الشائعة للتأجير', 'Popular Categories')}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {t('استكشف آلاف المنتجات المفحوصة في مصر حسب الفئة', 'Explore thousands of verified items by category')}
              </p>
            </div>

            <button
              onClick={() => setActiveView('categories')}
              className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition"
            >
              <span>{t('عرض جميع الأقسام', 'View All Categories')}</span>
              {language === 'ar' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {CATEGORIES_LIST.map((cat) => (
              <div
                key={cat.id}
                onClick={() => navigateToCategory(cat.id)}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition p-3.5 text-center cursor-pointer flex flex-col items-center justify-between"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-100 group-hover:bg-emerald-50 transition flex items-center justify-center overflow-hidden mb-2.5">
                  <img
                    src={cat.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition line-clamp-1">
                  {language === 'ar' ? cat.nameAr : cat.nameEn}
                </h3>
                <span className="text-[10px] text-slate-400 mt-1 font-semibold">
                  {cat.count} {t('منتج متاح', 'items available')}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5A: Popular Rentals */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {t('المنتجات الأكثر طلباً وتأجيراً', 'Popular Rentals')}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {t('منتجات حققت أعلى تقييمات وتأجير متكرر في مصر', 'Highest rated items with verified condition records')}
              </p>
            </div>

            <button
              onClick={() => setActiveView('category_listing')}
              className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition"
            >
              <span>{t('تصفح المزيد', 'Browse More')}</span>
              {language === 'ar' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popularProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Section 5B: How It Works */}
        <section
          id="how-it-works-section"
          className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-xl"
        >
          <div className="max-w-3xl mb-10 text-start space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              {t('بساطة وأمان كامل', 'Simple & Secure')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              {t('كيف يعمل تأجير المنتجات مع رنت باك؟', 'How It Works')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              {t(
                'أربع خطوات سهلة تضمن استلام ما تحتاجه وحماية أموالك وسلامة المنتج دون أي تعقيد.',
                'Four steps to rent verified items and protect your transactions.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 space-y-3 relative group hover:border-emerald-500 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 font-black text-lg flex items-center justify-center">
                1
              </div>
              <h3 className="font-bold text-base text-white">
                {t('1. ابحث عما تحتاجه', '1. Find what you need')}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t(
                  'اختر من آلاف المنتجات المفحوصة والموثوقة في محافظتك وبالسعر المناسب لميزانيتك.',
                  'Search verified listings with high-resolution photos and AI condition scores.'
                )}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 space-y-3 relative group hover:border-emerald-500 transition">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 font-black text-lg flex items-center justify-center">
                2
              </div>
              <h3 className="font-bold text-base text-white">
                {t('2. حدد تواريخ الإيجار', '2. Choose rental dates')}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t(
                  'حدد تاريخ البداية والنهاية، واحصل على احتساب فوري وشفاف لسعر الإيجار والتأمين والشحن.',
                  'Select start and end dates with clear breakdown of daily rate and security deposit.'
                )}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 space-y-3 relative group hover:border-emerald-500 transition">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 font-black text-lg flex items-center justify-center">
                3
              </div>
              <h3 className="font-bold text-base text-white">
                {t('3. ادفع بأمان وضمان', '3. Pay securely')}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t(
                  'أموالك محفوظة في نظام حماية التأجير للمنصة، ولا تسلم للمالك إلا بعد استلامك وتأكيد الفحص.',
                  'Payment and deposit are held safely in platform protection until successful inspection.'
                )}
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 space-y-3 relative group hover:border-emerald-500 transition">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 font-black text-lg flex items-center justify-center">
                4
              </div>
              <h3 className="font-bold text-base text-white">
                {t('4. استلم واسترجع عبر المنصة', '4. Receive & return')}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t(
                  'مندوب الشحن المعتمد يوصل المنتج لبابك ويسترده بعد انتهاء المدة مع توثيق الفحص واسترداد التأمين.',
                  'Door-to-door courier delivery and pickup with digital before/after inspection check.'
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Section 5C: Recommended Rentals */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {t('منتجات مميزة موصى بها لك', 'Recommended Rentals')}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {t('تم فحصها بواسطة الذكاء الاصطناعي وتوثيق هوية ملاكها', 'Inspected items with verified owners ready to dispatch')}
              </p>
            </div>

            <button
              onClick={() => setActiveView('category_listing')}
              className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition"
            >
              <span>{t('عرض الكل', 'View All')}</span>
              {language === 'ar' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recommendedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Section 5D: Why Rent With Us? */}
        <section className="bg-emerald-50/50 rounded-3xl border border-emerald-100 p-6 sm:p-10 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
              {t('منظومة الثقة والأمان المتكاملة', 'Trust & Safety Ecosystem')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {t('لماذا تؤجر وتستأجر من خلال رنت باك؟', 'Why Rent With Us?')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {t(
                'لسنا مجرد موقع إعلانات مبوبة، نحن وسيط يضمن سلامة الجميع من الألف إلى الياء.',
                'Not a classifieds board. We are an active intermediary managing KYC, inspection, and payments.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Verified Users */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                {t('مستخدمون موثقون بالهوية (Verified Users)', 'Verified Users')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t(
                  'كل مالك ومستأجر يمر بفحص إلزامي لبطاقة الرقم القومي المصري مع التحقق الحيوي بالصورة الشخصية.',
                  'Every user undergoes mandatory National ID verification and biometric face match.'
                )}
              </p>
            </div>

            {/* 2. Verified Products */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                {t('منتجات مفحوصة بدقة (Verified Products)', 'Verified Products')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t(
                  'فحص عبر كاميرا التطبيق مع تحليل ذكي بالذكاء الاصطناعي وتدقيق إداري للتأكد من الحالة والملحقات.',
                  'Multi-angle camera check, AI condition analysis, and admin approval before publishing.'
                )}
              </p>
            </div>

            {/* 3. Secure Payment */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                {t('دفع آمن ومحمي (Secure Payment)', 'Secure Payment')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t(
                  'حفظ قيمة الإيجار ومبلغ التأمين بأمان حتى استلام المنتج والتأكد من مطابقته قبل تحويل المستحقات للمالك.',
                  'Rental payments and deposits are held safely in platform protection until successful inspection.'
                )}
              </p>
            </div>

            {/* 4. Managed Delivery */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                {t('شحن وتوصيل مدار (Managed Delivery)', 'Managed Delivery')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t(
                  'خدمة توصيل واسترجاع من الباب للباب عبر شركائنا المعتمدين في مصر، دون الحاجة للقاء شخصي مباشر.',
                  'Door-to-door courier service with verified couriers, eliminating risky personal handoffs.'
                )}
              </p>
            </div>

            {/* 5. Damage Protection */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                {t('حماية من التلفيات (Damage Protection)', 'Damage Protection')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t(
                  'سجل فحص رقمي بالصور قبل وبعد التأجير لمقارنة حالة المنتج بدقة متناهية وإثبات سلامته.',
                  'Digital condition records comparing high-res photos before rental versus after return.'
                )}
              </p>
            </div>

            {/* 6. Platform-Managed Disputes */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                {t('فض نزاعات محايد وعادل (Platform Disputes)', 'Platform-Managed Disputes')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t(
                  'فريق تحكيم وقانوني متخصص يفصل في أي خلاف بناءً على شروط العقد الإلكتروني وصور الفحص المعتمدة.',
                  'Professional arbitration committee resolves claims fairly based on digital evidence and agreement.'
                )}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
