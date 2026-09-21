import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Send, ShieldCheck, Headphones, MessageSquare, Clock, CheckCheck } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'support';
  text: string;
  timestamp: string;
}

export const SupportModal: React.FC = () => {
  const { supportModalOpen, setSupportModalOpen, language, currentUser, t } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'support',
      text:
        language === 'ar'
          ? 'مرحباً بك في خدمة عملاء رنت باك مصر. كيف يمكننا مساعدتك اليوم بخصوص الإيجار، التوصيل، أو الفحص؟'
          : 'Welcome to RentBack Egypt Support. How can we help you today with your rental, delivery, or inspection?',
      timestamp: '10:00 AM',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!supportModalOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let reply =
        language === 'ar'
          ? 'شكراً لتواصلك. لحماية أمان جميع الأطراف، نحن نقوم بالتنسيق المباشر بين المالك والمستأجر وشركة الشحن لضمان استلام وفحص المنتج في الموعد المحدد وبدون أي تواصل شخصي مباشر.'
          : 'Thank you for reaching out. To protect the privacy and safety of both parties, RentBack mediates all courier schedules, condition checks, and security deposit management.';

      if (inputText.toLowerCase().includes('phone') || inputText.includes('رقم') || inputText.includes('تواصل')) {
        reply =
          language === 'ar'
            ? 'وفقاً لسياسة الأمان للمنصة، لا يتم مشاركة أرقام الهواتف الشخصية. مندوب الشحن المعتمد لدينا سيتولى الاستلام والتسليم مباشرة مع التوثيق الكامل.'
            : 'Per our safety policy, private contact numbers are protected. Our verified courier handles pickup and delivery directly with full photo documentation.';
      }

      const supportMsg: ChatMessage = {
        id: `sup-${Date.now()}`,
        sender: 'support',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, supportMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col h-[560px]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base flex items-center gap-1.5">
                {t('فريق دعم رنت باك المباشر', 'RentBack Official Support')}
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping"></span>
              </h3>
              <p className="text-[11px] text-slate-400">
                {t('وسيطك الآمن لحل أي استفسار أو مشكلة في الشحن', 'Your secure intermediary for rentals & delivery')}
              </p>
            </div>
          </div>
          <button
            onClick={() => setSupportModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Safety Note banner */}
        <div className="bg-emerald-50 text-emerald-900 px-4 py-2 text-xs flex items-center gap-2 border-b border-emerald-100">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            {t(
              'جميع المحادثات موثقة لحفظ حقوق المالك والمستأجر والتحكيم العادل.',
              'All communications are logged for dispute arbitration and user protection.'
            )}
          </span>
        </div>

        {/* Message Feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-xs'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs shadow-xs'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1 flex items-center gap-1">
                {msg.timestamp}
                {msg.sender === 'user' && <CheckCheck className="w-3 h-3 text-emerald-600" />}
              </span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 italic">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              <span>{t('فريق الدعم يكتب رداً...', 'Support agent is typing...')}</span>
            </div>
          )}
        </div>

        {/* Quick Question Chips */}
        <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px] text-slate-600">
          <button
            onClick={() => setInputText(t('كيف يتم استرجاع مبلغ التأمين؟', 'How is the security deposit refunded?'))}
            className="px-2 py-1 rounded-full bg-slate-100 hover:bg-slate-200 whitespace-nowrap transition cursor-pointer"
          >
            {t('استرجاع التأمين؟', 'Deposit refund?')}
          </button>
          <button
            onClick={() => setInputText(t('متى يصل مندوب الشحن للاستلام؟', 'When does the courier arrive for pickup?'))}
            className="px-2 py-1 rounded-full bg-slate-100 hover:bg-slate-200 whitespace-nowrap transition cursor-pointer"
          >
            {t('موعد مندوب الشحن؟', 'Courier arrival?')}
          </button>
          <button
            onClick={() => setInputText(t('ماذا يحدث لو وجد عيب بالمنتج؟', 'What happens if the item is damaged?'))}
            className="px-2 py-1 rounded-full bg-slate-100 hover:bg-slate-200 whitespace-nowrap transition cursor-pointer"
          >
            {t('تلفيات ونزاعات؟', 'Dispute policy?')}
          </button>
        </div>

        {/* Input Footer */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t('اكتب استفسارك لفريق الدعم المباشر...', 'Type your question for support...')}
            className="flex-1 bg-slate-100 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition active:scale-95 cursor-pointer shrink-0"
          >
            <Send className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
          </button>
        </form>
      </div>
    </div>
  );
};
