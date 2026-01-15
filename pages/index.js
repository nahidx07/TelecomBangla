import { useState } from 'react';
import { Search, Bell, Zap, Home, Gift, History, User, Globe, Phone, Mail } from 'lucide-react';

export default function OffersPage() {
  const [activeTab, setActiveTab] = useState('Data');

  const categories = [
    { name: 'My Offer', icon: <Zap size={18}/> },
    { name: 'Data', icon: <Globe size={18}/> },
    { name: 'Minute', icon: <Phone size={18}/> },
    { name: 'SMS', icon: <Mail size={18}/> },
  ];

  return (
    <div className="bg-[#F8F9FE] min-h-screen pb-28 font-sans text-[#2D3142]">
      {/* Header */}
      <div className="p-5 flex justify-between items-center bg-white shadow-sm sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <img src="https://i.pravatar.cc/100" className="w-10 h-10 rounded-full border-2 border-indigo-100 shadow-sm" />
          <div>
            <h2 className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">01300918450</h2>
            <p className="text-sm font-black">Nasir Bin Borhan</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="p-2 bg-gray-50 rounded-xl text-gray-400"><Bell size={20} /></div>
          <div className="p-2 bg-gray-50 rounded-xl text-gray-400"><Search size={20} /></div>
        </div>
      </div>

      {/* Category Selection */}
      <div className="p-5 grid grid-cols-4 gap-3">
        {categories.map((cat) => (
          <div key={cat.name} onClick={() => setActiveTab(cat.name)} 
            className="flex flex-col items-center gap-2 group cursor-pointer">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-sm
              ${activeTab === cat.name ? 'bg-indigo-600 text-white scale-105' : 'bg-white text-indigo-400 border border-indigo-50'}`}>
              {cat.icon}
            </div>
            <span className={`text-[10px] font-bold ${activeTab === cat.name ? 'text-indigo-600' : 'text-gray-400'}`}>{cat.name}</span>
          </div>
        ))}
      </div>

      {/* Offers Grid */}
      <div className="px-5 grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-4 rounded-[25px] shadow-sm border border-indigo-50 relative overflow-hidden">
            <div className="flex items-center gap-2 text-indigo-500 mb-2">
              <Globe size={14} />
              <span className="text-[11px] font-bold">4 GB + 500 MB</span>
            </div>
            <p className="text-[10px] text-gray-400 mb-4 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span> 7 Days Validity
            </p>
            <button className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white text-[11px] font-black py-2 rounded-xl shadow-md">
              USD 8.21
            </button>
          </div>
        ))}
      </div>

      {/* Promo Banner */}
      <div className="p-5 mt-2">
        <div className="bg-gradient-to-br from-[#5D5FEF] to-[#8C8DFF] rounded-[30px] p-6 text-white relative flex items-center overflow-hidden h-36 shadow-xl">
           <div className="z-10 w-2/3">
              <p className="text-[10px] font-bold opacity-80 uppercase">Free Pack</p>
              <h3 className="text-2xl font-black">1.5GB</h3>
              <p className="text-[10px] opacity-70">New Sim Offer Activate Now</p>
           </div>
           <img src="https://www.pngall.com/wp-content/uploads/5/Attractive-Model-Man-PNG.png" className="absolute -right-5 -bottom-2 h-40 object-contain drop-shadow-2xl" />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-6 left-6 right-6 h-18 bg-white/90 backdrop-blur-xl rounded-[30px] shadow-2xl flex justify-between items-center px-8 border border-white/50 z-50">
        <div className="flex flex-col items-center text-indigo-600"><Home size={22}/><span className="text-[8px] font-bold mt-1">HOME</span></div>
        <div className="flex flex-col items-center text-gray-300"><Gift size={22}/><span className="text-[8px] font-bold mt-1 uppercase">Offers</span></div>
        
        {/* Recharge Button */}
        <div className="w-14 h-14 bg-gradient-to-tr from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg -mt-12 border-4 border-[#F8F9FE]">
          <Zap size={24} fill="currentColor" />
        </div>

        <div className="flex flex-col items-center text-gray-300"><History size={22}/><span className="text-[8px] font-bold mt-1 uppercase">History</span></div>
        <div className="flex flex-col items-center text-gray-300"><User size={22}/><span className="text-[8px] font-bold mt-1 uppercase">Account</span></div>
      </div>
    </div>
  );
}
