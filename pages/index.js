import { useState, useEffect } from 'react';
import { ChevronRight, Zap, History, User, Home as HomeIcon, Gift } from 'lucide-react';

export default function Home() {
  const [operator, setOperator] = useState(null);
  const [category, setCategory] = useState('Data');

  return (
    <div className="bg-[#F6F7FB] min-h-screen pb-24 font-sans text-gray-800">
      
      {/* Header - Profile & Notifications */}
      <div className="p-5 flex justify-between items-center bg-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 overflow-hidden border-2 border-white shadow-sm">
            <img src="https://i.pravatar.cc/150" alt="profile" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">01300918450</p>
            <h2 className="font-bold text-sm">Nasir Bin Borhan</h2>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="p-2 bg-gray-50 rounded-full shadow-sm"><Zap size={18} className="text-orange-500" /></div>
          <div className="p-2 bg-gray-50 rounded-full shadow-sm"><User size={18} className="text-blue-500" /></div>
        </div>
      </div>

      {/* Main Balance Card - Premium Gradient */}
      <div className="p-5">
        <div className="bg-gradient-to-br from-[#5D5FEF] to-[#A5A6F6] p-6 rounded-[30px] shadow-xl text-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="opacity-80 text-sm mb-1 font-medium text-blue-100">My Balance</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">৳</span>
              <span className="text-4xl font-extrabold tracking-tight">135.00</span>
            </div>
            <p className="text-[10px] mt-4 bg-white/20 w-max px-2 py-1 rounded-full">Expires on 25 Sep 2025</p>
          </div>
          {/* Decorative Circles */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full"></div>
          <div className="absolute right-5 top-5 w-12 h-12 border-4 border-white/10 rounded-full"></div>
        </div>
      </div>

      {/* Quick Actions / Operators */}
      <div className="px-5 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-md">সিম অপারেটর সিলেক্ট করুন</h3>
          <span className="text-xs text-blue-600 font-bold">More</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {['GP', 'Robi', 'Banglalink', 'Airtel'].map((op) => (
            <button key={op} onClick={() => setOperator(op)} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-gray-50">
                <span className="font-black text-blue-600 italic text-xs">{op}</span>
              </div>
              <span className="text-[10px] font-bold text-gray-500">{op} প্যাক</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Package - Premium Card Layout */}
      <div className="px-5 mb-6">
        <div className="bg-white p-4 rounded-3xl shadow-sm flex items-center gap-4 border border-gray-100">
          <div className="bg-orange-100 p-3 rounded-2xl">
            <Gift className="text-orange-500" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-sm">স্পেশাল ইন্টারনেট অফার</h4>
            <p className="text-xs text-gray-400">আপনার সিমের জন্য সেরা অফার দেখুন</p>
          </div>
          <ChevronRight className="text-gray-300" />
        </div>
      </div>

      {/* Category Pills */}
      <div className="px-5 flex gap-3 overflow-x-auto no-scrollbar mb-6">
        {['Data', 'Minute', 'SMS', 'Bundle'].map(cat => (
          <button 
            key={cat} 
            onClick={() => setCategory(cat)}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${category === cat ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-400 border border-gray-100'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Offers Grid */}
      <div className="px-5 grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white p-4 rounded-[25px] shadow-sm border border-gray-50 flex flex-col justify-between h-48">
             <div>
               <div className="bg-blue-50 w-max px-2 py-1 rounded-md mb-2">
                 <span className="text-[10px] font-bold text-blue-600 italic">GP Premium</span>
               </div>
               <h5 className="font-bold text-sm">10GB Data</h5>
               <p className="text-[10px] text-gray-400 mt-1">Validity: 7 Days</p>
             </div>
             <div className="flex justify-between items-end">
               <span className="text-xl font-black text-gray-800">৳89</span>
               <button className="bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] text-white px-4 py-2 rounded-xl text-[10px] font-bold shadow-md">BUY</button>
             </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation - Fixed */}
      <div className="fixed bottom-6 left-5 right-5 h-16 bg-white/80 backdrop-blur-md rounded-[25px] shadow-2xl border border-white/50 flex justify-around items-center px-4 z-50">
        <div className="flex flex-col items-center text-blue-600">
          <HomeIcon size={20} />
          <span className="text-[8px] font-bold mt-1 uppercase tracking-widest">Home</span>
        </div>
        <div className="flex flex-col items-center text-gray-300">
          <Gift size={20} />
          <span className="text-[8px] font-bold mt-1 uppercase tracking-widest">Offers</span>
        </div>
        <div className="w-14 h-14 bg-gradient-to-tr from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg -mt-10 border-4 border-[#F6F7FB]">
          <Zap size={24} />
        </div>
        <div className="flex flex-col items-center text-gray-300">
          <History size={20} />
          <span className="text-[8px] font-bold mt-1 uppercase tracking-widest">History</span>
        </div>
        <div className="flex flex-col items-center text-gray-300">
          <User size={20} />
          <span className="text-[8px] font-bold mt-1 uppercase tracking-widest">Account</span>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
