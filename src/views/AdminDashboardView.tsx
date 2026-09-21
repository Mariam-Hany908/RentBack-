import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Sparkles,
  Users,
  Package,
  DollarSign,
  TrendingUp,
  FileText,
  Search,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const {
    language,
    products,
    bookings,
    disputes,
    approveProduct,
    rejectProduct,
    resolveDispute,
    setActiveView,
    setSelectedBookingId,
    t,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'products' | 'kyc' | 'disputes' | 'rentals'>('products');

  // Products pending review
  const pendingProducts = products.filter((p) => p.approvalStatus === 'pending_review');
  const openDisputes = disputes.filter((d) => d.status === 'under_review' || d.status === 'open');

  // Stats
  const totalVolume = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const platformFeesEarned = bookings.reduce((sum, b) => sum + b.platformFee, 0) + 1280;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>{t('لوحة تحكم المشرف والإدارة المركزية', 'Central Admin & Operations Console')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black mt-1">
              {t('منظومة إدارة رنت باك مصر', 'RentBack Egypt Operations')}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {t(
                'الرقابة على اعتمادات المنتجات، التحقق من الهويات، فض نزاعات الأضرار ومتابعة الشحن.',
                'Mediate product reviews, KYC identity approvals, damage claims, and courier operations.'
              )}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs text-emerald-400 font-bold">
              {t('الخدمة متصلة ومباشرة', 'All Systems Operational')}
            </span>
          </div>
        </div>

        {/* Global Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">
              {t('حجم التأجير الإجمالي', 'Total Rental Volume')}
            </span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400">{totalVolume + 14500} ج.م</div>
            <span className="text-[10px] text-slate-400">{t('في 8 محافظات', 'Across 8 governorates')}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">
              {t('عوائد المنصة المحصلة', 'Platform Revenue')}
            </span>
            <div className="text-xl sm:text-2xl font-black text-white">{platformFeesEarned} ج.م</div>
            <span className="text-[10px] text-slate-400">{t('رسوم ضمان وإدارة', 'Safety fee share')}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">
              {t('منتجات بانتظار الاعتماد', 'Pending Listings')}
            </span>
            <div className="text-xl sm:text-2xl font-black text-amber-400">{pendingProducts.length}</div>
            <span className="text-[10px] text-amber-400/80">{t('تتطلب مراجعة فورية', 'Requires inspection')}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">
              {t('نزاعات أضرار مفتوحة', 'Open Disputes')}
            </span>
            <div className="text-xl sm:text-2xl font-black text-rose-400">{openDisputes.length}</div>
            <span className="text-[10px] text-rose-400/80">{t('تحكيم فني وتوزيع تأمين', 'Arbitration queue')}</span>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs sm:text-sm font-bold">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'products'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>{t('طابور مراجعة المنتجات', 'Listing Approvals Queue')}</span>
          {pendingProducts.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px]">
              {pendingProducts.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('kyc')}
          className={`px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'kyc'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{t('فحص الرقم القومي والتوثيق', 'Identity KYC Queue')}</span>
          <span className="px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 text-[10px]">
            1 {t('معلق', 'pending')}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('disputes')}
          className={`px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'disputes'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>{t('إدارة وفض النزاعات والأضرار', 'Dispute Resolution')}</span>
          {openDisputes.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px]">
              {openDisputes.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('rentals')}
          className={`px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'rentals'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>{t('متابعة الحجوزات النشطة والشحن', 'Active Rentals Monitor')}</span>
          <span className="px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 text-[10px]">
            {bookings.length}
          </span>
        </button>
      </div>

      {/* TAB 1: PRODUCT APPROVAL QUEUE */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-slate-900 text-base">
                  {t('طلبات الإدراج الجديدة من الملاك (فحص واعتماد)', 'New Listings Awaiting Admin Inspection')}
                </h3>
                <p className="text-xs text-slate-500">
                  {t(
                    'راجع تقرير فحص الذكاء الاصطناعي، وضوح الصور، وصحة الرقم المسجل قبل نشر المنتج للجمهور.',
                    'Check AI inspection scores and 4-angle photos before public catalog release.'
                  )}
                </p>
              </div>
            </div>

            {pendingProducts.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-xs border border-dashed border-slate-300 rounded-2xl">
                ✓ {t('جميع المنتجات مراجعة ومعتمدة! لا توجد طلبات معلقة.', 'All listings are reviewed and up to date!')}
              </div>
            ) : (
              <div className="space-y-4">
                {pendingProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-5 rounded-2xl border-2 border-amber-200 bg-amber-50/20 space-y-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={p.images[0]}
                          alt=""
                          className="w-20 h-20 rounded-2xl object-cover border border-slate-200"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                              {p.category}
                            </span>
                            <span className="text-xs text-slate-500 font-mono">ID: {p.id}</span>
                          </div>
                          <h4 className="font-black text-slate-900 text-base">
                            {language === 'ar' ? p.nameAr : p.name}
                          </h4>
                          <p className="text-xs text-slate-600">
                            {t('المالك:', 'Owner:')} {language === 'ar' ? p.ownerNameAr : p.ownerName} •{' '}
                            {t('السعر اليومي:', 'Daily Rate:')} {p.dailyPrice} ج.م •{' '}
                            {t('التأمين:', 'Deposit:')} {p.securityDeposit} ج.م
                          </p>
                        </div>
                      </div>

                      {p.aiInspection && (
                        <div className="bg-slate-900 text-white p-3 rounded-2xl text-xs space-y-1 text-end">
                          <div className="text-emerald-400 font-black text-lg">
                            AI Score: {p.aiInspection.conditionScore}/100
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {p.aiInspection.riskLevel} Risk • 4 Photos verified
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Photos grid */}
                    <div className="grid grid-cols-4 gap-2 pt-2 border-t border-amber-100">
                      {p.images.slice(0, 4).map((img, i) => (
                        <div key={i} className="aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="pt-2 flex items-center justify-end gap-3">
                      <button
                        onClick={() => rejectProduct(p.id)}
                        className="px-4 py-2 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-700 font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>{t('رفض الإعلان وطلب صور أوضح', 'Reject Listing')}</span>
                      </button>
                      <button
                        onClick={() => approveProduct(p.id)}
                        className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-md shadow-emerald-600/30 cursor-pointer flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{t('اعتماد المنتج ونشره فوراً في الكتالوج', 'Approve & Publish Item')}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: IDENTITY KYC QUEUE */}
      {activeTab === 'kyc' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div>
            <h3 className="font-black text-slate-900 text-base">
              {t('طلبات توثيق الرقم القومي والفحص الحيوي (KYC)', 'National ID & Biometric Verification Review')}
            </h3>
            <p className="text-xs text-slate-500">
              {t(
                'التحقق من صحة الرقم القومي المكون من 14 رقماً ومطابقة الصورة الشخصية لمنع أي احتيال.',
                'Review 14-digit Egyptian National IDs and biometric face scans.'
              )}
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black">
                  م
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">
                    محمد إبراهيم حسن (Mohamed Ibrahim)
                  </h4>
                  <div className="text-xs text-slate-500 font-mono">
                    الرقم القومي: 29508140102934 • محافظة الإسماعيلية
                  </div>
                </div>
              </div>

              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {t('فحص حيوي مطابق 99.4%', 'Biometric Match: 99.4%')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-slate-700">{t('صورة وجه البطاقة القومية:', 'Front ID Card:')}</span>
                <div className="aspect-[3/2] rounded-xl overflow-hidden bg-slate-200 border border-slate-300">
                  <img
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80"
                    alt="ID"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-slate-700">{t('صورة السيلفي الحيوية:', 'Live Biometric Selfie:')}</span>
                <div className="aspect-[3/2] rounded-xl overflow-hidden bg-slate-200 border border-slate-300">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                    alt="Selfie"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => alert('KYC verified successfully in prototype state.')}
                className="px-6 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                {t('اعتماد التوثيق ومنح الشارة الخضراء', 'Verify & Grant Verified Badge')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DISPUTES & DAMAGE CLAIMS */}
      {activeTab === 'disputes' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div>
            <h3 className="font-black text-slate-900 text-base">
              {t('إدارة وفض النزاعات والأضرار (Dispute Arbitration)', 'Dispute & Damage Arbitration Console')}
            </h3>
            <p className="text-xs text-slate-500">
              {t(
                'التحكيم بناءً على المقارنة الرقمية بين صور الاستلام الأولي وصور الاسترجاع وتحديد توزيع التأمين.',
                'Arbitrate damage claims using high-resolution before/after optical evidence.'
              )}
            </p>
          </div>

          <div className="space-y-4">
            {disputes.map((dispute) => (
              <div
                key={dispute.id}
                className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-slate-500 font-bold">{dispute.id}</span>
                      <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
                        {dispute.status.toUpperCase()}
                      </span>
                    </div>
                    <h4 className="font-black text-slate-900 text-base mt-1">
                      {dispute.productName}
                    </h4>
                    <p className="text-xs text-slate-600">
                      {t('المالك المدعي:', 'Claimant Owner:')} {dispute.claimantOwnerName} •{' '}
                      {t('المستأجر:', 'Renter:')} {dispute.renterName}
                    </p>
                  </div>

                  <div className="text-start sm:text-end">
                    <span className="text-xs text-slate-500 block">{t('قيمة التعويض المطالب بها:', 'Claim Amount:')}</span>
                    <span className="text-lg font-black text-rose-700">{dispute.claimAmount} ج.م</span>
                    <span className="text-[10px] text-slate-400 block">
                      {t('من إجمالي تأمين:', 'Out of deposit:')} {dispute.securityDepositTotal} ج.م
                    </span>
                  </div>
                </div>

                {/* Dispute description */}
                <div className="text-xs bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-800 block">{t('وصف الضرر المدعى به:', 'Damage Description:')}</span>
                  <p className="text-slate-600 leading-relaxed">{dispute.damageDescription}</p>
                </div>

                {/* Evidence photos compare */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-700 block mb-1">
                      {t('الصورة قبل التأجير (سليمة):', 'Before Rental:')}
                    </span>
                    <div className="aspect-video rounded-xl overflow-hidden bg-slate-200">
                      <img src={dispute.evidencePhotos.beforeRental} alt="" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 block mb-1">
                      {t('الصورة بعد الاسترجاع (الخدش أو الكسر):', 'After Return (Damage):')}
                    </span>
                    <div className="aspect-video rounded-xl overflow-hidden bg-slate-200 border-2 border-rose-500">
                      <img src={dispute.evidencePhotos.afterReturn} alt="" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>

                {/* Arbitration Decision Controls */}
                {dispute.status !== 'resolved' ? (
                  <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-bold text-slate-800">
                      {t('إصدار القرار الإداري:', 'Arbitration Ruling:')}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          resolveDispute(
                            dispute.id,
                            dispute.claimAmount,
                            dispute.securityDepositTotal - dispute.claimAmount,
                            'تم خصم قيمة التعويض من التأمين وتحويلها للمالك، واسترداد باقي التأمين للمستأجر.'
                          )
                        }
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition cursor-pointer"
                      >
                        {t('قبول المطالبة وخصم التعويض للمالك', 'Approve Claim (Compensate Owner)')}
                      </button>
                      <button
                        onClick={() =>
                          resolveDispute(
                            dispute.id,
                            0,
                            dispute.securityDepositTotal,
                            'ثبت أن الخدش طفيف وطبيعي ناتج عن الاستهلاك العادي، تم استرداد كامل التأمين للمستأجر.'
                          )
                        }
                        className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition cursor-pointer"
                      >
                        {t('رفض المطالبة واسترداد كامل التأمين للمستأجر', 'Reject Claim (Full Refund)')}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-bold">
                    ✓ {t('تم حسم النزاع رسمياً:', 'Resolved:')} {dispute.resolutionNotes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: RENTALS MONITOR */}
      {activeTab === 'rentals' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-black text-slate-900 text-base">
            {t('مراقبة كافة الحجوزات النشطة والشحنات في مصر', 'All Active Platform Rentals')}
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold text-[10px]">
                  <th className="py-2.5 px-3 text-start">ID</th>
                  <th className="py-2.5 px-3 text-start">{t('المنتج', 'Product')}</th>
                  <th className="py-2.5 px-3 text-start">{t('الفترة', 'Dates')}</th>
                  <th className="py-2.5 px-3 text-start">{t('المبلغ', 'Total')}</th>
                  <th className="py-2.5 px-3 text-start">{t('التأمين المحتجز', 'Deposit')}</th>
                  <th className="py-2.5 px-3 text-start">{t('الحالة الحالية', 'Status')}</th>
                  <th className="py-2.5 px-3 text-end">{t('الإجراء', 'Action')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">{b.id}</td>
                    <td className="py-3 px-3 font-bold text-slate-900">
                      {language === 'ar' ? b.product.nameAr : b.product.name}
                    </td>
                    <td className="py-3 px-3 font-mono">
                      {b.startDate} ➔ {b.endDate}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900">{b.totalAmount} ج.م</td>
                    <td className="py-3 px-3 text-emerald-700 font-bold">{b.securityDeposit} ج.م</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[10px] font-bold">
                        {b.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-end">
                      <button
                        onClick={() => {
                          setSelectedBookingId(b.id);
                          setActiveView('tracking');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 text-white font-bold hover:bg-emerald-600 transition"
                      >
                        {t('التتبع', 'Track')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
