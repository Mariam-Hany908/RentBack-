import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import {
  Clock,
  ShieldCheck,
  Heart,
  FileText,
  Headphones,
  CheckCircle2,
  Calendar,
  Truck,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';

export const RenterDashboardView: React.FC = () => {
  const {
    language,
    currentUser,
    bookings,
    products,
    favorites,
    navigateToTracking,
    setActiveView,
    setSupportModalOpen,
    t,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'active' | 'past' | 'saved' | 'agreements'>('active');

  const activeBookings = bookings.filter(
    (b) => b.status !== 'completed_deposit_refunded' && b.status !== 'cancelled'
  );
  const pastBookings = bookings.filter(
    (b) => b.status === 'completed_deposit_refunded' || b.status === 'cancelled'
  );
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile & Trust Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-black text-2xl shadow-md">
            {currentUser.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {language === 'ar' ? currentUser.nameAr : currentUser.name}
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                {t('مستأجر موثق رسمياً', 'Verified Renter')}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {currentUser.governorateAr || currentUser.governorate} • {t('رقم الهاتف:', 'Phone:')}{' '}
              <span className="font-mono text-slate-700">{currentUser.phone}</span>
            </p>
          </div>
        </div>

        {/* KYC Verification Card */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4 text-xs">
          <div>
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{t('توثيق بطاقة الرقم القومي المصري', 'Egyptian National ID KYC')}</span>
            </div>
            <div className="text-slate-500 text-[11px] mt-0.5 font-mono">
              ID: {currentUser.nationalId} (14 {t('رقماً مطابقاً مع الصورة الحيوية', 'digits biometric match')})
            </div>
          </div>
          <button
            onClick={() => setActiveView('identity_verification')}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold hover:bg-slate-100 transition whitespace-nowrap"
          >
            {t('عرض التوثيق', 'View KYC')}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs sm:text-sm font-bold">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'active'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>{t('الحجوزات النشطة الحالية', 'Active Rentals')}</span>
          <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-white text-[10px]">
            {activeBookings.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('past')}
          className={`px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'past'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t('الحجوزات السابقة والمكتملة', 'Past Rentals')}</span>
          <span className="px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 text-[10px]">
            {pastBookings.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'saved'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>{t('المنتجات المحفوظة في المفضلة', 'Saved Items')}</span>
          <span className="px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 text-[10px]">
            {favoriteProducts.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('agreements')}
          className={`px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'agreements'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{t('عقود واتفاقيات التأجير', 'Rental Agreements')}</span>
        </button>
      </div>

      {/* TAB CONTENT */}

      {/* 1. ACTIVE RENTALS */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {activeBookings.length === 0 ? (
            <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-3">
              <Clock className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-800 text-base">
                {t('لا توجد لديك حجوزات نشطة في الوقت الحالي', 'No active rentals at the moment')}
              </h3>
              <p className="text-xs text-slate-500">
                {t('تصفح الكتالوج واستأجر ما تحتاجه مع توصيل مدار وحماية كاملة.', 'Browse verified catalog and rent with confidence.')}
              </p>
              <button
                onClick={() => setActiveView('category_listing')}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                {t('تصفح المنتجات الآن', 'Browse Rentals')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {activeBookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5 hover:border-emerald-500 transition"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={b.product.images[0]}
                      alt=""
                      className="w-20 h-20 rounded-2xl object-cover border border-slate-100"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-slate-400 font-bold">{b.id}</span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                          {b.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <h4 className="font-black text-slate-900 text-sm sm:text-base">
                        {language === 'ar' ? b.product.nameAr : b.product.name}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {t('فترة الحجز:', 'Rental Period:')}{' '}
                        <strong className="text-slate-800 font-mono">
                          {b.startDate} ➔ {b.endDate}
                        </strong>{' '}
                        ({b.daysCount} {t('أيام', 'days')})
                      </p>
                    </div>
                  </div>

                  <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <div className="text-start md:text-end">
                      <div className="text-lg font-black text-slate-950">{b.totalAmount} ج.م</div>
                      <div className="text-[11px] text-emerald-700 font-semibold">
                        {t('يشمل تأمين مسترد:', 'Includes deposit:')} {b.securityDeposit} ج.م
                      </div>
                    </div>

                    <button
                      onClick={() => navigateToTracking(b.id)}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>{t('تتبع الحجز والفحص', 'Track Rental')}</span>
                      {language === 'ar' ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. PAST RENTALS */}
      {activeTab === 'past' && (
        <div className="space-y-4">
          {pastBookings.length === 0 ? (
            <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center text-xs text-slate-500">
              {t('لا توجد حجوزات سابقة منتهية بعد.', 'No completed rentals yet.')}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {pastBookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={b.product.images[0]}
                      alt=""
                      className="w-16 h-16 rounded-2xl object-cover opacity-80"
                    />
                    <div>
                      <span className="text-[10px] font-mono text-emerald-700 font-bold block">
                        ✓ {t('مكتمل وتم استرداد التأمين', 'Completed & Deposit Refunded')}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm">
                        {language === 'ar' ? b.product.nameAr : b.product.name}
                      </h4>
                      <div className="text-xs text-slate-400 font-mono">
                        {b.startDate} ➔ {b.endDate}
                      </div>
                    </div>
                  </div>

                  <div className="text-end">
                    <button
                      onClick={() => navigateToTracking(b.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
                    >
                      {t('عرض سجل الفحص النهائي', 'View Inspection Record')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. SAVED / FAVORITES */}
      {activeTab === 'saved' && (
        <div>
          {favoriteProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-3">
              <Heart className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-800 text-base">
                {t('لم تقم بحفظ أي منتجات في المفضلة بعد', 'No saved products yet')}
              </h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {favoriteProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. RENTAL AGREEMENTS */}
      {activeTab === 'agreements' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 font-black text-slate-900 text-base">
              <FileText className="w-5 h-5 text-emerald-600" />
              <span>{t('العقود والاتفاقيات الإلكترونية الموثقة بحسابك', 'Digitally Signed Rental Contracts')}</span>
            </div>
            <p className="text-xs text-slate-500">
              {t(
                'جميع العمليات التي قمت بها موثقة بعقد إلكتروني يحدد مواصفات المنتج وحالته عند الاستلام والتأمين.',
                'Each rental is backed by a legal electronic agreement covering damage deposit and courier terms.'
              )}
            </p>

            <div className="space-y-2">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-900">
                      {t('عقد إيجار رقم:', 'Contract #')} RH-AGREE-{b.id}
                    </div>
                    <div className="text-slate-500">
                      {language === 'ar' ? b.product.nameAr : b.product.name} • {b.startDate}
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                    {t('موقع ومطابق قانونياً ✓', 'Digitally Executed ✓')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
