import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Search,
  PlusCircle,
  Bell,
  Heart,
  User as UserIcon,
  Menu,
  X,
  Languages,
  Package,
  Clock,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';
import { UserRole } from '../types';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    activeRole,
    setActiveRole,
    currentUser,
    activeView,
    setActiveView,
    notifications,
    favorites,
    markNotificationRead,
    markAllNotificationsRead,
    setSupportModalOpen,
    navigateToTracking,
    selectedBookingId,
    t,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNav = (viewName: string) => {
    setActiveView(viewName);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      {/* Top micro-banner: Trust & Safety Intermediary Notice */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              {t('منصة وساطة موثوقة في مصر', 'Trusted Egyptian Intermediary Platform')}
            </span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-slate-400">
              {t(
                'فحص هوية وطنية + فحص ذكي للمنتجات + دفع مؤمن بالكامل + شحن وتوصيل للمحافظات',
                'National ID KYC + AI Inspection + Protected Payments + Managed Delivery'
              )}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Direct testing switcher for Roles */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 transition text-[11px]"
                title={t('تبديل وضع العرض للتجربة', 'Switch persona for demo')}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>
                  {activeRole === 'renter'
                    ? t('مستأجر (Renter)', 'Renter')
                    : activeRole === 'owner'
                    ? t('مالك (Owner)', 'Owner')
                    : t('مسؤول (Admin)', 'Admin')}
                </span>
                <span className="text-slate-400 text-[9px]">▼</span>
              </button>

              {roleMenuOpen && (
                <div
                  className={`absolute mt-1 w-44 bg-white text-slate-800 rounded-lg shadow-xl border border-slate-200 py-1.5 z-50 ${
                    language === 'ar' ? 'left-0' : 'right-0'
                  }`}
                >
                  <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-slate-400 border-b border-slate-100">
                    {t('تجربة الأدوار', 'Switch Role for Demo')}
                  </div>
                  {(['renter', 'owner', 'admin'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setActiveRole(r);
                        setRoleMenuOpen(false);
                        if (r === 'admin') setActiveView('admin_dashboard');
                        else if (r === 'owner') setActiveView('owner_dashboard');
                        else setActiveView('home');
                      }}
                      className={`w-full text-right rtl:text-right ltr:text-left px-3 py-1.5 text-xs hover:bg-slate-50 flex items-center justify-between ${
                        activeRole === r ? 'font-bold text-emerald-600 bg-emerald-50/60' : 'text-slate-700'
                      }`}
                    >
                      <span>
                        {r === 'renter'
                          ? t('وضع المستأجر', 'Renter Mode')
                          : r === 'owner'
                          ? t('وضع المالك / المؤجر', 'Owner Mode')
                          : t('لوحة تحكم الإدارة', 'Admin Dashboard')}
                      </span>
                      {activeRole === r && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition cursor-pointer"
              title="Toggle Arabic / English"
            >
              <Languages className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'ar' ? 'English' : 'عربي'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-2 group text-start focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-black text-xl shadow-md shadow-emerald-600/20 group-hover:scale-105 transition">
                <span>R</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-emerald-600 transition">
                    RentBack
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {t('مصر 🇪🇬', 'EG 🇪🇬')}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium">
                  {t('تأجير موثوق ومفحوص', 'Verified Rental Marketplace')}
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold text-slate-700">
              <button
                onClick={() => handleNav('home')}
                className={`px-3 py-2 rounded-lg transition ${
                  activeView === 'home'
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'hover:text-slate-950 hover:bg-slate-100/80'
                }`}
              >
                {t('الرئيسية', 'Home')}
              </button>
              <button
                onClick={() => handleNav('categories')}
                className={`px-3 py-2 rounded-lg transition ${
                  activeView === 'categories' || activeView === 'category_listing'
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'hover:text-slate-950 hover:bg-slate-100/80'
                }`}
              >
                {t('الأقسام', 'Categories')}
              </button>
              <button
                onClick={() => {
                  handleNav('home');
                  setTimeout(() => {
                    document.getElementById('how-it-works-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="px-3 py-2 rounded-lg hover:text-slate-950 hover:bg-slate-100/80 transition"
              >
                {t('كيف يعمل؟', 'How It Works')}
              </button>
              <button
                onClick={() => handleNav('renter_dashboard')}
                className={`px-3 py-2 rounded-lg transition ${
                  activeView === 'renter_dashboard'
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'hover:text-slate-950 hover:bg-slate-100/80'
                }`}
              >
                {t('إيجاراتي', 'My Rentals')}
              </button>
              <button
                onClick={() => handleNav('disputes')}
                className={`px-3 py-2 rounded-lg transition ${
                  activeView === 'disputes'
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'hover:text-slate-950 hover:bg-slate-100/80'
                }`}
              >
                {t('النزاعات والتعويضات', 'Disputes')}
              </button>
            </nav>
          </div>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* List Your Item CTA */}
            <button
              onClick={() => handleNav('list_item')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-sm shadow-emerald-600/25 transition cursor-pointer active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('أضف منتجك للتأجير', 'List Your Item')}</span>
            </button>

            {/* Favorites Icon */}
            <button
              onClick={() => handleNav('renter_dashboard')}
              className="relative p-2 text-slate-600 hover:text-rose-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
              title={t('المفضلة', 'Favorites')}
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                title={t('الإشعارات', 'Notifications')}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div
                  className={`absolute mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden ${
                    language === 'ar' ? 'left-0' : 'right-0'
                  }`}
                >
                  <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-emerald-400" />
                      <span className="font-bold text-sm">{t('الإشعارات والتحديثات', 'Notifications')}</span>
                      <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-semibold">
                        {unreadCount} {t('جديد', 'new')}
                      </span>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-xs text-slate-300 hover:text-white underline cursor-pointer"
                      >
                        {t('تعليم الكل كمقروء', 'Mark all read')}
                      </button>
                    )}
                  </div>

                  <div className="max-h-96 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-slate-400 text-sm">
                        {t('لا توجد إشعارات حالياً', 'No notifications yet')}
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => {
                            markNotificationRead(notif.id);
                            if (notif.bookingId) {
                              navigateToTracking(notif.bookingId);
                              setNotificationsOpen(false);
                            }
                          }}
                          className={`p-3.5 hover:bg-slate-50 transition cursor-pointer ${
                            !notif.read ? 'bg-emerald-50/40' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-semibold text-xs sm:text-sm text-slate-900">
                              {language === 'ar' ? notif.titleAr : notif.title}
                            </span>
                            <span className="text-[10px] text-slate-400 shrink-0">{notif.timestamp}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                            {language === 'ar' ? notif.messageAr : notif.message}
                          </p>
                          {notif.bookingId && (
                            <span className="inline-block mt-1.5 text-[11px] font-semibold text-emerald-600 hover:underline">
                              {t('عرض تتبع الشحنة والحجز ←', 'Track booking & delivery →')}
                            </span>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile & KYC badge */}
            <button
              onClick={() => handleNav(activeRole === 'owner' ? 'owner_dashboard' : activeRole === 'admin' ? 'admin_dashboard' : 'renter_dashboard')}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition cursor-pointer"
              title={t('الملف الشخصي ولوحة التحكم', 'Profile & Dashboard')}
            >
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/30"
                />
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white flex items-center justify-center text-[8px] text-white font-bold"
                  title={t('هوية موثقة رسمياً', 'National ID Verified')}
                >
                  ✓
                </span>
              </div>
              <div className="hidden md:block text-start">
                <div className="text-xs font-bold text-slate-800 leading-tight">
                  {language === 'ar' ? currentUser.nameAr : currentUser.name}
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                  <ShieldCheck className="w-2.5 h-2.5" />
                  {t('هوية موثقة', 'KYC Verified')}
                </div>
              </div>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <img
                src={currentUser.avatar}
                alt=""
                className="w-10 h-10 rounded-full ring-2 ring-emerald-500/30"
              />
              <div>
                <p className="font-bold text-sm text-slate-900">
                  {language === 'ar' ? currentUser.nameAr : currentUser.name}
                </p>
                <p className="text-xs text-emerald-600 font-medium">
                  {currentUser.governorateAr} • {t('موثق الهوية', 'Verified')}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleNav('identity_verification')}
              className="px-2.5 py-1 text-xs font-semibold rounded bg-emerald-50 text-emerald-700 border border-emerald-200"
            >
              {t('توثيق الهوية', 'Verify ID')}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => handleNav('home')}
              className={`p-2.5 rounded-lg text-start ${activeView === 'home' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50'}`}
            >
              🏠 {t('الرئيسية', 'Home')}
            </button>
            <button
              onClick={() => handleNav('categories')}
              className={`p-2.5 rounded-lg text-start ${activeView === 'categories' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50'}`}
            >
              📦 {t('تصفح الأقسام', 'Categories')}
            </button>
            <button
              onClick={() => handleNav('list_item')}
              className={`p-2.5 rounded-lg text-start ${activeView === 'list_item' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50'}`}
            >
              ➕ {t('أضف منتج للتأجير', 'List an Item')}
            </button>
            <button
              onClick={() => handleNav('renter_dashboard')}
              className={`p-2.5 rounded-lg text-start ${activeView === 'renter_dashboard' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50'}`}
            >
              📋 {t('إيجاراتي', 'My Rentals')}
            </button>
            <button
              onClick={() => handleNav('owner_dashboard')}
              className={`p-2.5 rounded-lg text-start ${activeView === 'owner_dashboard' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50'}`}
            >
              💼 {t('لوحة المالك والأرباح', 'Owner Dashboard')}
            </button>
            <button
              onClick={() => handleNav('admin_dashboard')}
              className={`p-2.5 rounded-lg text-start ${activeView === 'admin_dashboard' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50'}`}
            >
              🛡️ {t('لوحة تحكم الإدارة', 'Admin Dashboard')}
            </button>
            <button
              onClick={() => handleNav('disputes')}
              className={`p-2.5 rounded-lg text-start ${activeView === 'disputes' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50'}`}
            >
              ⚖️ {t('النزاعات والتعويض', 'Disputes')}
            </button>
            <button
              onClick={() => {
                if (selectedBookingId) navigateToTracking(selectedBookingId);
                else handleNav('renter_dashboard');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg text-start bg-slate-50"
            >
              🚚 {t('تتبع التوصيل', 'Track Order')}
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setSupportModalOpen(true)}
              className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              {t('تواصل مع الدعم الفني للمنصة', 'Platform Support')}
            </button>
            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="text-xs font-semibold text-emerald-700"
            >
              {language === 'ar' ? 'English Language' : 'اللغة العربية'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
