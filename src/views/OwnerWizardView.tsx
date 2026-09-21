import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_LIST, EGYPT_GOVERNORATES } from '../mockData';
import { RentalProduct } from '../types';
import {
  Sparkles,
  Camera,
  CheckCircle2,
  AlertCircle,
  Upload,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Package,
  DollarSign,
  Tag,
  Check,
  Eye,
} from 'lucide-react';

export const OwnerWizardView: React.FC = () => {
  const { addProduct, setActiveView, language, currentUser, t } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  // Form State
  const [category, setCategory] = useState<string>('Home Appliances');
  const [productNameAr, setProductNameAr] = useState('');
  const [productNameEn, setProductNameEn] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [purchaseYear, setPurchaseYear] = useState<number>(2023);
  const [usageDuration, setUsageDuration] = useState('6 months');
  const [governorate, setGovernorate] = useState('Cairo');
  const [area, setArea] = useState('New Cairo');

  // Dynamic Specs by category
  // Fashion
  const [fashionSize, setFashionSize] = useState('M');
  const [fashionFabric, setFabric] = useState('Cotton / Silk');
  const [fashionCleaning, setFashionCleaning] = useState('Dry Cleaned');
  const [fashionAlterations, setFashionAlterations] = useState('None');

  // Electronics / Camera
  const [serialNumber, setSerialNumber] = useState('SN-8823-EG');
  const [batteryHealth, setBatteryHealth] = useState('95%');
  const [accessoriesIncluded, setAccessoriesIncluded] = useState('Original Charger, Carrying Case');

  // Furniture
  const [furnitureMaterial, setFurnitureMaterial] = useState('Natural Oak Wood');
  const [furnitureDimensions, setFurnitureDimensions] = useState('180 x 90 cm');
  const [assemblyRequired, setAssemblyRequired] = useState('No');

  // Tools
  const [powerSource, setPowerSource] = useState('Lithium Battery 18V');
  const [safetyGear, setSafetyGear] = useState('Safety Glasses Included');

  // Step 3: Photos
  const [photos, setPhotos] = useState<{
    front: string;
    back: string;
    serial: string;
    scratches: string;
  }>({
    front: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
    back: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    serial: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    scratches: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  });

  // Step 4: AI Analysis
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiAnalysisComplete, setAiAnalysisComplete] = useState(false);
  const [conditionScore, setConditionScore] = useState(94);
  const [aiDamageNotes, setAiDamageNotes] = useState('Minor surface scuffs on side panel; motor & heating coils in pristine working condition.');
  const [suggestedMinPrice, setSuggestedMinPrice] = useState(70);
  const [suggestedMaxPrice, setSuggestedMaxPrice] = useState(110);

  // Step 5: Pricing
  const [dailyPrice, setDailyPrice] = useState(85);
  const [weeklyPrice, setWeeklyPrice] = useState(480);
  const [securityDeposit, setSecurityDeposit] = useState(600);
  const [deliveryMethod, setDeliveryMethod] = useState('Platform Courier Pickup (RentBack Express)');

  // Step 6: Confirmation
  const [submittedProductId, setSubmittedProductId] = useState<string>('');

  const triggerAiAnalysis = () => {
    setIsAiAnalyzing(true);
    setTimeout(() => {
      setIsAiAnalyzing(false);
      setAiAnalysisComplete(true);
      setConditionScore(93);
      setSuggestedMinPrice(dailyPrice > 0 ? Math.round(dailyPrice * 0.9) : 75);
      setSuggestedMaxPrice(dailyPrice > 0 ? Math.round(dailyPrice * 1.25) : 120);
    }, 1200);
  };

  const handleFinalSubmit = () => {
    const newProduct: RentalProduct = {
      id: `item-${Date.now()}`,
      name: productNameEn || 'New Rental Listing',
      nameAr: productNameAr || 'منتج جديد للإيجار',
      brand: brand || 'Standard',
      model: model || 'Standard Model',
      category: category as any,
      categoryAr: CATEGORIES_LIST.find((c) => c.id === category)?.nameAr || 'عام',
      governorate: governorate as any,
      governorateAr: EGYPT_GOVERNORATES.find((g) => g.en === governorate)?.ar || 'القاهرة',
      area,
      areaAr: area,
      dailyPrice,
      weeklyPrice,
      securityDeposit,
      originalPrice: dailyPrice * 30 || 2500,
      isDeliveryAvailable: true,
      isPaymentProtected: true,
      images: [photos.front, photos.back, photos.serial, photos.scratches],
      condition: conditionScore >= 90 ? 'Like New' : 'Very Good',
      conditionAr: conditionScore >= 90 ? 'كالجديد تماماً' : 'جيد جداً',
      isAvailable: true,
      rating: 5.0,
      reviewsCount: 0,
      purchaseYear,
      usageDuration,
      usageDurationAr: 'استخدام خفيف',
      ownerId: currentUser.id,
      ownerName: currentUser.name,
      ownerNameAr: currentUser.nameAr,
      ownerRating: currentUser.rating,
      ownerCompletedRentals: currentUser.completedRentals,
      isIdentityVerified: true,
      isProductReviewed: false,
      approvalStatus: 'pending_review', // Requires admin approval!
      serialNumber,
      includedAccessories: accessoriesIncluded.split(',').map((s) => s.trim()),
      specifications: {
        'Brand': brand,
        'Model': model,
        'Serial': serialNumber,
      },
      specificationsAr: {
        'الماركة': brand,
        'الموديل': model,
        'الرقم المسجل': serialNumber,
      },
      aiInspection: {
        conditionScore,
        visibleDamage: aiDamageNotes,
        visibleDamageAr: 'فحص إلكتروني دقيق: خالي من العيوب الهيكلية، جاهز للتأجير الآمن.',
        completeness: '100% Complete with all cords & accessories',
        completenessAr: 'مكتمل بنسبة 100% مع كافة الملحقات',
        riskLevel: 'Low',
        riskLevelAr: 'منخفض المخاطر',
        recommendation: 'Approved for safe rental with standard 600 EGP deposit',
        recommendationAr: 'موصى بنشره للإيجار مع مبلغ تأمين قياسي',
      },
    };

    addProduct(newProduct);
    setSubmittedProductId(newProduct.id);
    setStep(6);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
          <Package className="w-4 h-4" />
          <span>{t('معالج إضافة وتوثيق منتج للتأجير', 'Owner Listing & Verification Wizard')}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">
          {t('أضف منتجك وحقق دخلاً إضافياً بأمان كامل', 'List Your Item & Earn Extra Income Safely')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          {t(
            'نظامنا يفحص المنتج بالذكاء الاصطناعي ويضمن استلامه واسترجاعه عبر مندوبين معتمدين مع حماية أموالك من الأضرار.',
            'Our platform scans your item condition with AI, assigns verified couriers, and protects your security deposit.'
          )}
        </p>

        {/* Step Numbers Bar */}
        <div className="pt-4 grid grid-cols-6 gap-2 text-center text-xs font-bold">
          {[
            { n: 1, label: t('القسم', 'Category') },
            { n: 2, label: t('البيانات', 'Details') },
            { n: 3, label: t('الكاميرا', 'Photos') },
            { n: 4, label: t('فحص AI', 'AI Check') },
            { n: 5, label: t('الأسعار', 'Pricing') },
            { n: 6, label: t('المراجعة', 'Submit') },
          ].map((s) => (
            <div
              key={s.n}
              className={`p-2 rounded-xl transition ${
                step === s.n
                  ? 'bg-emerald-600 text-white shadow-md'
                  : step > s.n
                  ? 'bg-slate-800 text-emerald-400'
                  : 'bg-slate-800/40 text-slate-500'
              }`}
            >
              <div className="text-[10px] text-slate-400">{s.n}</div>
              <div className="text-xs truncate">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* STEP CONTAINER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* STEP 1: CATEGORY SELECTION */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900">
                {t('الخطوة 1: اختر القسم الرئيسي للمنتج', 'Step 1: Select Product Category')}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {t('حدد نوع المنتج بدقة لتحديد الأسئلة ومعايير الفحص المطلوبة', 'Choose the category to tailor verification questions')}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {CATEGORIES_LIST.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`p-3.5 rounded-2xl border-2 flex flex-col items-center justify-between text-center transition cursor-pointer ${
                    category === cat.id
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img src={cat.image} alt="" className="w-12 h-12 rounded-xl object-cover mb-2" />
                  <span className="text-xs font-bold text-slate-900">
                    {language === 'ar' ? cat.nameAr : cat.nameEn}
                  </span>
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/30"
              >
                <span>{t('المتابعة لبيانات المنتج', 'Continue to Details')}</span>
                {language === 'ar' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: DYNAMIC CATEGORY QUESTIONS */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                <Tag className="w-4 h-4" />
                <span>{category}</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                {t('الخطوة 2: مواصفات وأسئلة الفحص المخصصة', 'Step 2: Category-Specific Product Details')}
              </h3>
              <p className="text-xs text-slate-500">
                {t('هذه الأسئلة تتغير ديناميكياً وفقاً للقسم الذي اخترته لضمان حماية المالك والمستأجر.', 'Questions adapt dynamically to your chosen category.')}
              </p>
            </div>

            {/* General Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">
                  {t('اسم المنتج بالعربية:', 'Product Name (Arabic):')}
                </label>
                <input
                  type="text"
                  value={productNameAr}
                  onChange={(e) => setProductNameAr(e.target.value)}
                  placeholder={t('مثال: مكواة بخار فيليبس بيرفكت كير', 'e.g. Philips PerfectCare Steam Iron')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">
                  {t('اسم المنتج بالإنجليزية:', 'Product Name (English):')}
                </label>
                <input
                  type="text"
                  value={productNameEn}
                  onChange={(e) => setProductNameEn(e.target.value)}
                  placeholder="e.g. Philips PerfectCare Steam Iron"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">{t('الماركة / البراند:', 'Brand:')}</label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g. Philips, Sony, Bosch, DeWalt..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">{t('الموديل والطراز:', 'Model:')}</label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="e.g. GC3920 / 70"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">{t('سنة الشراء الأصلية:', 'Purchase Year:')}</label>
                <input
                  type="number"
                  value={purchaseYear}
                  onChange={(e) => setPurchaseYear(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">{t('مدة الاستخدام الفعلية:', 'Usage Duration:')}</label>
                <input
                  type="text"
                  value={usageDuration}
                  onChange={(e) => setUsageDuration(e.target.value)}
                  placeholder="e.g. 6 months, light home use"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* DYNAMIC QUESTIONS BY CATEGORY */}
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-4">
              <h4 className="font-bold text-emerald-950 text-xs sm:text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>
                  {category === 'Fashion & Clothing'
                    ? t('أسئلة خاصة بالملابس والأزياء:', 'Fashion & Clothing Specifics:')
                    : category === 'Furniture'
                    ? t('أسئلة خاصة بالأثاث والمفروشات:', 'Furniture Specifics:')
                    : category === 'Tools & Equipment'
                    ? t('أسئلة خاصة بالعدد والأدوات:', 'Tools & Equipment Specifics:')
                    : t('أسئلة خاصة بالأجهزة والكاميرات والإلكترونيات:', 'Electronics & Appliance Specifics:')}
                </span>
              </h4>

              {/* FASHION DYNAMIC QUESTIONS */}
              {category === 'Fashion & Clothing' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">{t('المقاس (Size):', 'Size:')}</label>
                    <select
                      value={fashionSize}
                      onChange={(e) => setFashionSize(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2 font-semibold"
                    >
                      <option>XS</option>
                      <option>S</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                      <option>One Size</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">{t('نوع القماش (Fabric):', 'Fabric Type:')}</label>
                    <input
                      type="text"
                      value={fashionFabric}
                      onChange={(e) => setFabric(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">{t('حالة التنظيف (Cleaning):', 'Cleaning Condition:')}</label>
                    <select
                      value={fashionCleaning}
                      onChange={(e) => setFashionCleaning(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2 font-semibold"
                    >
                      <option>{t('مغسول دراي كلين احترافي ومعقم', 'Professional Dry Cleaned')}</option>
                      <option>{t('مغسول منزلياً بنظافة تامة', 'Home Laundered')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">{t('أي تعديلات أو تضييق (Alterations):', 'Alterations:')}</label>
                    <input
                      type="text"
                      value={fashionAlterations}
                      onChange={(e) => setFashionAlterations(e.target.value)}
                      placeholder="e.g. Shortened hem by 2cm, none"
                      className="w-full bg-white border border-slate-200 rounded-xl p-2 font-semibold"
                    />
                  </div>
                </div>
              )}

              {/* ELECTRONICS / CAMERAS / APPLIANCES DYNAMIC QUESTIONS */}
              {category !== 'Fashion & Clothing' && category !== 'Furniture' && category !== 'Tools & Equipment' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">{t('الرقم التسلسلي (Serial Number):', 'Serial Number:')}</label>
                    <input
                      type="text"
                      value={serialNumber}
                      onChange={(e) => setSerialNumber(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2 font-mono font-semibold"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">{t('كفاءة البطارية / الاستهلاك:', 'Battery / Power Health:')}</label>
                    <input
                      type="text"
                      value={batteryHealth}
                      onChange={(e) => setBatteryHealth(e.target.value)}
                      placeholder="e.g. 95%, Excellent"
                      className="w-full bg-white border border-slate-200 rounded-xl p-2 font-semibold"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-800 block mb-1">{t('الملحقات الأصلية المتوفرة:', 'Original Accessories Included:')}</label>
                    <input
                      type="text"
                      value={accessoriesIncluded}
                      onChange={(e) => setAccessoriesIncluded(e.target.value)}
                      placeholder="e.g. Original box, charging cord, battery, case"
                      className="w-full bg-white border border-slate-200 rounded-xl p-2 font-semibold"
                    />
                  </div>
                </div>
              )}

              {/* FURNITURE DYNAMIC QUESTIONS */}
              {category === 'Furniture' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">{t('خامة الخشب / القماش:', 'Material:')}</label>
                    <input
                      type="text"
                      value={furnitureMaterial}
                      onChange={(e) => setFurnitureMaterial(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">{t('الأبعاد (الطول × العرض × الارتفاع):', 'Dimensions:')}</label>
                    <input
                      type="text"
                      value={furnitureDimensions}
                      onChange={(e) => setFurnitureDimensions(e.target.value)}
                      placeholder="e.g. 180 x 90 x 75 cm"
                      className="w-full bg-white border border-slate-200 rounded-xl p-2 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">{t('هل يتطلب فك وتركيب؟', 'Assembly Required:')}</label>
                    <select
                      value={assemblyRequired}
                      onChange={(e) => setAssemblyRequired(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2 font-semibold"
                    >
                      <option>{t('لا، ينقل كقطعة واحدة', 'No (Single piece)')}</option>
                      <option>{t('نعم، يتطلب فك وتركيب بسيط', 'Yes (Simple assembly)')}</option>
                    </select>
                  </div>
                </div>
              )}

              {/* TOOLS DYNAMIC QUESTIONS */}
              {category === 'Tools & Equipment' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">{t('مصدر الطاقة:', 'Power Source:')}</label>
                    <select
                      value={powerSource}
                      onChange={(e) => setPowerSource(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2 font-semibold"
                    >
                      <option>بطارية ليثيوم قابلة للشحن (Cordless Battery)</option>
                      <option>سلك كهربائي مباشر 220 فولت (Corded)</option>
                      <option>يدوي بدون كهرباء (Manual)</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">{t('معدات الأمان المرفقة:', 'Safety Gear Included:')}</label>
                    <input
                      type="text"
                      value={safetyGear}
                      onChange={(e) => setSafetyGear(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2 font-semibold"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Location (Governorate & Area) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">{t('محافظة الاستلام والتسليم:', 'Governorate:')}</label>
                <select
                  value={governorate}
                  onChange={(e) => setGovernorate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {EGYPT_GOVERNORATES.map((g) => (
                    <option key={g.en} value={g.en}>
                      {language === 'ar' ? g.ar : g.en}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">{t('المنطقة أو الحي:', 'Area:')}</label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. Dokki, Nasr City, Smouha"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs"
              >
                {t('السابق', 'Back')}
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/30"
              >
                <span>{t('المتابعة للفحص البصري بالكاميرا', 'Continue to Camera Check')}</span>
                {language === 'ar' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CAMERA-BASED VERIFICATION */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900">
                {t('الخطوة 3: التوثيق بالكاميرا (4 صور إلزامية)', 'Step 3: Camera-Based Verification (4 Required Photos)')}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {t(
                  'التوثيق الدقيق يضمن حفظ حقك في حال حدوث أي ضرر أو نزاع أثناء فترة الإيجار.',
                  'Upload or capture 4 precise angles to establish before-rental baseline.'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Photo 1: Front View */}
              <div className="p-4 rounded-2xl border-2 border-dashed border-emerald-500/40 bg-slate-50 space-y-2 text-center">
                <div className="aspect-video rounded-xl overflow-hidden bg-slate-200">
                  <img src={photos.front} alt="Front view" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">1. {t('الواجهة الأمامية للمنتج', 'Front View')}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    ✓ {t('تم التحقق', 'Captured')}
                  </span>
                </div>
              </div>

              {/* Photo 2: Back View */}
              <div className="p-4 rounded-2xl border-2 border-dashed border-emerald-500/40 bg-slate-50 space-y-2 text-center">
                <div className="aspect-video rounded-xl overflow-hidden bg-slate-200">
                  <img src={photos.back} alt="Back view" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">2. {t('الواجهة الخلفية والمنافذ', 'Back View & Ports')}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    ✓ {t('تم التحقق', 'Captured')}
                  </span>
                </div>
              </div>

              {/* Photo 3: Serial Number / Label */}
              <div className="p-4 rounded-2xl border-2 border-dashed border-emerald-500/40 bg-slate-50 space-y-2 text-center">
                <div className="aspect-video rounded-xl overflow-hidden bg-slate-200">
                  <img src={photos.serial} alt="Serial number" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">3. {t('ملصق الرقم التسلسلي (Label)', 'Serial Number / Label')}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    ✓ {t('تم التحقق', 'Captured')}
                  </span>
                </div>
              </div>

              {/* Photo 4: Scratches / Wear */}
              <div className="p-4 rounded-2xl border-2 border-dashed border-emerald-500/40 bg-slate-50 space-y-2 text-center">
                <div className="aspect-video rounded-xl overflow-hidden bg-slate-200">
                  <img src={photos.scratches} alt="Scratches" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">4. {t('أي خدوش أو علامات سابقة', 'Scratches or Wear')}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    ✓ {t('تم التحقق', 'Captured')}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs"
              >
                {t('السابق', 'Back')}
              </button>
              <button
                onClick={() => {
                  setStep(4);
                  triggerAiAnalysis();
                }}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/30"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t('تشغيل الفحص الذكي بالذكاء الاصطناعي', 'Run AI Inspection')}</span>
                {language === 'ar' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: AI INSPECTION SIMULATION */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>{t('الخطوة 4: تقرير الفحص الذكي (AI Inspection Simulation)', 'Step 4: AI Inspection Simulation')}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {t(
                  'يقوم نموذج الرؤية بتحليل الصور للكشف عن أي عيوب هيكلية والتوصية بدرجة الجاهزية والنطاق السعري المناسب.',
                  'Visual AI analysis evaluates defects, scores readiness, and recommends daily pricing.'
                )}
              </p>
            </div>

            {isAiAnalyzing ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin mx-auto"></div>
                <h4 className="font-bold text-slate-800 text-sm">
                  {t('جاري تحليل الصور الأربعة وقياس كفاءة المنتج...', 'Analyzing photos and verifying optical condition...')}
                </h4>
                <p className="text-xs text-slate-400">
                  {t('فحص الخدوش • مطابقة الرقم التسلسلي • تقدير القيمة السوقية في مصر', 'Scratch detection • Serial match • Egyptian market rate')}
                </p>
              </div>
            ) : (
              <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-6 animate-in zoom-in-95">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
                      {t('نتيجة الفحص الآلي المعتمد', 'AI Analysis Result')}
                    </span>
                    <h4 className="text-xl font-black text-white mt-0.5">
                      {t('حالة المنتج: ممتاز وكالجديد تماماً', 'Condition: Excellent / Like New')}
                    </h4>
                  </div>

                  <div className="text-start sm:text-end bg-slate-800/80 px-4 py-2.5 rounded-2xl border border-slate-700">
                    <div className="text-2xl font-black text-emerald-400">{conditionScore}/100</div>
                    <div className="text-[10px] text-slate-400 font-semibold">{t('درجة الجاهزية الموصى بها', 'Condition Score')}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
                    <span className="text-slate-400 font-bold block">{t('تحليل العيوب المرئية:', 'Defect Analysis:')}</span>
                    <p className="text-slate-200 leading-relaxed">
                      {t(
                        'لا توجد شروخ أو كسور. لوحظت فقط خدوش ميكرو دقيقة جداً لا تؤثر على الأداء الوظيفي أو السلامة.',
                        'No structural fractures. Micro surface scuffs detected on non-functional areas only.'
                      )}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
                    <span className="text-slate-400 font-bold block">{t('نطاق السعر اليومي المقترح في مصر:', 'Recommended Daily Rate:')}</span>
                    <div className="text-lg font-black text-emerald-400">
                      {suggestedMinPrice} - {suggestedMaxPrice} {t('ج.م / يوم', 'EGP / day')}
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      {t('محسوب بناءً على منتجات مماثلة في نفس المحافظة', 'Benchmarked against similar rentals in this area')}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>
                    {t(
                      'تم اعتماد صور الفحص كسجل مرجعي رسمي في حال حدوث أي نزاع مستقبلي.',
                      'Inspection photos are safely logged as the official baseline for dispute arbitration.'
                    )}
                  </span>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setStep(3)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs"
              >
                {t('السابق', 'Back')}
              </button>
              <button
                disabled={isAiAnalyzing}
                onClick={() => setStep(5)}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/30"
              >
                <span>{t('المتابعة لتحديد الأسعار والتأمين', 'Continue to Pricing')}</span>
                {language === 'ar' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: PRICING & DEPOSIT */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900">
                {t('الخطوة 5: تحديد أسعار الإيجار ومبلغ التأمين', 'Step 5: Pricing & Security Deposit')}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {t(
                  'حدد السعر اليومي والأسبوعي ومبلغ التأمين المسترد لحماية منتجك.',
                  'Set your daily rate, weekly discount, and refundable damage deposit.'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  {t('سعر الإيجار اليومي (EGP):', 'Daily Price (EGP):')}
                </label>
                <input
                  type="number"
                  value={dailyPrice}
                  onChange={(e) => setDailyPrice(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-base font-black text-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">
                  {t('سعر الأسبوع (خصم تشجيعي):', 'Weekly Price (EGP):')}
                </label>
                <input
                  type="number"
                  value={weeklyPrice}
                  onChange={(e) => setWeeklyPrice(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-base font-black text-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  {t('مبلغ التأمين المسترد (Deposit):', 'Security Deposit (EGP):')}
                </label>
                <input
                  type="number"
                  value={securityDeposit}
                  onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-base font-black text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Delivery method selection */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="text-xs font-bold text-slate-800 block">
                {t('طريقة الاستلام والتوصيل المعتمدة:', 'Managed Delivery Option:')}
              </label>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-emerald-500 text-xs font-bold text-emerald-950">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <div>{t('استلام وتوصيل من الباب للباب عبر رنت باك إكسبريس / بوسطة', 'Door-to-door courier managed by RentBack Express')}</div>
                  <div className="text-[11px] font-normal text-slate-500">
                    {t('المندوب يأتي لمنزلك لاستلام المنتج وتغليفه وفحصه وتسليمه للمستأجر بأمان', 'Courier collects from your doorstep, verifies seal, and delivers')}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setStep(4)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs"
              >
                {t('السابق', 'Back')}
              </button>
              <button
                onClick={handleFinalSubmit}
                className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-xl shadow-emerald-600/30 active:scale-98"
              >
                <Check className="w-5 h-5" />
                <span>{t('إرسال المنتج للمراجعة والاعتماد (Submit)', 'Submit Listing for Review')}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: SUBMITTED CONFIRMATION */}
        {step === 6 && (
          <div className="text-center py-8 space-y-6 animate-in zoom-in-95">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h3 className="text-2xl font-black text-slate-900">
                {t('تم إرسال المنتج للمراجعة والاعتماد بنجاح!', 'Product Submitted for Verification!')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t(
                  'شكراً لك! يقوم فريق إدارة منصة رنت باك حالياً بالتحقق من جودة الصور ومطابقة المواصفات مع الذكاء الاصطناعي قبل نشر المنتج في الكتالوج العام.',
                  'Your product has been submitted for verification. Our team will review the listing before it goes live.'
                )}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 max-w-md mx-auto text-start space-y-1">
              <div className="flex justify-between font-bold text-slate-900">
                <span>{t('معرف المنتج:', 'Item ID:')}</span>
                <span className="font-mono">{submittedProductId}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('حالة الإدراج:', 'Review Status:')}</span>
                <span className="text-amber-600 font-bold">{t('قيد مراجعة المشرف (Pending)', 'Pending Admin Review')}</span>
              </div>
              <div className="text-[11px] text-slate-400 pt-1">
                {t('💡 يمكنك التبديل إلى دور "المشرف (Admin)" من الشريط العلوي لاعتماد هذا المنتج فوراً.', '💡 Tip: Switch to Admin role in top bar to approve this item immediately.')}
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setActiveView('owner_dashboard')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                {t('الانتقال إلى لوحة تحكم المالك', 'Go to Owner Dashboard')}
              </button>
              <button
                onClick={() => setActiveView('admin_dashboard')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-600/20"
              >
                {t('فتح لوحة المشرف للاعتماد الآن', 'Open Admin Console to Approve')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
