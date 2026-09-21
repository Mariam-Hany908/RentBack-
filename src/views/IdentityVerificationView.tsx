import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  Camera,
  Upload,
  CreditCard,
  UserCheck,
  Lock,
  Sparkles,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export const IdentityVerificationView: React.FC = () => {
  const { language, currentUser, verifyIdentity, t } = useApp();

  const [nationalIdNumber, setNationalIdNumber] = useState(currentUser.nationalIdNumber || '29508140102934');
  const [fullName, setFullName] = useState(currentUser.nameAr || 'كريم عادل');
  const [governorate, setGovernorate] = useState(currentUser.governorateAr || 'الإسماعيلية');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(currentUser.verificationStatus === 'verified');

  const handleRunKyc = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedSuccess(true);
      verifyIdentity({
        nationalId: nationalIdNumber,
        name: fullName,
      });
    }, 1800);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>{t('توثيق الهوية الوطنية والأمان (KYC Verification)', 'National Identity Verification')}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">
          {t('التحقق الإلزامي من بطاقة الرقم القومي المصري', 'Mandatory Egyptian National ID Verification')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {t(
            'لحماية المجتمع ومنع أي احتيال، يمر جميع الملاك والمستأجرين في رنت باك بفحص أمني لبطاقة الرقم القومي والمطابقة الحيوية للوجه قبل إتمام أي حجز.',
            'To protect our community, every host and renter verifies their 14-digit Egyptian National ID and face match before transactions.'
          )}
        </p>

        {verifiedSuccess && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              {t('حسابك موثق رسمياً ويحمل شارة التحقق الخضراء ✓', 'Your account is officially verified with the Green Trust Badge ✓')}
            </span>
          </div>
        )}
      </div>

      {/* Main Verification Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-600" />
            <span>{t('بيانات بطاقة الرقم القومي والمطابقة', 'National ID & Biometric Verification')}</span>
          </h3>
          <span className="text-xs font-bold text-slate-500 font-mono">
            {verifiedSuccess ? t('حالة التوثيق: موثق', 'Status: VERIFIED') : t('حالة التوثيق: قيد التدقيق', 'Status: PENDING')}
          </span>
        </div>

        <form onSubmit={handleRunKyc} className="space-y-6 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-800 block">
                {t('الاسم الثلاثي المطابق للبطاقة:', 'Full Name (as in ID):')}
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold text-slate-900"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800 block">
                {t('الرقم القومي (14 رقماً):', 'National ID Number (14 Digits):')}
              </label>
              <input
                type="text"
                maxLength={14}
                value={nationalIdNumber}
                onChange={(e) => setNationalIdNumber(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-mono font-bold text-slate-900"
              />
            </div>
          </div>

          {/* Photo upload blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Front of ID */}
            <div className="p-4 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-center space-y-2">
              <div className="aspect-[3/2] rounded-xl overflow-hidden bg-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80"
                  alt="Front ID"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">1. {t('صورة وجه البطاقة القومية', 'Front of ID')}</span>
                <span className="text-[10px] font-bold text-emerald-700">✓ {t('تم المسح', 'Scanned')}</span>
              </div>
            </div>

            {/* Live Selfie Face Match */}
            <div className="p-4 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-center space-y-2">
              <div className="aspect-[3/2] rounded-xl overflow-hidden bg-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                  alt="Live Selfie"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">2. {t('المطابقة الحيوية (سيلفي حي)', 'Biometric Face Match')}</span>
                <span className="text-[10px] font-bold text-emerald-700">✓ {t('تطابق 99.4%', '99.4% Match')}</span>
              </div>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Lock className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {t(
                '🔒 التزام الأمان والسرية: يتم تشفير بيانات بطاقة الرقم القومي وفق معايير التشفير البنكي AES-256. لا يتم مشاركة البطاقة مع المالك أو المستأجر مطلقاً ولا تظهر للعامة.',
                '🔒 Bank-grade AES-256 encryption. Your National ID photo is never shared with any other user and remains strictly private.'
              )}
            </p>
          </div>

          {/* Submit / Re-verify button */}
          <button
            type="submit"
            disabled={isVerifying}
            className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm transition shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-75"
          >
            {isVerifying ? (
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>{t('جاري التحقق والمطابقة مع السجل القومي...', 'Validating Egyptian ID & Biometrics...')}</span>
              </div>
            ) : verifiedSuccess ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>{t('تحديث ومطابقة بيانات التوثيق', 'Re-verify National ID')}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>{t('توثيق الهوية والحصول على شارة الثقة الخضراء', 'Verify ID & Get Verified Badge')}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
