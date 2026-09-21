export type Language = 'ar' | 'en';

export type UserRole = 'renter' | 'owner' | 'admin';

export type VerificationStatus = 'not_verified' | 'pending' | 'verified' | 'failed';

export type AccountStatus = 'active' | 'restricted' | 'under_review' | 'suspended';

export type ProductCategory =
  | 'Fashion & Clothing'
  | 'Furniture'
  | 'Home Appliances'
  | 'Furnishings'
  | 'Electronics'
  | 'Cameras & Photography'
  | 'Tools & Equipment'
  | 'Events & Party Equipment'
  | 'Sports & Outdoor'
  | 'Other';

export type ProductCondition = 'New' | 'Like New' | 'Very Good' | 'Good';

export type RentalStatus =
  | 'booking_requested'
  | 'booking_confirmed'
  | 'payment_secured'
  | 'owner_confirmed'
  | 'courier_assigned'
  | 'pickup_scheduled'
  | 'picked_up'
  | 'item_picked_up_owner'
  | 'item_inspected_initial'
  | 'out_for_delivery'
  | 'delivered'
  | 'delivered_to_renter'
  | 'rental_active'
  | 'rental_in_progress'
  | 'return_scheduled'
  | 'return_requested'
  | 'return_picked_up'
  | 'returned'
  | 'inspection'
  | 'final_inspection'
  | 'completed'
  | 'completed_deposit_refunded'
  | 'cancelled'
  | 'disputed';

export interface User {
  id: string;
  name: string;
  nameAr: string;
  email: string;
  governorate: string;
  governorateAr: string;
  area: string;
  areaAr: string;
  role: UserRole;
  accountStatus: AccountStatus;
  verificationStatus: VerificationStatus;
  rating: number;
  completedRentals: number;
  avatar: string;
  memberSince: string;
  nationalIdNumber?: string;
}

export interface DynamicCategoryAnswers {
  // Electronics
  batteryCondition?: string;
  screenCondition?: string;
  workingCondition?: string;
  // Furniture
  material?: string;
  dimensions?: string;
  scratches?: string;
  stains?: string;
  assemblyRequired?: string;
  piecesCount?: number;
  // Clothing
  size?: string;
  clothingMaterial?: string;
  previousUses?: number;
  cleaningStatus?: string;
  // Home Appliances
  powerRating?: string;
  applianceCondition?: string;
  previousRepairs?: string;
  // Common
  brand?: string;
  model?: string;
  purchaseYear?: number;
  usageDuration?: string;
  warranty?: string;
  serialNumber?: string;
  accessories?: string;
}

export interface VerificationPhotos {
  front?: string;
  back?: string;
  side?: string;
  condition?: string;
  serialNumber?: string;
  videoUrl?: string;
  selfieWithProduct?: string;
}

export interface AIInspectionResult {
  conditionScore: number;
  visibleDamage: string;
  visibleDamageAr: string;
  completeness: string;
  completenessAr: string;
  imageQuality?: string;
  imageQualityAr?: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  riskLevelAr: string;
  recommendation: string;
  recommendationAr: string;
  analyzedAt?: string;
}

export interface RentalProduct {
  id: string;
  name: string;
  nameAr: string;
  category: ProductCategory;
  categoryAr: string;
  brand: string;
  model: string;
  purchaseYear: number;
  usageDuration: string;
  usageDurationAr: string;
  condition: ProductCondition;
  conditionAr: string;
  originalPrice: number;
  dailyPrice: number;
  weeklyPrice?: number;
  securityDeposit: number;
  isAvailable: boolean;
  governorate: string;
  governorateAr: string;
  area: string;
  areaAr: string;
  images: string[];
  videoUrl?: string;
  rating: number;
  reviewsCount: number;
  isIdentityVerified: boolean;
  isProductReviewed: boolean;
  isDeliveryAvailable: boolean;
  isPaymentProtected: boolean;
  ownerId: string;
  ownerName: string;
  ownerNameAr: string;
  ownerRating: number;
  ownerCompletedRentals: number;
  specifications: Record<string, string>;
  specificationsAr: Record<string, string>;
  includedAccessories: string[];
  knownDefects?: string;
  previousRepairs?: string;
  warranty?: string;
  serialNumber?: string;
  approvalStatus: 'approved' | 'pending_admin_review' | 'pending_review' | 'rejected';
  aiInspection?: AIInspectionResult;
  verificationPhotos?: VerificationPhotos;
  dynamicAnswers?: DynamicCategoryAnswers;
}

export interface RentalBooking {
  id: string;
  productId: string;
  product: RentalProduct;
  renterId: string;
  renterName: string;
  renterNameAr: string;
  startDate: string;
  endDate: string;
  daysCount: number;
  dailyRate: number;
  rentalCost: number;
  deliveryFee: number;
  securityDeposit: number;
  platformFee: number;
  totalAmount: number;
  status: RentalStatus;
  createdAt: string;
  paymentMethod: 'credit_card' | 'mobile_wallet';
  paymentStatus: 'secured' | 'released' | 'refunded';
  deliveryTrackingNumber: string;
  courierName: string;
  deliveryEstimatedDate: string;
  pickupAddress: string;
  deliveryAddress: string;
  beforeInspection?: ConditionInspectionRecord;
  afterInspection?: ConditionInspectionRecord;
  disputeId?: string;
}

export interface ConditionInspectionRecord {
  inspectionDate: string;
  inspectorName: string;
  photos: string[];
  conditionNotes: string;
  conditionNotesAr: string;
  defectsFound: string[];
  defectsFoundAr: string[];
  accessoriesPresent: string[];
  accessoriesPresentAr: string[];
  batteryHealth?: string;
  functionalStatus: 'Flawless' | 'Minor Scratches' | 'Damaged' | 'Missing Parts';
}

export interface DamageDispute {
  id: string;
  bookingId: string;
  productId: string;
  productName: string;
  productNameAr: string;
  renterName: string;
  renterNameAr: string;
  ownerName: string;
  ownerNameAr: string;
  status: 'Open' | 'Under Review' | 'Resolved';
  damagePhotos: string[];
  damageDescription: string;
  damageDescriptionAr: string;
  estimatedRepairCost: number;
  submittedAt: string;
  resolutionVerdict?:
    | 'No Damage'
    | 'Minor Damage'
    | 'Major Damage'
    | 'Renter Responsible'
    | 'Owner Responsible'
    | 'Claim Rejected'
    | 'Partial Compensation'
    | 'Full Compensation';
  resolutionNotes?: string;
  compensationAmount?: number;
  resolvedAt?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  titleAr: string;
  message: string;
  messageAr: string;
  timestamp: string;
  read: boolean;
  type:
    | 'identity_verification'
    | 'product_approval'
    | 'rental_request'
    | 'payment'
    | 'pickup'
    | 'delivery'
    | 'rental_start'
    | 'return_reminder'
    | 'return_pickup'
    | 'product_inspection'
    | 'dispute'
    | 'payout';
  bookingId?: string;
}
