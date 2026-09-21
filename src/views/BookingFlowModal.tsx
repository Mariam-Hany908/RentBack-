import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import {
  X,
  Calendar,
  ShieldCheck,
  CreditCard,
  Smartphone,
  CheckCircle2,
  FileText,
  AlertCircle,
  Clock,
  Truck,
  DollarSign,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Lock,
} from 'lucide-react';

export const BookingFlowModal: React.FC = () => {
  const {
    bookingModalOpen,
    setBookingModalOpen,
    selectedProductId,
    products,
    createBooking,
    navigateToTracking,
    language,
    currentUser,
    t,
  } = useApp();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [startDate, setStartDate] = useState('2026-03-12');
  const [endDate, setEndDate] = useState('2026-03-15');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'mobile_wallet'>('credit_card');

  // Credit card fields (mock)
  const [cardNumber, setCardNumber] = useState('4111 •••• •••• 9012');
  const [cardHolder, setCardHolder] = useState('Karim Adel');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('842');

  // Mobile wallet fields (mock)
  const [walletProvider, setWalletProvider] = useState<'vodafone' | 'instapay' | 'orange' | 'etisalat'>('vodafone');
  const [walletPhone, setWalletPhone] = useState('010 1234 5678');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdBookingId, setCreatedBookingId] = useState<string | null>(null);

  // Auto calculate days count
  const daysCount = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [startDate, endDate]);

  // Pricing calculations
  const rentalCost = daysCount * product.dailyPrice;
  const deliveryFee = 50;
  const securityDeposit = product.securityDeposit;
  const platformFee = 20;
  const totalAmount = rentalCost + deliveryFee + securityDeposit + platformFee;

  if (!bookingModalOpen) return null;

  const handlePaySecurely = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const booking = createBooking({
        productId: product.id,
        product,
        startDate,
        endDate,
        daysCount,
        dailyRate: product.dailyPrice,
        rentalCost,
        deliveryFee,
        securityDeposit,
        platformFee,
        totalAmount,
        paymentMethod,
      });

      setCreatedBookingId(booking.id);
      setStep(4); // Celebration & Payment Secured state

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // graceful fallback
      }
    }, 1500);
  };

  const handleClose = () => {
    setBookingModalOpen(false);
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center font-bold">
              {step === 1 ? '1' : step === 2 ? '2' : step === 3 ? '3' : '✓'}
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">
                {step === 1
                  ? t('الخطوة 1: تحديد مدة الإيجار والأسعار', 'Step 1: Rental Dates & Pricing')
                  : step === 2
                  ? t('الخطوة 2: اتفاقية وشروط التأجير', 'Step 2: Rental Terms & Agreement')
                  : step === 3
                  ? t('الخطوة 3: الدفع الآمن (Mock Checkout)', 'Step 3: Secure Payment Checkout')
                  : t('تم تأمين الدفع بنجاح!', 'Payment Secured Successfully!')}
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'ar' ? product.nameAr : product.name}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress indicator */}
        <div className="w-full bg-slate-100 h-1.5 flex">
          <div
            className="bg-emerald-500 h-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {/* STEP 1: DATES & AUTO CALCULATION */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-900 leading-relaxed">
                  {t(
                    'حدد تاريخ بدء الإيجار وتاريخ الانتهاء. سيتم احتساب التكلفة الإجمالية ومبلغ التأمين المسترد ورسوم الشحن المدارة تلقائياً وبكل شفافية.',
                    'Select rental dates. Total cost, refundable security deposit, and managed delivery fees are calculated automatically.'
                  )}
                </p>
              </div>

              {/* Date pickers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    {t('تاريخ بدء الإيجار (الاستلام):', 'Rental Start Date:')}
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    {t('تاريخ انتهاء الإيجار (الاسترجاع):', 'Rental End Date:')}
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Live Calculation Table */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">
                  {t('تفاصيل واحتساب التكلفة الإجمالية:', 'Cost Calculation Breakdown:')}
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>
                      {t('قيمة الإيجار الأساسية:', 'Rental Rate:')}{' '}
                      <strong className="text-slate-900">
                        {daysCount} {t('أيام', 'days')} × {product.dailyPrice} ج.م
                      </strong>
                    </span>
                    <span className="font-bold text-slate-900">{rentalCost} ج.م</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>{t('رسوم الشحن والتوصيل والاسترجاع (بوسطة):', 'Door-to-door Delivery & Return:')}</span>
                    <span className="font-bold text-slate-900">{deliveryFee} ج.م</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span className="flex items-center gap-1">
                      <span>{t('مبلغ التأمين المسترد (Security Deposit):', 'Refundable Security Deposit:')}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                        {t('يسترد بالكامل', '100% Refundable')}
                      </span>
                    </span>
                    <span className="font-bold text-slate-900">{securityDeposit} ج.م</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>{t('رسوم خدمة وضمان المنصة:', 'Platform Protection Fee:')}</span>
                    <span className="font-bold text-slate-900">{platformFee} ج.م</span>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex justify-between text-sm sm:text-base font-black text-slate-950">
                    <span>{t('المبلغ الإجمالي للدفع والتأمين:', 'Total Due at Checkout:')}</span>
                    <span className="text-emerald-700 text-lg sm:text-xl font-black">{totalAmount} ج.م</span>
                  </div>
                </div>
              </div>

              {/* Next Step CTA */}
              <button
                onClick={() => setStep(2)}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>{t('متابعة إلى اتفاقية وشروط التأجير', 'Continue to Rental Agreement')}</span>
                {language === 'ar' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          )}

          {/* STEP 2: RENTAL AGREEMENT */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-slate-900 font-black text-sm sm:text-base">
                <FileText className="w-5 h-5 text-emerald-600" />
                <span>{t('اتفاقية عقد التأجير الإلكتروني والشروط', 'Electronic Rental Agreement Terms')}</span>
              </div>

              {/* Scrollable Terms Box */}
              <div className="h-64 overflow-y-auto p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-3 leading-relaxed">
                <div>
                  <h5 className="font-bold text-slate-900">1. مدة التأجير والاستلام (Rental Period):</h5>
                  <p>
                    تبدأ فترة التأجير الرسمية من تاريخ استلام المنتج من مندوب الشحن المعتمد ({startDate}) وحتى تسليمه للمندوب في تاريخ الاسترجاع ({endDate}).
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-slate-900">2. فحص الحالة والملحقات (Product Condition):</h5>
                  <p>
                    يقر المستأجر باستلام المنتج مطابقاً لتقرير الفحص المعتمد قبل التأجير، ويلتزم بإعادته بنفس الحالة التشغيلية مع جميع الملحقات المرفقة.
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-slate-900">3. مسؤولية الأضرار والتلفيات (Damage Responsibility):</h5>
                  <p>
                    يتحمل المستأجر تكاليف إصلاح أي تلفيات ناتجة عن سوء الاستخدام أو الإهمال أو فقدان أي ملحق. يتم خصم قيمة الضرر من مبلغ التأمين المسترد بناءً على تقرير الفحص ومراجعة إدارة المنصة.
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-slate-900">4. سياسة التأخير في الإرجاع (Late Return Policy):</h5>
                  <p>
                    في حال التأخر عن تسليم المنتج للمندوب في الموعد المحدد، يتم احتساب رسوم اليوم التأخيري بسعر اليوم الكامل بالإضافة إلى غرامة إشغال 50 ج.م/يوم.
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-slate-900">5. سياسة الإلغاء والاسترداد (Cancellation Policy):</h5>
                  <p>
                    يمكن إلغاء الحجز واسترداد كامل المبلغ قبل إرسال المنتج مع المندوب. في حال خروج الشحنة يتم خصم تكلفة الشحن فقط.
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-slate-900">6. مبلغ التأمين المسترد (Security Deposit):</h5>
                  <p>
                    يتم حجز مبلغ التأمين ({securityDeposit} ج.م) بأمان في المنصة، ويتم الإفراج عنه لحساب المستأجر تلقائياً فور تأكيد استلام وفحص المنتج بدون تلفيات.
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-slate-900">7. قواعد الشحن والتسليم (Delivery Rules):</h5>
                  <p>
                    التسليم والاستلام يتم حصرياً عبر كباتن الشحن المعتمدين لدى رنت باك. يمنع منعا باتا تسليم المنتج لطرف ثالث غير مسجل في الحجز.
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-slate-900">8. سياسة فض النزاعات (Dispute Policy):</h5>
                  <p>
                    تعتبر قرارات لجنة التحكيم في المنصة ملزمة للطرفين استناداً إلى سجل الصور الرقمي والفيديو قبل وبعد الإيجار.
                  </p>
                </div>
              </div>

              {/* Mandatory Agreement Checkbox */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600 mt-0.5 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-amber-950 leading-relaxed">
                    {t(
                      'أوافق على جميع شروط اتفاقية التأجير وسياسة حماية الأضرار واسترداد التأمين الموضحة أعلاه.',
                      'I agree to the rental terms, damage liability, and platform deposit policy.'
                    )}
                  </span>
                </label>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 rounded-2xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 transition"
                >
                  {t('رجوع للتواريخ', 'Back')}
                </button>
                <button
                  disabled={!agreedToTerms}
                  onClick={() => setStep(3)}
                  className={`w-2/3 py-3 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 ${
                    agreedToTerms
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/30 cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>{t('الموافقة ومتابعة الدفع', 'Accept & Proceed to Payment')}</span>
                  {language === 'ar' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: MOCK CHECKOUT */}
          {step === 3 && (
            <div className="space-y-5">
              {/* Order Summary Snapshot */}
              <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 font-semibold block">
                    {t('إجمالي المبلغ المطلوب دفعه وتأمينه:', 'Total amount to secure:')}
                  </span>
                  <div className="text-2xl font-black text-emerald-400">{totalAmount} ج.م</div>
                </div>
                <div className="text-end text-xs text-slate-300">
                  <span>{daysCount} {t('أيام إيجار', 'days')}</span>
                  <span className="block text-[11px] text-slate-400">
                    {t('يشمل 500 ج.م تأمين مسترد', `Includes ${securityDeposit} EGP deposit`)}
                  </span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 block">
                  {t('اختر طريقة الدفع (محاكاة دفع آمن):', 'Select Mock Payment Method:')}
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit_card')}
                    className={`p-3.5 rounded-2xl border-2 flex items-center gap-3 transition cursor-pointer text-start ${
                      paymentMethod === 'credit_card'
                        ? 'border-emerald-600 bg-emerald-50/50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <CreditCard className={`w-5 h-5 ${paymentMethod === 'credit_card' ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {t('بطاقة بنكية (فيزا / ماستركارد)', 'Credit / Debit Card')}
                      </div>
                      <div className="text-[10px] text-slate-500">Visa / Mastercard / Meeza</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mobile_wallet')}
                    className={`p-3.5 rounded-2xl border-2 flex items-center gap-3 transition cursor-pointer text-start ${
                      paymentMethod === 'mobile_wallet'
                        ? 'border-emerald-600 bg-emerald-50/50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Smartphone className={`w-5 h-5 ${paymentMethod === 'mobile_wallet' ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {t('محفظة إلكترونية / إنستاباي', 'Mobile Wallet / InstaPay')}
                      </div>
                      <div className="text-[10px] text-slate-500">Vodafone, InstaPay, etc.</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Method Forms */}
              {paymentMethod === 'credit_card' ? (
                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">{t('رقم البطاقة (تجريبي)', 'Card Number (Mock)')}</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-mono text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">{t('تاريخ الصلاحية', 'Expiry Date')}</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-mono text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">{t('رمز الأمان CVV', 'CVV')}</label>
                      <input
                        type="text"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-mono text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">{t('مزود المحفظة الإلكترونية', 'Wallet Provider')}</label>
                    <select
                      value={walletProvider}
                      onChange={(e) => setWalletProvider(e.target.value as any)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="vodafone">فودافون كاش (Vodafone Cash)</option>
                      <option value="instapay">إنستاباي مصر (InstaPay Egypt)</option>
                      <option value="orange">أورنج كاش (Orange Cash)</option>
                      <option value="etisalat">إي آند كاش (e& Cash)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">{t('رقم الهاتف المسجل بالمحفظة', 'Wallet Phone Number')}</label>
                    <input
                      type="text"
                      value={walletPhone}
                      onChange={(e) => setWalletPhone(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 font-mono text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              )}

              {/* Pay Button */}
              <button
                disabled={isProcessing}
                onClick={handlePaySecurely}
                className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base transition shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-75"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>{t('جاري الاتصال بالنظام وتأمين الدفع...', 'Securing payment with platform protection...')}</span>
                  </div>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>
                      {t(`دفع وتأمين ${totalAmount} ج.م بأمان`, `Pay Securely (${totalAmount} EGP)`)}
                    </span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* STEP 4: PAYMENT SECURED CONFIRMATION */}
          {step === 4 && (
            <div className="text-center py-6 space-y-6 animate-in zoom-in-95">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900">
                  {t('تم تأمين الدفع بنجاح!', 'Payment Secured')}
                </h3>
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  {t('رقم الحجز:', 'Booking ID:')} {createdBookingId}
                </div>
              </div>

              {/* Escrow Disclaimer mandated in Prompt */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 max-w-md mx-auto leading-relaxed text-start">
                <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t('آلية حماية التأجير للمنصة', 'Rental Protection Process')}</span>
                </div>
                <p>
                  {t(
                    'تم حجز المبلغ ({totalAmount} ج.م) بأمان وفقاً لآلية حماية التأجير الخاصة بالمنصة، ولن يتم الإفراج عن مستحقات المالك إلا وفقاً لشروط التأجير وبعد استلامك للمنتج والتأكد من مطابقته.',
                    'Your payment is securely held according to the platform\'s rental protection process and will be released according to the rental terms.'
                  )}
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setBookingModalOpen(false);
                    if (createdBookingId) navigateToTracking(createdBookingId);
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Truck className="w-4 h-4" />
                  <span>{t('الانتقال إلى شاشة تتبع الحجز والشحن ←', 'Go to Rental Tracking Timeline →')}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
