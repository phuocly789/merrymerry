
import React, { useState, useEffect } from 'react';
import { AppState } from './types';
import Snowfall from './components/Snowfall';
import ChristmasTree from './components/ChristmasTree';
import LoadingScreen from './components/LoadingScreen';
import { generateChristmasWish } from './services/geminiService';
import { Send, CheckCircle2, Loader2, Settings } from 'lucide-react';
import emailjs from '@emailjs/browser';

const App: React.FC = () => {
  const [isSenderMode, setIsSenderMode] = useState(false);
  const [appState, setAppState] = useState<AppState>(AppState.INITIAL_LOADING);
  const [emailsRaw, setEmailsRaw] = useState('');
  const [name, setName] = useState('');
  const [customUrl, setCustomUrl] = useState('https://merrymerry-two.vercel.app/'); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [showPreview, setShowPreview] = useState(false);

  // EmailJS Configuration
  const EMAILJS_SERVICE_ID = 'service_judgzwr'; 
  const EMAILJS_TEMPLATE_ID = 'template_7alaztw'; 
  const EMAILJS_PUBLIC_KEY = 'i2DbkgoG6XJRD74OG'; 

  useEffect(() => {
    // Giả lập tải tài nguyên trong 3 giây để hiệu ứng loading mượt mà
    const loadTimer = setTimeout(() => {
      setAppState(AppState.LANDING);
    }, 3500);

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mode') === 'sender') {
      setIsSenderMode(true);
    }
    
    const currentOrigin = window.location.origin;
    if (!currentOrigin.includes('localhost') && currentOrigin.startsWith('http')) {
      setCustomUrl(currentOrigin);
    }

    return () => clearTimeout(loadTimer);
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
    setAppState(AppState.SENDING);
    
    const cleanUrl = customUrl.endsWith('/') ? customUrl.slice(0, -1) : customUrl;
    const giftLink = cleanUrl;

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
        if (i < emailList.length - 1) await new Promise(r => setTimeout(r, 1200));
      }
      setAppState(AppState.SENT_SUCCESS);
    } catch (err: any) {
      setError(`Lỗi: ${err?.text || "Kiểm tra EmailJS"}`);
      setAppState(AppState.LANDING);
    } finally {
      setLoading(false);
    }
  };

  if (appState === AppState.INITIAL_LOADING) {
    return <LoadingScreen />;
  }

  if (!isSenderMode) {
    return (
      <div className="bg-[#020617] min-h-screen overflow-hidden">
        <Snowfall />
        <ChristmasTree />
      </div>
    );
  }

  return (
    <div className="bg-[#020617] text-gray-100 min-h-screen overflow-x-hidden relative">
      <Snowfall />
      
      {appState === AppState.LANDING && (
        <div className="min-h-screen flex items-center justify-center px-4 py-16 relative z-10">
          <div className="bg-[#0f172a]/95 backdrop-blur-3xl p-8 md:p-14 rounded-[3rem] shadow-2xl w-full max-w-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-20"><Settings className="w-6 h-6" /></div>
            
            <div className="text-center mb-10">
                <div className="inline-block bg-red-600/20 p-4 rounded-2xl mb-4">
                    <Send className="w-8 h-8 text-red-500" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Bảng Điều Khiển Gửi Quà</h1>
                <p className="text-gray-500 text-xs uppercase tracking-[0.3em]">Hệ thống gửi lời chúc độc quyền - LMP</p>
            </div>

            {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6 text-sm">{error}</div>}

            <form onSubmit={handleSend} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 uppercase ml-2">Tên người nhận</label>
                        <input
                            type="text"
                            placeholder="Tên..."
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-red-500 outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] text-gray-500 uppercase ml-2">Domain Deploy</label>
                        <input
                            type="text"
                            value={customUrl}
                            onChange={(e) => setCustomUrl(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-blue-400 font-mono text-xs focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] text-gray-500 uppercase ml-2">Danh sách Email (cách nhau bởi dấu phẩy)</label>
                    <textarea
                        placeholder="email@gmail.com..."
                        required
                        rows={4}
                        value={emailsRaw}
                        onChange={(e) => setEmailsRaw(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-red-500 outline-none transition-all resize-none text-sm"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-red-900/20"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5" /> Bắt Đầu Gửi Thư</>}
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowPreview(!showPreview)}
                        className="text-gray-500 text-[10px] uppercase py-2 hover:text-white transition-colors"
                    >
                        {showPreview ? "Ẩn xem trước" : "Xem trước nội dung mail"}
                    </button>
                </div>
            </form>

            {showPreview && (
                <div className="mt-6 border-t border-white/5 pt-6 animate-in fade-in slide-in-from-top-4">
                    <div className="max-h-60 overflow-auto rounded-xl bg-black/40 p-4 text-[10px]" dangerouslySetInnerHTML={{ __html: generateChristmasWish(name || "Người nhận", customUrl) }} />
                </div>
            )}
          </div>
        </div>
      )}

      {appState === AppState.SENDING && (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
            <Loader2 className="w-16 h-16 text-red-500 animate-spin mb-6" />
            <h2 className="text-2xl font-bold mb-2">Đang gửi phép màu...</h2>
            <p className="text-gray-500 text-sm">Thư {progress.current} / {progress.total}</p>
            <div className="w-48 h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-red-600 transition-all duration-500" style={{width: `${(progress.current/progress.total)*100}%`}}></div>
            </div>
        </div>
      )}

      {appState === AppState.SENT_SUCCESS && (
        <div className="min-h-screen flex items-center justify-center p-6 text-center">
            <div className="bg-[#0f172a] p-12 rounded-[3rem] border border-white/10 shadow-2xl">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4">Hoàn Tất!</h2>
                <p className="text-gray-400 mb-8">Tất cả lời chúc đã được gửi đi thành công.</p>
                <button onClick={() => setAppState(AppState.LANDING)} className="bg-white text-black px-8 py-3 rounded-xl font-bold">Quay Lại</button>
            </div>
        </div>
      )}
    </div>
  );
};

export default App;
