
import React, { useState, useEffect } from 'react';
import { AppState } from './types';
import Snowfall from './components/Snowfall';
import ChristmasTree from './components/ChristmasTree';
import { generateChristmasWish } from './services/geminiService';
import { Mail, Send, Heart, Sparkles, Gift, ExternalLink, ArrowRight, CheckCircle2, Loader2, Eye, Globe, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [emailsRaw, setEmailsRaw] = useState('');
  const [name, setName] = useState('');
  const [customUrl, setCustomUrl] = useState('https://lmp.id.vn');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [showPreview, setShowPreview] = useState(false);

  // EmailJS Configuration
  const EMAILJS_SERVICE_ID = 'service_judgzwr';
  const EMAILJS_TEMPLATE_ID = 'template_7alaztw';
  const EMAILJS_PUBLIC_KEY = 'i2DbkgoG6XJRD74OG';

  useEffect(() => {
    // Kiểm tra nếu người dùng truy cập từ link quà tặng
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('gift') === 'true') {
      setAppState(AppState.SHOW_TREE);
    }

    // Nếu không chạy trên lmp.id.vn (đang test ở localhost), vẫn giữ mặc định lmp.id.vn để gửi mail chuẩn
    const currentPath = window.location.origin;
    if (!currentPath.includes('localhost') && !currentPath.includes('lmp.id.vn')) {
      setCustomUrl(currentPath);
    }
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailsRaw || !name || !customUrl) return;

    const emailList = emailsRaw
      .split(/[,\s\n]+/)
      .map(email => email.trim())
      .filter(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

    if (emailList.length === 0) {
      setError("Vui lòng nhập ít nhất một địa chỉ Email hợp lệ.");
      return;
    }

    setLoading(true);
    setError(null);
    setProgress({ current: 0, total: emailList.length });
    setAppState(AppState.SENDING);

    const cleanUrl = customUrl.endsWith('/') ? customUrl.slice(0, -1) : customUrl;
    const giftLink = `${cleanUrl}?gift=true`;

    try {
      for (let i = 0; i < emailList.length; i++) {
        const currentEmail = emailList[i];
        setProgress({ current: i + 1, total: emailList.length });

        const htmlMessage = generateChristmasWish(name, giftLink);

        const templateParams = {
          to_name: name,
          to_email: currentEmail,
          message: htmlMessage,
        };

        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
        // Tránh bị spam filter
        if (i < emailList.length - 1) await new Promise(r => setTimeout(r, 1200));
      }
      setAppState(AppState.SENT_SUCCESS);
    } catch (err: any) {
      console.error("EmailJS Error:", err);
      setError(`Lỗi gửi mail: ${err?.text || "Vui lòng kiểm tra lại tài khoản EmailJS của bạn."}`);
      setAppState(AppState.LANDING);
    } finally {
      setLoading(false);
    }
  };

  const renderLanding = () => (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 relative z-10">
      <div className="bg-[#0f172a]/90 backdrop-blur-3xl p-8 md:p-14 rounded-[3.5rem] shadow-[0_0_100px_rgba(239,68,68,0.15)] w-full max-w-2xl border border-white/10 text-center relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-600/20 blur-[100px] rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full"></div>

        <div className="relative z-10">
          <div className="mb-6 flex justify-center">
            <div className="bg-gradient-to-br from-red-600 to-rose-500 p-6 rounded-[2rem] shadow-2xl transform hover:scale-110 transition-transform duration-500">
              <Heart className="w-10 h-10 text-white fill-current" />
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl font-cursive text-white mb-2 tracking-tight">Giáng Sinh Diệu Kỳ</h2>
          <p className="text-gray-400 mb-8 text-lg font-light tracking-widest uppercase text-[10px]">
            Created with Love by <span className="text-red-500 font-bold">LMP</span>
          </p>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-8 flex items-center gap-4 text-left group hover:bg-white/10 transition-colors">
            <div className="bg-blue-500/20 p-2 rounded-xl">
              <Globe className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-bold">Web URL của bạn</p>
              <p className="text-sm text-blue-300 font-mono italic">{customUrl}</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-2xl mb-6 text-xs animate-bounce">
              {error}
            </div>
          )}

          <form onSubmit={handleSend} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-[9px] uppercase tracking-[0.3em] text-gray-500 ml-4">Gửi cho ai đó đặc biệt</label>
              <input
                type="text"
                placeholder="Nhập tên người nhận..."
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all text-lg"
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[9px] uppercase tracking-[0.3em] text-gray-500 ml-4">Danh sách địa chỉ Email</label>
              <textarea
                placeholder="Ví dụ: ban-than@gmail.com, nguoi-yeu@gmail.com"
                required
                rows={3}
                value={emailsRaw}
                onChange={(e) => setEmailsRaw(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all resize-none font-mono text-sm"
              />
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold py-6 rounded-2xl shadow-xl hover:shadow-red-500/40 transition-all flex items-center justify-center gap-3 transform active:scale-95 disabled:opacity-50 text-xl group overflow-hidden relative"
              >
                <span className="relative z-10 flex items-center gap-3">Gửi Quà Ngay <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>

              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="w-full bg-transparent hover:bg-white/5 text-gray-500 font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-[10px] tracking-widest uppercase border border-transparent hover:border-white/10"
              >
                <Eye className="w-3 h-3" /> {showPreview ? 'Đóng Xem Trước' : 'Xem Thử Thư Gửi Đi'}
              </button>
            </div>
          </form>

          {showPreview && (
            <div className="mt-8 p-1 bg-gradient-to-br from-red-500/20 to-blue-500/20 rounded-[2rem] animate-in fade-in zoom-in duration-500">
              <div className="bg-[#0f172a] rounded-[1.9rem] p-4 overflow-hidden">
                <div className="overflow-auto max-h-[350px] custom-scrollbar rounded-xl"
                  dangerouslySetInnerHTML={{ __html: generateChristmasWish(name || "[Tên]", customUrl + "?gift=true") }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderSending = () => (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-[#020617]">
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-red-500 rounded-full blur-[100px] opacity-20 animate-pulse scale-150"></div>
        <div className="relative bg-white/5 p-10 rounded-[3rem] border border-white/10 backdrop-blur-2xl">
          <Loader2 className="w-24 h-24 text-red-500 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Mail className="w-8 h-8 text-white animate-bounce" />
          </div>
        </div>
      </div>
      <h2 className="text-4xl text-white font-cursive mb-4">Phép màu đang được gửi...</h2>
      <div className="w-64 h-2 bg-white/5 rounded-full overflow-hidden mb-4 border border-white/5">
        <div
          className="h-full bg-gradient-to-r from-red-600 to-rose-400 transition-all duration-700 ease-out shadow-[0_0_15px_rgba(239,68,68,0.5)]"
          style={{ width: `${(progress.current / progress.total) * 100}%` }}
        ></div>
      </div>
      <p className="text-gray-500 text-[10px] tracking-[0.5em] uppercase">Đã xong {progress.current} / {progress.total}</p>
    </div>
  );

  const renderSuccess = () => (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="bg-[#0f172a]/95 backdrop-blur-3xl rounded-[3.5rem] shadow-2xl w-full max-w-2xl border border-white/10 text-center p-12 md:p-16 relative overflow-hidden animate-in zoom-in duration-700">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-red-500/10 blur-[100px] rounded-full"></div>

        <div className="w-24 h-24 bg-green-500/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 relative z-10 border border-green-500/20">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>

        <h2 className="text-5xl text-white font-cursive mb-4 relative z-10">Tất cả đã sẵn sàng!</h2>
        <p className="text-gray-400 mb-10 text-lg font-light italic relative z-10 leading-relaxed">
          Món quà tinh thần của bạn đã được gửi tới hòm thư của <span className="text-white font-bold">{name}</span>. <br />
          Chúc bạn một mùa Giáng Sinh thật ý nghĩa!
        </p>

        <div className="flex flex-col gap-4 relative z-10">
          <button
            onClick={() => setAppState(AppState.SHOW_TREE)}
            className="w-full bg-white text-gray-900 font-bold py-6 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 text-xl"
          >
            Xem Cây Thông Noel <ArrowRight className="w-6 h-6 text-red-600" />
          </button>
          <button
            onClick={() => setAppState(AppState.LANDING)}
            className="text-gray-500 text-[10px] uppercase tracking-[0.3em] hover:text-white transition-colors py-4"
          >
            Gửi thêm quà tặng khác
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#020617] text-gray-100 selection:bg-red-500/30 min-h-screen overflow-x-hidden">
      <Snowfall />
      {appState === AppState.LANDING && renderLanding()}
      {appState === AppState.SENDING && renderSending()}
      {appState === AppState.SENT_SUCCESS && renderSuccess()}
      {appState === AppState.SHOW_TREE && (
        <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <ChristmasTree />
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4 w-full px-6">
            <p className="text-white/40 text-[9px] uppercase tracking-[0.4em] animate-pulse">Trải nghiệm trên lmp.id.vn</p>
            <button
              onClick={() => {
                window.history.replaceState({}, '', window.location.pathname);
                setAppState(AppState.LANDING);
              }}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-xl px-12 py-5 rounded-full border border-white/20 text-[10px] font-bold tracking-[0.3em] transition-all uppercase flex items-center gap-3 shadow-2xl hover:scale-110 active:scale-95"
            >
              Quay Lại Trang Chủ <ExternalLink className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default App;
