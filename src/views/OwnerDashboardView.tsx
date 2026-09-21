import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Package,
  DollarSign,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight,
  Plus,
  ShieldCheck,
  Smartphone,
  Building,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';

export const OwnerDashboardView: React.FC = () => {
  const {
    language,
    currentUser,
    products,
    bookings,
    setActiveView,
    t,
  } = useApp();

  const [payoutModalOpen, setPayoutModalOpen] = useState(false);
  const [payoutMethod, setPayoutMethod] = useState<'instapay' | 'vodafone' | 'bank'>('instapay');
  const [payoutAmount, setPayoutAmount] = useState('1850');
  const [payoutAccount, setPayoutAccount] = useState('ahmed.gamal@instapay');
  const [payoutStatusMessage, setPayoutStatusMessage] = useState<string | null>(null);

  // Filter products by owner or show all in prototype demo
  const ownerProducts = products.filter(
    (p) => p.ownerId === currentUser.id || p.ownerName === currentUser.name || p.ownerNameAr === currentUser.nameAr
  );

  const totalEarnings = 4250;
  const availableForPayout = 1850;
  const completedRentals = 12;

  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();
    setPayoutStatusMessage(
      language === 'ar'
        ? 'تم تقديم طلب سحب الأرباح بنجاح! سيتم التحويل خلال 24 ساعة عمل عبر شبكة إنستاباي / المحفظة الإلكترونية.'
        : 'Payout request submitted successfully! Funds will be credited within 24 business hours.'
    );
    setTimeout(() => {
      setPayoutModalOpen(false);
      setPayoutStatusMessage(null);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner & Stats */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <Package className="w-4 h-4" />
              <span>{t('لوحة تحكم المالك وشريك التأجير', 'Owner & Host Dashboard')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black mt-1">
              {t('مرحباً بك،', 'Welcome back,')}{' '}
              {language === 'ar' ? currentUser.nameAr : currentUser.name}
            </h1>
          </div>

          <button
            onClick={() => setActiveView('list_item')}
            className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-600/30 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>{t('إضافة منتج جديد للتأجير', 'List New Product')}</span>
          </button>
        </div>

        {/* 4 Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 block uppercase">
              {t('إجمالي الأرباح المحققة', 'Total Earnings')}
            </span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400">{totalEarnings} ج.م</div>
            <span className="text-[10px] text-slate-400">
              {t('من 12 عملية تأجير مكتملة', 'From 12 completed rentals')}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 block uppercase">
              {t('الرصيد المتاح للسحب الآن', 'Available for Payout')}
            </span>
            <div className="text-xl sm:text-2xl font-black text-white">{availableForPayout} ج.م</div>
            <button
              onClick={() => setPayoutModalOpen(true)}
              className="text-[11px] font-bold text-emerald-400 hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>{t('طلب سحب الأرباح', 'Request Payout')}</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 block uppercase">
              {t('المنتجات المعروضة للإيجار', 'Listed Products')}
            </span>
            <div className="text-xl sm:text-2xl font-black text-white">{ownerProducts.length}</div>
            <span className="text-[10px] text-slate-400">
              {ownerProducts.filter((p) => p.approvalStatus === 'approved').length} {t('نشط ومعتمد', 'active')}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 block uppercase">
              {t('تقييم المالك ونسبة الرضا', 'Host Rating')}
            </span>
            <div className="text-xl sm:text-2xl font-black text-amber-400">4.95 / 5.0</div>
            <span className="text-[10px] text-slate-400">
              {t('صفر نزاعات أضرار غير محلولة', 'Zero unresolved disputes')}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content: Listed Items & Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Listed Products (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-black text-slate-900 text-base">
                {t('منتجاتك المعروضة للتأجير وسجل الفحص', 'Your Listed Products')}
              </h3>
              <p className="text-xs text-slate-500">
                {t('تتبع حالة المراجعة والموافقة لكل منتج والتقارير الذكية', 'Monitor approval status and AI condition scores')}
              </p>
            </div>
            <button
              onClick={() => setActiveView('list_item')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>{t('إضافة منتج', 'Add Item')}</span>
            </button>
          </div>

          <div className="space-y-4">
            {ownerProducts.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-500/50 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={p.images[0]}
                    alt=""
                    className="w-16 h-16 rounded-xl object-cover border border-slate-100"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {language === 'ar' ? p.categoryAr : p.category}
                      </span>

                      {/* Approval badge */}
                      {p.approvalStatus === 'approved' ? (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {t('معتمد ومنشور', 'Approved')}
                        </span>
                      ) : p.approvalStatus === 'pending_review' ? (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {t('قيد مراجعة المشرف', 'Pending Review')}
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                          {t('مرفوض', 'Rejected')}
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 mt-1">
                      {language === 'ar' ? p.nameAr : p.name}
                    </h4>

                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      <span>{p.dailyPrice} {t('ج.م / يوم', 'EGP/day')}</span>
                      <span>•</span>
                      <span>{t('تأمين:', 'Deposit:')} {p.securityDeposit} ج.م</span>
                      {p.aiInspection && (
                        <>
                          <span>•</span>
                          <span className="text-emerald-700 font-semibold">
                            AI: {p.aiInspection.conditionScore}/100
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => setActiveView('product_details')}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition"
                  >
                    {t('معاينة الإعلان', 'Preview')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payout & Protection Rules (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Payout Summary Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-slate-900 text-sm">
                {t('محفظة المستحقات والسحب', 'Payouts Wallet')}
              </h3>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                InstaPay / E-Wallet
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>{t('الأرباح الجاهزة للصرف:', 'Ready to Cash Out:')}</span>
                <span className="font-black text-emerald-700 text-base">{availableForPayout} ج.م</span>
              </div>
              <div className="flex justify-between">
                <span>{t('أرباح قيد الاستخدام (مع المستأجرين):', 'In-transit Rentals:')}</span>
                <span className="font-bold text-slate-900">950 ج.م</span>
              </div>
            </div>

            <button
              onClick={() => setPayoutModalOpen(true)}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-lg shadow-emerald-600/20 cursor-pointer"
            >
              {t('طلب سحب الأرباح الآن (Payout)', 'Request Payout')}
            </button>

            {/* Payout History */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 block uppercase">
                {t('سجل التحويلات السابقة:', 'Recent Payouts:')}
              </span>

              <div className="p-2.5 rounded-xl bg-slate-50 text-xs flex justify-between items-center">
                <div>
                  <div className="font-bold text-slate-800">1,200 ج.م (InstaPay)</div>
                  <div className="text-[10px] text-slate-400">2026-02-28 • RH-PAY-1082</div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  {t('تم التحويل (Paid)', 'Paid')}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 text-xs flex justify-between items-center">
                <div>
                  <div className="font-bold text-slate-800">800 ج.م (Vodafone Cash)</div>
                  <div className="text-[10px] text-slate-400">2026-02-14 • RH-PAY-1049</div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  {t('تم التحويل (Paid)', 'Paid')}
                </span>
              </div>
            </div>
          </div>

          {/* Owner Protection Tips */}
          <div className="bg-emerald-50/70 rounded-3xl p-5 border border-emerald-100 space-y-3 text-xs text-emerald-950">
            <h4 className="font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{t('كيف تحميك منصة رنت باك؟', 'How RentBack Protects Hosts')}</span>
            </h4>
            <p className="leading-relaxed text-[11px] text-emerald-900">
              {t(
                '1. لا تخرج الشحنة إلا بعد تحصيل مبلغ الإيجار ومبلغ التأمين كاملاً من المستأجر.\n2. يتم مطابقة صور الاسترجاع مع صور الفحص الأولية بالذكاء الاصطناعي.\n3. في حال وجود أي خدش أو تلفيات يتم تعويضك من التأمين مباشرة.',
                '1. Goods are only dispatched after rental and full damage deposit are secured.\n2. Return photos are automatically compared with initial AI baseline.\n3. Damage claims are settled from the deposit.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Payout Request Modal */}
      {payoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-slate-900 text-base">
                {t('طلب سحب أرباح التأجير', 'Request Owner Payout')}
              </h3>
              <button
                onClick={() => setPayoutModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            {payoutStatusMessage ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold text-center leading-relaxed">
                ✓ {payoutStatusMessage}
              </div>
            ) : (
              <form onSubmit={handleRequestPayout} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    {t('المبلغ المراد سحبه (ج.م):', 'Withdrawal Amount (EGP):')}
                  </label>
                  <input
                    type="number"
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(e.target.value)}
                    max={availableForPayout}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-black text-base text-slate-900"
                  />
                  <span className="text-[10px] text-slate-400">
                    {t('الحد الأقصى المتاح حالياً:', 'Max available:')} {availableForPayout} ج.م
                  </span>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    {t('طريقة الاستلام والتحويل:', 'Payout Channel:')}
                  </label>
                  <select
                    value={payoutMethod}
                    onChange={(e) => setPayoutMethod(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option value="instapay">شبكة المدفوعات اللحظية (إنستاباي - InstaPay)</option>
                    <option value="vodafone">محفظة فودافون كاش (Vodafone Cash)</option>
                    <option value="bank">حساب بنكي مصري (IBAN)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    {t('عنوان الدفع / رقم الهاتف / الآيبان:', 'Account Identifier / Phone / IPA:')}
                  </label>
                  <input
                    type="text"
                    value={payoutAccount}
                    onChange={(e) => setPayoutAccount(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono font-semibold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm transition shadow-lg shadow-emerald-600/30 cursor-pointer"
                >
                  {t('تأكيد وإرسال طلب التحويل', 'Confirm Payout Request')}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
