import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  UserRole,
  RentalProduct,
  RentalBooking,
  DamageDispute,
  AppNotification,
  User,
  RentalStatus,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_BOOKINGS,
  INITIAL_DISPUTES,
  INITIAL_NOTIFICATIONS,
} from '../mockData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  activeView: string;
  setActiveView: (view: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedBookingId: string | null;
  setSelectedBookingId: (id: string | null) => void;
  products: RentalProduct[];
  bookings: RentalBooking[];
  disputes: DamageDispute[];
  notifications: AppNotification[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchGovernorate: string;
  setSearchGovernorate: (gov: string) => void;
  searchCategory: string;
  setSearchCategory: (cat: string) => void;
  searchMaxBudget: number;
  setSearchMaxBudget: (budget: number) => void;
  searchDuration: number;
  setSearchDuration: (dur: number) => void;
  bookingModalOpen: boolean;
  setBookingModalOpen: (open: boolean) => void;
  supportModalOpen: boolean;
  setSupportModalOpen: (open: boolean) => void;
  createBooking: (newBooking: Partial<RentalBooking>) => RentalBooking;
  updateBookingStatus: (bookingId: string, newStatus: RentalStatus) => void;
  addProduct: (product: RentalProduct) => void;
  updateProductApproval: (productId: string, status: 'approved' | 'rejected', notes?: string) => void;
  verifyIdentity: (data: { nationalId: string; name: string }) => void;
  submitDispute: (disputeData: Partial<DamageDispute>) => void;
  resolveDispute: (
    disputeId: string,
    verdict: DamageDispute['resolutionVerdict'],
    notes: string,
    compensation?: number
  ) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  navigateToProduct: (id: string) => void;
  navigateToCategory: (catName: string) => void;
  navigateToTracking: (bookingId: string) => void;
  t: (arText: string, enText: string) => string;
}

const defaultUser: User = {
  id: 'renter-cur-01',
  name: 'Karim Adel',
  nameAr: 'كريم عادل',
  email: 'karim.adel@example.com',
  governorate: 'Ismailia',
  governorateAr: 'الإسماعيلية',
  area: 'Al Montazah',
  areaAr: 'حي المنتزه',
  role: 'renter',
  accountStatus: 'active',
  verificationStatus: 'verified',
  rating: 4.95,
  completedRentals: 12,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  memberSince: '2025',
  nationalIdNumber: '29810141901234',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ar');
  const [activeRole, setActiveRole] = useState<UserRole>('renter');
  const [currentUser, setCurrentUser] = useState<User>(defaultUser);
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>('BK-2026-9041');
  
  const [products, setProducts] = useState<RentalProduct[]>(INITIAL_PRODUCTS);
  const [bookings, setBookings] = useState<RentalBooking[]>(INITIAL_BOOKINGS);
  const [disputes, setDisputes] = useState<DamageDispute[]>(INITIAL_DISPUTES);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [favorites, setFavorites] = useState<string[]>(['rh-prod-01', 'rh-prod-03']);

  // Global search & filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchGovernorate, setSearchGovernorate] = useState<string>('');
  const [searchCategory, setSearchCategory] = useState<string>('');
  const [searchMaxBudget, setSearchMaxBudget] = useState<number>(1000);
  const [searchDuration, setSearchDuration] = useState<number>(3);

  // Modals
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [supportModalOpen, setSupportModalOpen] = useState<boolean>(false);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (arText: string, enText: string): string => {
    return language === 'ar' ? arText : enText;
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const createBooking = (newBookingData: Partial<RentalBooking>): RentalBooking => {
    const newId = `BK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullBooking: RentalBooking = {
      id: newId,
      productId: newBookingData.productId || products[0].id,
      product: newBookingData.product || products[0],
      renterId: currentUser.id,
      renterName: currentUser.name,
      renterNameAr: currentUser.nameAr,
      startDate: newBookingData.startDate || '2026-03-12',
      endDate: newBookingData.endDate || '2026-03-15',
      daysCount: newBookingData.daysCount || 3,
      dailyRate: newBookingData.dailyRate || 50,
      rentalCost: newBookingData.rentalCost || 150,
      deliveryFee: newBookingData.deliveryFee || 50,
      securityDeposit: newBookingData.securityDeposit || 500,
      platformFee: newBookingData.platformFee || 20,
      totalAmount: newBookingData.totalAmount || 720,
      status: 'payment_secured',
      createdAt: new Date().toISOString(),
      paymentMethod: newBookingData.paymentMethod || 'credit_card',
      paymentStatus: 'secured',
      deliveryTrackingNumber: `RB-EG-${Math.floor(100000 + Math.random() * 900000)}`,
      courierName: 'RentBack Express / Bosta Logistics',
      deliveryEstimatedDate: '2026-03-12',
      pickupAddress: `${newBookingData.product?.governorate || 'Ismailia'}, ${newBookingData.product?.area || 'Center'}`,
      deliveryAddress: `${currentUser.governorateAr || 'الإسماعيلية'}، ${currentUser.areaAr || 'حي المنتزه'}`,
    };

    setBookings((prev) => [fullBooking, ...prev]);
    setSelectedBookingId(newId);

    // Add notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Booking Confirmed & Payment Secured',
      titleAr: 'تم تأكيد الحجز وتأمين الدفع بنجاح',
      message: `Your booking for ${fullBooking.product.name} is secured. Amount: ${fullBooking.totalAmount} EGP.`,
      messageAr: `تم تأمين حجز ${fullBooking.product.nameAr} بنجاح. القيمة المحفوظة: ${fullBooking.totalAmount} ج.م في نظام حماية التأجير.`,
      timestamp: 'Just now',
      read: false,
      type: 'payment',
      bookingId: newId,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return fullBooking;
  };

  const updateBookingStatus = (bookingId: string, newStatus: RentalStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );

    const targetBooking = bookings.find((b) => b.id === bookingId);
    if (!targetBooking) return;

    let titleEn = `Rental Status Updated: ${newStatus}`;
    let titleAr = `تحديث حالة الإيجار: ${newStatus}`;
    let msgEn = `Booking ${bookingId} has advanced to ${newStatus}.`;
    let msgAr = `تم تحديث الحجز ${bookingId} إلى المرحلة: ${newStatus}.`;

    if (newStatus === 'delivered') {
      titleEn = 'Item Delivered Successfully';
      titleAr = 'تم تسليم المنتج للمستأجر بنجاح';
      msgEn = 'Courier delivered your rental item. Enjoy your rental!';
      msgAr = 'تم استلام المنتج من المندوب وبدأت فترة التأجير الرسمية الآن.';
    } else if (newStatus === 'completed') {
      titleEn = 'Rental Completed & Owner Payout Released';
      titleAr = 'اكتمل التأجير وتم تحويل مستحقات المالك';
      msgEn = 'Inspection verified zero damage. Security deposit released to renter & rental fees to owner.';
      msgAr = 'تم فحص استلام المنتج بدون أي تلفيات. تم إرجاع مبلغ التأمين للمستأجر وتحويل المستحقات للمالك.';
    }

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: titleEn,
        titleAr: titleAr,
        message: msgEn,
        messageAr: msgAr,
        timestamp: 'Just now',
        read: false,
        type: newStatus === 'completed' ? 'payout' : 'delivery',
        bookingId,
      },
      ...prev,
    ]);
  };

  const addProduct = (newProd: RentalProduct) => {
    setProducts((prev) => [newProd, ...prev]);
    // Notification for admin and owner
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'New Product Submitted for Review',
        titleAr: 'تم تقديم منتج جديد للمراجعة والاعتماد',
        message: `${newProd.name} entered Pending Admin Review after AI inspection.`,
        messageAr: `تم إرسال ${newProd.nameAr} إلى قسم المراجعة الإدارية بعد اجتياز الفحص الذكي.`,
        timestamp: 'Just now',
        read: false,
        type: 'product_approval',
      },
      ...prev,
    ]);
  };

  const updateProductApproval = (
    productId: string,
    status: 'approved' | 'rejected',
    _notes?: string
  ) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, approvalStatus: status, isAvailable: status === 'approved' } : p))
    );

    const prod = products.find((p) => p.id === productId);
    const prodName = prod ? prod.nameAr : productId;

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: status === 'approved' ? 'Product Approved & Published' : 'Product Review Status Updated',
        titleAr: status === 'approved' ? 'تمت الموافقة ونشر المنتج في السوق' : 'تحديث حالة فحص المنتج',
        message:
          status === 'approved'
            ? `${prod?.name || 'Your product'} is now live and rentable on RentBack!`
            : `${prod?.name || 'Your product'} was rejected or requires more information.`,
        messageAr:
          status === 'approved'
            ? `تهانينا! أصبح المنتج ${prodName} معتمداً ومتاحاً للتأجير الفوري للجميع على رنت باك.`
            : `تم رفض المنتج ${prodName} أو يتطلب استكمال بيانات الفحص.`,
        timestamp: 'Just now',
        read: false,
        type: 'product_approval',
      },
      ...prev,
    ]);
  };

  const verifyIdentity = (data: { nationalId: string; name: string }) => {
    setCurrentUser((prev) => ({
      ...prev,
      verificationStatus: 'verified',
      nationalIdNumber: data.nationalId,
    }));

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Identity Verification Approved',
        titleAr: 'تم توثيق هويتك الوطنية بنجاح',
        message: 'Your National ID has been verified with Egyptian ID Authority simulation.',
        messageAr: 'تم فحص ومطابقة الرقم القومي حيوياً بنجاح. حسابك الآن مفعل بدرجة موثوقية عالية.',
        timestamp: 'Just now',
        read: false,
        type: 'identity_verification',
      },
      ...prev,
    ]);
  };

  const submitDispute = (disputeData: Partial<DamageDispute>) => {
    const newId = `DSP-2026-00${disputes.length + 1}`;
    const newDispute: DamageDispute = {
      id: newId,
      bookingId: disputeData.bookingId || 'BK-2026-9041',
      productId: disputeData.productId || products[0].id,
      productName: disputeData.productName || products[0].name,
      productNameAr: disputeData.productNameAr || products[0].nameAr,
      renterName: disputeData.renterName || 'Karim Adel',
      renterNameAr: disputeData.renterNameAr || 'كريم عادل',
      ownerName: disputeData.ownerName || 'Tarek Mansour',
      ownerNameAr: disputeData.ownerNameAr || 'طارق منصور',
      status: 'Open',
      damagePhotos: disputeData.damagePhotos || [
        'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=600&q=80',
      ],
      damageDescription: disputeData.damageDescription || 'Damage detected after return.',
      damageDescriptionAr: disputeData.damageDescriptionAr || 'تم رصد تلف بعد استرجاع المنتج.',
      estimatedRepairCost: disputeData.estimatedRepairCost || 350,
      submittedAt: new Date().toISOString(),
    };

    setDisputes((prev) => [newDispute, ...prev]);

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Damage Dispute Opened',
        titleAr: 'تم فتح نزاع تلفيات جديد للمراجعة',
        message: `Dispute filed for ${newDispute.productName}. Platform legal arbiters are reviewing evidence.`,
        messageAr: `تم تسجيل طلب تعويض عن تلفيات لـ ${newDispute.productNameAr}. جاري فحص صور ما قبل التأجير وما بعد الإرجاع.`,
        timestamp: 'Just now',
        read: false,
        type: 'dispute',
      },
      ...prev,
    ]);
  };

  const resolveDispute = (
    disputeId: string,
    verdict: DamageDispute['resolutionVerdict'],
    notes: string,
    compensation?: number
  ) => {
    setDisputes((prev) =>
      prev.map((d) =>
        d.id === disputeId
          ? {
              ...d,
              status: 'Resolved',
              resolutionVerdict: verdict,
              resolutionNotes: notes,
              compensationAmount: compensation,
              resolvedAt: new Date().toISOString(),
            }
          : d
      )
    );

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Dispute Arbitration Decided',
        titleAr: 'تم الفصل في نزاع التلفيات من إدارة المنصة',
        message: `Verdict: ${verdict}. Compensation: ${compensation || 0} EGP.`,
        messageAr: `قرار التحكيم: ${verdict}. قيمة التعويض المقررة: ${compensation || 0} ج.م من مبلغ التأمين.`,
        timestamp: 'Just now',
        read: false,
        type: 'dispute',
      },
      ...prev,
    ]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const navigateToProduct = (id: string) => {
    setSelectedProductId(id);
    setActiveView('product_details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategory = (catName: string) => {
    setSelectedCategory(catName);
    setActiveView('category_listing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToTracking = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setActiveView('rental_tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        activeRole,
        setActiveRole,
        currentUser,
        setCurrentUser,
        activeView,
        setActiveView,
        selectedCategory,
        setSelectedCategory,
        selectedProductId,
        setSelectedProductId,
        selectedBookingId,
        setSelectedBookingId,
        products,
        bookings,
        disputes,
        notifications,
        favorites,
        toggleFavorite,
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
        bookingModalOpen,
        setBookingModalOpen,
        supportModalOpen,
        setSupportModalOpen,
        createBooking,
        updateBookingStatus,
        addProduct,
        updateProductApproval,
        verifyIdentity,
        submitDispute,
        resolveDispute,
        markNotificationRead,
        markAllNotificationsRead,
        navigateToProduct,
        navigateToCategory,
        navigateToTracking,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
