import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES_LIST, EGYPT_GOVERNORATES } from '../mockData';
import {
  Filter,
  SlidersHorizontal,
  X,
  RotateCcw,
  Sparkles,
  MapPin,
  Star,
  ShieldCheck,
  ArrowUpDown,
  Search,
} from 'lucide-react';

export const CategoryListingView: React.FC = () => {
  const {
    language,
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    searchGovernorate,
    setSearchGovernorate,
    t,
  } = useApp();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedGovernorate, setSelectedGovernorate] = useState(searchGovernorate || '');
  const [selectedArea, setSelectedArea] = useState('');
  const [priceRange, setPriceRange] = useState<number>(1000);
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedCondition, setSelectedCondition] = useState<string>('');
  const [availableOnly, setAvailableOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'price_asc' | 'price_desc' | 'rating' | 'newest'>('recommended');

  const currentCategoryData = CATEGORIES_LIST.find((c) => c.id === selectedCategory);

  // Filter logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Must be approved by admin to appear in public catalog
      if (p.approvalStatus !== 'approved') return false;

      // Category filter
      if (selectedCategory && p.category !== selectedCategory) return false;

      // Text query search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query) || p.nameAr.includes(query);
        const matchBrand = p.brand.toLowerCase().includes(query);
        const matchCat = p.category.toLowerCase().includes(query) || p.categoryAr.includes(query);
        if (!matchName && !matchBrand && !matchCat) return false;
      }

      // Governorate
      if (selectedGovernorate && p.governorate.toLowerCase() !== selectedGovernorate.toLowerCase()) {
        return false;
      }

      // Area
      if (selectedArea.trim()) {
        const areaMatch =
          p.area.toLowerCase().includes(selectedArea.toLowerCase()) ||
          p.areaAr.includes(selectedArea);
        if (!areaMatch) return false;
      }

      // Max price
      if (p.dailyPrice > priceRange) return false;

      // Rating
      if (minRating > 0 && p.rating < minRating) return false;

      // Condition
      if (selectedCondition && p.condition !== selectedCondition) return false;

      // Available only
      if (availableOnly && !p.isAvailable) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.dailyPrice - b.dailyPrice;
      if (sortBy === 'price_desc') return b.dailyPrice - a.dailyPrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.purchaseYear - a.purchaseYear;
      return 0; // recommended default
    });
  }, [
    products,
    selectedCategory,
    searchQuery,
    selectedGovernorate,
    selectedArea,
    priceRange,
    minRating,
    selectedCondition,
    availableOnly,
    sortBy,
  ]);

  const resetFilters = () => {
    setSelectedGovernorate('');
    setSelectedArea('');
    setPriceRange(1200);
    setMinRating(0);
    setSelectedCondition('');
    setAvailableOnly(false);
    setSearchQuery('');
  };

  const activeFiltersCount = [
    selectedGovernorate,
    selectedArea,
    selectedCondition,
    minRating > 0,
    availableOnly,
    searchQuery,
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Category Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <span>RentBack Egypt</span>
            <span>•</span>
            <span>
              {selectedCategory
                ? language === 'ar'
                  ? currentCategoryData?.nameAr
                  : currentCategoryData?.nameEn
                : t('جميع الأقسام للإيجار', 'All Rental Categories')}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black">
            {selectedCategory
              ? language === 'ar'
                ? `${currentCategoryData?.nameAr} للإيجار`
                : `${currentCategoryData?.nameEn} for Rent`
              : t('كتالوج المنتجات المتاحة للتأجير في مصر', 'Verified Rental Catalog in Egypt')}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300">
            {t(
              'منتجات أصلية مفحوصة بدقة مع تغطية شاملة وحفظ مستحقات عبر نظام حماية المنصة.',
              'Original inspected items with damage protection and managed courier delivery.'
            )}
          </p>
        </div>

        {/* Quick Category Chips */}
        <div className="pt-6 flex items-center gap-2 overflow-x-auto text-xs pb-1 relative z-10">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 rounded-full font-bold transition whitespace-nowrap cursor-pointer ${
              selectedCategory === null
                ? 'bg-emerald-500 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {t('جميع الأقسام (الكل)', 'All Categories')}
          </button>
          {CATEGORIES_LIST.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full font-bold transition whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {language === 'ar' ? cat.nameAr : cat.nameEn}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout with Sidebar Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block bg-white rounded-2xl border border-slate-200 p-5 space-y-6 sticky top-24 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
              <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
              <span>{t('تصفية النتائج', 'Filter Rentals')}</span>
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t('إعادة ضبط', 'Reset')}</span>
              </button>
            )}
          </div>

          {/* 1. Governorate Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              {t('المحافظة', 'Governorate')}
            </label>
            <select
              value={selectedGovernorate}
              onChange={(e) => setSelectedGovernorate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            >
              <option value="">{t('كل المحافظات (مصر)', 'All Governorates')}</option>
              {EGYPT_GOVERNORATES.map((g) => (
                <option key={g.en} value={g.en}>
                  {language === 'ar' ? g.ar : g.en}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Area text filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800">
              {t('المنطقة أو الحي', 'Area / Neighborhood')}
            </label>
            <input
              type="text"
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              placeholder={t('مثال: الشيخ زايد، سموحة، الدقي...', 'e.g. Dokki, Smouha...')}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>

          {/* 3. Daily Price Range */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">{t('السعر اليومي الأقصى', 'Max Daily Price')}</span>
              <span className="font-extrabold text-emerald-700">{priceRange} ج.م</span>
            </div>
            <input
              type="range"
              min="50"
              max="1500"
              step="50"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
              <span>50 ج.م</span>
              <span>1500+ ج.م</span>
            </div>
          </div>

          {/* 4. Condition */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800">
              {t('حالة المنتج', 'Product Condition')}
            </label>
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            >
              <option value="">{t('جميع الحالات', 'All Conditions')}</option>
              <option value="Like New">{t('كالجديد تماماً (Like New)', 'Like New')}</option>
              <option value="Very Good">{t('جيد جداً (Very Good)', 'Very Good')}</option>
              <option value="Good">{t('جيد (Good)', 'Good')}</option>
            </select>
          </div>

          {/* 5. Rating */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800">
              {t('أدنى تقييم', 'Minimum Rating')}
            </label>
            <div className="grid grid-cols-4 gap-1">
              {[0, 4.0, 4.5, 4.8].map((ratingVal) => (
                <button
                  key={ratingVal}
                  type="button"
                  onClick={() => setMinRating(ratingVal)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                    minRating === ratingVal
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{ratingVal === 0 ? t('الكل', 'All') : `${ratingVal}+`}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 6. Availability Checkbox */}
          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-800">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600 cursor-pointer"
              />
              <span>{t('إظهار المنتجات المتاحة فوراً فقط', 'Show immediately available only')}</span>
            </label>
          </div>
        </aside>

        {/* Product Grid & Controls */}
        <main className="lg:col-span-3 space-y-6">
          {/* Top Bar: Search input + Sorting + Mobile Filter Trigger */}
          <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute top-3 right-3 rtl:right-3 ltr:left-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('بحث بالاسم أو الموديل...', 'Search name or model...')}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-9 py-2 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute top-2.5 left-3 rtl:left-3 ltr:right-3 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Right side: Sorting + Mobile Filter Button */}
            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3">
              {/* Mobile Filter Toggle Button */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                <span>{t('تصفية', 'Filters')}</span>
                {activeFiltersCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Sorting Select */}
              <div className="flex items-center gap-1.5 text-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-500 hidden sm:inline">{t('الترتيب:', 'Sort by:')}</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer text-xs"
                >
                  <option value="recommended">{t('الموصى به (الأكثر ثقة)', 'Recommended')}</option>
                  <option value="price_asc">{t('السعر: من الأقل للأعلى', 'Lowest Price')}</option>
                  <option value="price_desc">{t('السعر: من الأعلى للأقل', 'Highest Price')}</option>
                  <option value="rating">{t('الأعلى تقييماً', 'Highest Rating')}</option>
                  <option value="newest">{t('الأحدث شراءً وموديلاً', 'Newest Model')}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results count & Active Pills */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              {t('تم العثور على', 'Found')}{' '}
              <strong className="text-slate-900 font-black">{filteredProducts.length}</strong>{' '}
              {t('منتج متاح للتأجير', 'items available for rent')}
            </span>

            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-emerald-700 hover:underline font-semibold"
              >
                {t('مسح جميع الفلاتر', 'Clear all filters')}
              </button>
            )}
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-800">
                {t('لم نجد أي منتجات تطابق معايير البحث المحددة', 'No rentals match your filter criteria')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                {t(
                  'جرب تقليل الفلاتر أو زيادة الميزانية اليومية أو البحث في محافظة أخرى.',
                  'Try expanding the price range or selecting another governorate.'
                )}
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition"
              >
                {t('إعادة ضبط البحث بالكامل', 'Reset all search filters')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/60 backdrop-blur-xs p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-slate-900 text-base">
                {t('تصفية المنتجات والبحث', 'Filter Rentals')}
              </h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Governorate */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">{t('المحافظة', 'Governorate')}</label>
              <select
                value={selectedGovernorate}
                onChange={(e) => setSelectedGovernorate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium"
              >
                <option value="">{t('كل المحافظات (مصر)', 'All Governorates')}</option>
                {EGYPT_GOVERNORATES.map((g) => (
                  <option key={g.en} value={g.en}>
                    {language === 'ar' ? g.ar : g.en}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile Price Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-800">{t('أقصى ميزانية يومية', 'Max Daily Price')}</span>
                <span className="font-bold text-emerald-600">{priceRange} ج.م</span>
              </div>
              <input
                type="range"
                min="50"
                max="1500"
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={() => {
                  resetFilters();
                  setMobileFiltersOpen(false);
                }}
                className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs"
              >
                {t('مسح الفلاتر', 'Reset')}
              </button>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-1/2 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-600/30"
              >
                {t('تطبيق النتائج', 'Apply Filters')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
