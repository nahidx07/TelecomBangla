import { ChevronRight, Package, UserCircle, Settings, BellRing, Music, Users, LogOut } from 'lucide-react';

export default function AccountPage() {
  const menu = [
    { name: 'My Package', icon: <Package size={18} className="text-pink-500"/> },
    { name: 'Account Details', icon: <UserCircle size={18} className="text-blue-500"/> },
    { name: 'Settings', icon: <Settings size={18} className="text-indigo-500"/> },
    { name: 'Missed call Alert', icon: <BellRing size={18} className="text-blue-400"/> },
    { name: 'Welcome Tune', icon: <Music size={18} className="text-indigo-400"/> },
    { name: 'FnF', icon: <Users size={18} className="text-pink-400"/> },
  ];

  return (
    <div className="bg-[#F8F9FE] min-h-screen pb-32">
       {/* Profile Header */}
       <div className="bg-white p-5 flex justify-between items-center sticky top-0 z-10">
          <span className="font-bold text-gray-400">9:41</span>
          <div className="flex gap-2">
            <BellRing size={18} className="text-gray-300"/>
            <LogOut size={18} className="text-red-400"/>
          </div>
       </div>

       {/* Profile Card */}
       <div className="p-5">
          <div className="bg-gradient-to-br from-[#5D5FEF] to-[#7173FF] rounded-[30px] p-6 text-white flex items-center gap-5 shadow-xl shadow-indigo-100 relative overflow-hidden">
             <div className="w-20 h-20 rounded-full border-4 border-white/20 p-1 relative z-10">
                <img src="https://i.pravatar.cc/150" className="rounded-full w-full h-full object-cover" />
                <div className="absolute -right-1 -top-1 bg-white p-1 rounded-full text-indigo-600 shadow-md">
                   <Settings size={12} fill="currentColor"/>
                </div>
             </div>
             <div className="z-10">
                <h3 className="text-lg font-black leading-tight">Nasir Bin Borhan</h3>
                <p className="text-[11px] opacity-80 mt-1">01300918450</p>
                <div className="bg-white/20 backdrop-blur-md px-3 py-0.5 rounded-full mt-2 w-max border border-white/10">
                   <span className="text-[9px] font-bold uppercase tracking-widest">Elite Customer 👑</span>
                </div>
             </div>
             <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/5 rounded-full"></div>
          </div>
       </div>

       {/* Menu List */}
       <div className="px-5 space-y-3">
          {menu.map(item => (
            <div key={item.name} className="bg-white p-4 rounded-[25px] flex justify-between items-center shadow-sm border border-indigo-50/50">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center">
                     {item.icon}
                  </div>
                  <span className="text-sm font-bold text-gray-700">{item.name}</span>
               </div>
               <ChevronRight size={18} className="text-gray-300" />
            </div>
          ))}
       </div>
    </div>
  );
}
