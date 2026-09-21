import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RentalBooking, RentalStatus } from '../types';
import {
  Clock,
  CheckCircle2,
  Circle,
  Truck,
  ShieldCheck,
  Sparkles,
  Calendar,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  Package,
  RotateCcw,
  Check,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

const TRACKING_STAGES: { status: RentalStatus; titleAr: string; titleEn: string; descAr: string; descEn: string }[] = [
  {
    status: 'booking_confirmed',
    titleAr: '1. تم تأكيد الحجز والدفع',
    titleEn: '1. Booking Confirmed & Secured',
    descAr: 'تم حجز الأموال بأمان في نظام حماية المنصة وجاري تجهيز الشحنة.',
    descEn: 'Funds securely held in platform protection; ready for courier dispatch.',
  },
  {
    status: 'courier_assigned',
    titleAr: '2. تم تعيين مندوب الشحن المعتمد',
    titleEn: '2. Courier Assigned',
    descAr: 'تم تعيين كابتن بوسطة / رنت باك إكسبريس (كابتن حسام السيد).',
    descEn: 'Assigned courier captain for pickup from owner.',
  },
  {
    status: 'item_picked_up_owner',
    titleAr: '3. استلام المنتج من المالك',
    titleEn: '3. Item Picked Up from Owner',
    descAr: 'المندوب استلم المنتج وغلفه في صندوق الحماية المعتمد.',
    descEn: 'Item safely received from verified owner in courier box.',
  },
  {
    status: 'item_inspected_initial',
    titleAr: '4. فحص الجاهزية والملحقات (قبل التسليم)',
    titleEn: '4. Initial Condition Inspected',
    descAr: 'تم مطابقة الرقم التسلسلي والملحقات وحالة الهيكل عبر فحص الذكاء الاصطناعي.',
    descEn: 'Serial number verified, condition score logged before handover.',
  },
  {
    status: 'delivered_to_renter',
    titleAr: '5. تم التوصيل للمستأجر',
    titleEn: '5. Delivered to Renter',
    descAr: 'المستأجر استلم المنتج ووقع على إشعار الاستلام المطابق.',
    descEn: 'Renter received item and confirmed delivery condition.',
  },
  {
    status: 'rental_in_progress',
    titleAr: '6. فترة التأجير قيد الاستخدام',
    titleEn: '6. Rental in Progress',
    descAr: 'المنتج في حوزة المستأجر وفق مدة العقد المبرم.',
    descEn: 'Item is active with renter during the agreed period.',
  },
  {
    status: 'return_scheduled',
    titleAr: '7. جدولة استرجاع المنتج',
    titleEn: '7. Return Scheduled',
    descAr: 'تم إخطار المندوب وتحديد موعد الاستلام من المستأجر.',
    descEn: 'Courier schedule confirmed for pickup from renter.',
  },
  {
    status: 'return_picked_up',
    titleAr: '8. تم استلام المنتج للاسترجاع',
    titleEn: '8. Return Picked Up',
    descAr: 'المندوب استلم المنتج من المستأجر لنقله لمركز الفحص وإعادته للمالك.',
    descEn: 'Courier picked up item from renter for return logistics.',
  },
  {
    status: 'final_inspection',
    titleAr: '9. فحص الحالة النهائي (Final Inspection)',
    titleEn: '9. Final Condition Inspection',
    descAr: 'مقارنة الحالة النهائية بالصور السابقة للتأكد من عدم وجود خدوش أو تلفيات.',
    descEn: 'Comparing return photos with initial records for deposit clearance.',
  },
  {
    status: 'completed_deposit_refunded',
    titleAr: '10. اكتمال التأجير واسترداد التأمين وتحويل الأرباح',
    titleEn: '10. Deposit Refunded & Payout Released',
    descAr: 'تم الإفراج التلقائي عن مبلغ التأمين للمستأجر وتحويل أرباح الإيجار للمالك بنجاح.',
    descEn: 'Security deposit fully refunded; owner payout transferred.',
  },
];

export const RentalTrackingView: React.FC = () => {
  const {
    bookings,
    selectedBookingId,
    setSelectedBookingId,
    updateBookingStatus,
    language,
    setActiveView,
    t,
  } = useApp();

  const booking = bookings.find((b) => b.id === selectedBookingId) || bookings[0];

  const currentStageIndex = TRACKING_STAGES.findIndex((s) => s.status === booking.status);

  const handleAdvanceStatus = () => {
    if (currentStageIndex < TRACKING_STAGES.length - 1) {
      const nextStatus = TRACKING_STAGES[currentStageIndex + 1].status;
      updateBookingStatus(booking.id, nextStatus);
    }
  };

  const handleTriggerReturn = () => {
    updateBookingStatus(booking.id, 'return_scheduled');
  };

  const handleReportDamage = () => {
    updateBookingStatus(booking.id, 'disputed_damage');
    setActiveView('disputes');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 mb-1">
            <Truck className="w-4 h-4" />
            <span>{t('منظومة التتبع والشحن الرقمية المدارة', 'Managed Rental & Delivery Tracking')}</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">
            {t('تتبع دورة حياة الحجز والشحن', 'Rental Tracking Timeline')}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {t('رقم الحجز:', 'Booking ID:')}{' '}
            <span className="font-mono font-bold text-slate-800">{booking.id}</span> •{' '}
            {language === 'ar' ? booking.product.nameAr : booking.product.name}
          </p>
        </div>

        {/* Quick Booking Switcher */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-500">{t('اختر حجزا:', 'Select Booking:')}</label>
          <select
            value={booking.id}
            onChange={(e) => setSelectedBookingId(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {bookings.map((b) => (
              <option key={b.id} value={b.id}>
                {b.id} ({language === 'ar' ? b.product.nameAr : b.product.name})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: 10-Stage Timeline (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600" />
              <span>{t('مراحل التوصيل والفحص والاسترجاع (10 مراحل)', '10-Stage Rental Lifecycle')}</span>
            </h3>

            {/* Prototype advance button */}
            {currentStageIndex < TRACKING_STAGES.length - 1 && (
              <button
                onClick={handleAdvanceStatus}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span>{t('محاكاة: الانتقال للمرحلة التالية', 'Advance Stage')}</span>
                {language === 'ar' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            )}
          </div>

          {/* Timeline Feed */}
          <div className="relative border-s-2 border-slate-100 rtl:border-r-2 rtl:border-s-0 ms-4 rtl:mr-4 rtl:ml-0 space-y-6">
            {TRACKING_STAGES.map((stage, idx) => {
              const isPast = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              const isFuture = idx > currentStageIndex;

              return (
                <div key={stage.status} className="relative ps-6 rtl:pr-6 rtl:pl-0 group">
                  {/* Circle Indicator */}
                  <div
                    className={`absolute -start-[11px] rtl:-right-[11px] rtl:left-auto top-0.5 w-5 h-5 rounded-full flex items-center justify-center transition ${
                      isPast
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                        : isCurrent
                        ? 'bg-amber-500 text-white ring-4 ring-amber-100 animate-pulse'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {isPast ? (
                      <Check className="w-3 h-3 stroke-[3]" />
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                    )}
                  </div>

                  {/* Stage Text */}
                  <div
                    className={`p-3.5 rounded-2xl transition ${
                      isCurrent
                        ? 'bg-amber-50/70 border border-amber-200'
                        : isPast
                        ? 'bg-emerald-50/30'
                        : 'opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-xs sm:text-sm font-bold ${
                          isCurrent
                            ? 'text-amber-950 font-black'
                            : isPast
                            ? 'text-emerald-950'
                            : 'text-slate-600'
                        }`}
                      >
                        {language === 'ar' ? stage.titleAr : stage.titleEn}
                      </h4>

                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold">
                          {t('المرحلة الحالية الآن', 'Active Stage')}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 mt-1">
                      {language === 'ar' ? stage.descAr : stage.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dispute alert if flagged */}
          {booking.status === 'disputed_damage' && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-rose-900 text-xs sm:text-sm">
                  {t('هناك نزاع مفتوح بخصوص تلفيات في هذا الحجز', 'Active Damage Dispute Pending Review')}
                </h4>
                <p className="text-xs text-rose-700 mt-1">
                  {t(
                    'تم تجميد مبلغ التأمين مؤقتاً لحين انتهاء لجنة التحكيم بالمنصة من مطابقة صور الفحص وإصدار القرار.',
                    'Security deposit temporarily frozen pending platform arbitration report.'
                  )}
                </p>
                <button
                  onClick={() => setActiveView('disputes')}
                  className="mt-2 text-xs font-bold text-rose-800 underline"
                >
                  {t('فتح شاشة فض النزاعات والأضرار ←', 'View Dispute Resolution →')}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Inspection Report & Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Booking Summary Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-slate-900 text-sm">
                {t('ملخص المعاملة المالية والحجز', 'Booking & Escrow Summary')}
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                {t('مدفوع ومحمي', 'Paid & Protected')}
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>{t('تواريخ التأجير:', 'Rental Dates:')}</span>
                <span className="font-bold text-slate-900 font-mono">
                  {booking.startDate} ➔ {booking.endDate} ({booking.daysCount} {t('أيام', 'days')})
                </span>
              </div>
              <div className="flex justify-between">
                <span>{t('قيمة الإيجار:', 'Rental Cost:')}</span>
                <span className="font-bold text-slate-900">{booking.rentalCost} ج.م</span>
              </div>
              <div className="flex justify-between">
                <span>{t('مبلغ التأمين المحتجز:', 'Held Security Deposit:')}</span>
                <span className="font-bold text-emerald-700">{booking.securityDeposit} ج.م</span>
              </div>
              <div className="flex justify-between">
                <span>{t('رسوم الشحن والتوصيل:', 'Delivery Fee:')}</span>
                <span className="font-bold text-slate-900">{booking.deliveryFee} ج.م</span>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between font-black text-sm text-slate-950">
                <span>{t('الإجمالي المدفوع:', 'Total Paid:')}</span>
                <span className="text-emerald-700">{booking.totalAmount} ج.م</span>
              </div>
            </div>

            {/* Courier info */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t('شركة الشحن والكابتن المسؤول:', 'Assigned Courier Captain:')}</span>
              </div>
              <p className="text-slate-600">
                {booking.courierCompany || 'RentBack Express'} • {booking.courierCaptainName || 'Captain Hossam El-Sayed'}
              </p>
              <p className="text-[11px] text-slate-400 font-mono">
                {t('رقم بوليصة الشحن:', 'Tracking Waybill:')} {booking.trackingNumber || 'RB-EG-99824'}
              </p>
            </div>

            {/* Interactive Actions for Renter/Owner in this stage */}
            <div className="space-y-2 pt-2">
              {booking.status === 'delivered_to_renter' && (
                <button
                  onClick={() => updateBookingStatus(booking.id, 'rental_in_progress')}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition"
                >
                  {t('تأكيد استلام المنتج وبدء فترة الاستخدام', 'Confirm Receipt & Start Rental')}
                </button>
              )}

              {booking.status === 'rental_in_progress' && (
                <button
                  onClick={handleTriggerReturn}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t('طلب واستدعاء المندوب لاسترجاع المنتج', 'Schedule Return Pickup')}</span>
                </button>
              )}

              <button
                onClick={handleReportDamage}
                className="w-full py-2 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-700 font-bold text-xs transition flex items-center justify-center gap-1.5"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{t('الإبلاغ عن تلفيات أو نزاع (Damage Dispute)', 'Report Damage / Dispute')}</span>
              </button>
            </div>
          </div>

          {/* Digital Inspection Report Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <h3 className="font-black text-slate-900 text-sm">
                  {t('سجل الفحص المقارن (Inspection Record)', 'Digital Inspection Record')}
                </h3>
              </div>
              <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">
                {t('مفحوص رقمياً', 'AI Verified')}
              </span>
            </div>

            {/* Before / After Photos Compare */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1.5">
                <span className="font-bold text-slate-700 block text-[11px]">
                  {t('صور الفحص قبل التسليم:', 'Before Delivery:')}
                </span>
                <div className="aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  <img
                    src={booking.product.images[0]}
                    alt="Before"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-[10px] text-emerald-700 font-bold">
                  ✓ {t('سليم تماماً • خالي من الخدوش', 'Clean condition • No scratches')}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="font-bold text-slate-700 block text-[11px]">
                  {t('صور فحص الاسترجاع:', 'After Return:')}
                </span>
                <div className="aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-400 text-[11px] p-2 text-center">
                  {booking.status === 'completed_deposit_refunded' || booking.status === 'final_inspection' ? (
                    <img
                      src={booking.product.images[0]}
                      alt="After"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{t('سيتم التقاطها عند استرجاع المندوب', 'Captured upon return')}</span>
                  )}
                </div>
                <div className="text-[10px] text-slate-500">
                  {booking.status === 'completed_deposit_refunded'
                    ? `✓ ${t('مطابق للفحص الأولي', 'Matches initial check')}`
                    : t('قيد انتظار الاسترجاع', 'Awaiting return')}
                </div>
              </div>
            </div>

            {/* Inspector Notes */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
              <div className="flex justify-between text-slate-500 text-[11px]">
                <span>{t('المفتش المعتمد:', 'Inspector:')} مركز رنت باك مصر للفحص</span>
                <span>{booking.startDate}</span>
              </div>
              <p className="text-slate-700 font-medium">
                {t(
                  'تم تشغيل الجهاز، اختبار المحرك والأزرار ومطابقة السيريال نمبر وكابل الكهرباء. الحالة التشغيلية 98%.',
                  'Operating tests passed. Serial number and power cables verified. Condition score: 98%.'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
