import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  AlertTriangle,
  Scale,
  ShieldCheck,
  CheckCircle2,
  Upload,
  FileText,
  DollarSign,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export const DisputeSystemView: React.FC = () => {
  const {
    language,
    disputes,
    bookings,
    submitDispute,
    resolveDispute,
    currentUser,
    t,
  } = useApp();

  const [isFilingNew, setIsFilingNew] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(bookings[0]?.id || '');
  const [damageDescription, setDamageDescription] = useState('');
  const [claimAmount, setClaimAmount] = useState(250);
  const [liabilityVerdict, setLiabilityVerdict] = useState<'normal_wear' | 'minor_damage' | 'severe_damage'>('minor_damage');

  const selectedBooking = bookings.find((b) => b.id === selectedBookingId) || bookings[0];

  const handleFileDispute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!damageDescription.trim()) return;

    submitDispute({
      bookingId: selectedBooking.id,
      productId: selectedBooking.productId,
      productName: language === 'ar' ? selectedBooking.product.nameAr : selectedBooking.product.name,
      claimantOwnerName: language === 'ar' ? selectedBooking.product.ownerNameAr : selectedBooking.product.ownerName,
      renterName: language === 'ar' ? currentUser.nameAr : currentUser.name,
      damageDescription,
      claimAmount,
      securityDepositTotal: selectedBooking.securityDeposit,
      evidencePhotos: {
        beforeRental: selectedBooking.product.images[0],
        afterReturn: selectedBooking.product.images[1] || selectedBooking.product.images[0],
      },
    });

    setIsFilingNew(false);
    setDamageDescription('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <Scale className="w-4 h-4" />
          <span>{t('منظومة فض النزاعات والأضرار المحايدة', 'Platform Dispute Resolution & Arbitration')}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">
          {t('حماية نزيهة وتسوية عادلة لحالات التلفيات', 'Fair & Transparent Damage Claims')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          {t(
            'لا حاجة للخلاف المباشر بين المالك والمستأجر. يقوم فريق التحكيم الفني بمقارنة صور الفحص الرقمي قبل وبعد التأجير لتحديد المسؤولية واقتطاع التعويض بدقة.',
            'No personal confrontation. Our technical committee reviews digital before/after inspection records to assess liability impartially.'
          )}
        </p>

        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={() => setIsFilingNew(true)}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-rose-600/30 transition cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>{t('تقديم بلاغ تلفيات أو نزاع جديد', 'File New Damage Claim')}</span>
          </button>
        </div>
      </div>

      {/* NEW CLAIM MODAL / FORM */}
      {isFilingNew && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-200 shadow-lg space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <span>{t('نموذج تسجيل مطالبة تلفيات رسمية', 'Official Damage Claim Form')}</span>
            </h3>
            <button
              onClick={() => setIsFilingNew(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleFileDispute} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  {t('اختر الحجز المتعلق بالضرر:', 'Select Rental Booking:')}
                </label>
                <select
                  value={selectedBookingId}
                  onChange={(e) => setSelectedBookingId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-800"
                >
                  {bookings.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.id} ({language === 'ar' ? b.product.nameAr : b.product.name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  {t('قيمة التعويض التقديري للإصلاح (ج.م):', 'Estimated Repair Claim (EGP):')}
                </label>
                <input
                  type="number"
                  value={claimAmount}
                  onChange={(e) => setClaimAmount(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-black text-slate-900"
                />
                <span className="text-[10px] text-slate-400">
                  {t('أقصى مبلغ يقتطع من التأمين:', 'Max deducible from deposit:')} {selectedBooking.securityDeposit} ج.م
                </span>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">
                {t('وصف التلف أو العيب بدقة:', 'Detailed Damage Description:')}
              </label>
              <textarea
                rows={3}
                value={damageDescription}
                onChange={(e) => setDamageDescription(e.target.value)}
                placeholder={t(
                  'اذكر موضع الخدش أو العيب ومطابقته مع الملحقات المفقودة...',
                  'Describe the scratch, fracture, or missing accessory...'
                )}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>

            {/* Simulated Evidence upload */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-300 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Upload className="w-6 h-6 text-slate-400" />
                <div>
                  <span className="font-bold text-slate-800 block">
                    {t('تم إرفاق صور الفحص الرقمي تلقائياً من المندوب', 'Inspection photos linked automatically')}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    2 {t('صور عالية الدقة جاهزة للمقارنة', 'high-resolution photos ready')}
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700">✓ {t('مرفقة', 'Attached')}</span>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsFilingNew(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold"
              >
                {t('إلغاء', 'Cancel')}
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-md shadow-rose-600/30 cursor-pointer"
              >
                {t('إرسال المطالبة للتحكيم', 'Submit to Arbitration')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DISPUTES LIST */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-900">
            {t('سجل النزاعات الحالية والمحسومة', 'Active & Settled Claims')}
          </h2>
          <span className="text-xs text-slate-500 font-semibold">
            {disputes.length} {t('نزاعات مسجلة', 'claims logged')}
          </span>
        </div>

        <div className="space-y-6">
          {disputes.map((dispute) => (
            <div
              key={dispute.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6"
            >
              {/* Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-500">{dispute.id}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                        dispute.status === 'resolved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800 animate-pulse'
                      }`}
                    >
                      {dispute.status === 'resolved'
                        ? t('تم حسم النزاع رسمياً (RESOLVED)', 'RESOLVED')
                        : t('قيد التحكيم والمراجعة (UNDER REVIEW)', 'UNDER REVIEW')}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mt-1">
                    {dispute.productName}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {t('المالك:', 'Owner:')} {dispute.claimantOwnerName} • {t('المستأجر:', 'Renter:')}{' '}
                    {dispute.renterName} • {t('الحجز:', 'Booking:')} {dispute.bookingId}
                  </p>
                </div>

                <div className="text-start sm:text-end bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                  <span className="text-[11px] text-slate-500 font-semibold block">
                    {t('المطالبة المالية:', 'Claim Amount:')}
                  </span>
                  <div className="text-xl font-black text-rose-700">{dispute.claimAmount} ج.م</div>
                  <span className="text-[10px] text-slate-400">
                    {t('من إجمالي تأمين محتجز:', 'From held deposit:')} {dispute.securityDepositTotal} ج.م
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                <span className="font-bold text-slate-800 block">
                  {t('وصف المشكلة والأضرار:', 'Damage Statement:')}
                </span>
                <p className="text-slate-700 leading-relaxed">{dispute.damageDescription}</p>
              </div>

              {/* Photos Comparison */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                  {t('المقارنة الرقمية بين الفحصين (Digital Evidence Inspection):', 'Digital Photo Comparison:')}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <span className="font-bold text-slate-600 block text-[11px]">
                      {t('1. صورة الفحص قبل التسليم (حالة سليمة تماماً):', '1. Before Rental (Clean):')}
                    </span>
                    <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                      <img
                        src={dispute.evidencePhotos.beforeRental}
                        alt="Before"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[10px] text-emerald-700 font-bold block">
                      ✓ {t('فحص معتمد وخالي من الخدوش', 'Verified clean condition')}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="font-bold text-slate-600 block text-[11px]">
                      {t('2. صورة الفحص عند الاسترجاع (الخدش أو الكسر الموثق):', '2. After Return (Documented Defect):')}
                    </span>
                    <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 border-2 border-rose-500">
                      <img
                        src={dispute.evidencePhotos.afterReturn}
                        alt="After"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[10px] text-rose-600 font-bold block">
                      ⚠ {t('تم توثيق وجود خدش عميق بالهيكل الجانبي', 'Deep scratch verified on side casing')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Decision Rules & Resolution */}
              {dispute.status === 'resolved' ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-emerald-950">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{t('القرار التحكيمي المعتمد من المنصة:', 'Official Platform Resolution Ruling:')}</span>
                  </div>
                  <p className="text-emerald-900 leading-relaxed">{dispute.resolutionNotes}</p>
                  <div className="flex gap-4 pt-1 text-[11px] font-mono text-emerald-800">
                    <span>{t('تعويض المالك:', 'Owner Payout:')} {dispute.payoutToOwner} ج.م</span>
                    <span>•</span>
                    <span>{t('المبلغ المسترد للمستأجر:', 'Renter Refund:')} {dispute.refundToRenter} ج.م</span>
                  </div>
                </div>
              ) : (
                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">
                    {t(
                      'بصفتك ممثل المنصة، يمكنك إصدار القرار الآن وتوزيع التأمين.',
                      'As platform arbitrator, you can rule and allocate the deposit.'
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        resolveDispute(
                          dispute.id,
                          dispute.claimAmount,
                          dispute.securityDepositTotal - dispute.claimAmount,
                          'تم تأكيد الضرر بمطابقة الصور. تم خصم قيمة الإصلاح (250 ج.م) للمالك، وتحويل باقي التأمين (250 ج.م) للمستأجر.'
                        )
                      }
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition cursor-pointer"
                    >
                      {t('إقرار الضرر واقتطاع 250 ج.م للمالك', 'Acknowledge & Deduct 250 EGP')}
                    </button>
                    <button
                      onClick={() =>
                        resolveDispute(
                          dispute.id,
                          0,
                          dispute.securityDepositTotal,
                          'تم فحص الصور وتبين أن الضرر استهلاك طبيعي (Normal Wear & Tear)، تم رد كامل التأمين للمستأجر.'
                        )
                      }
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition cursor-pointer"
                    >
                      {t('استهلاك طبيعي (رد كامل التأمين)', 'Normal Wear (Full Refund)')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
