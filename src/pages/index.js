import { useState } from 'react';

export default function Home({ user }) {
  const [selectedOperator, setSelectedOperator] = useState(null);

  const operators = [
    { name: 'GP', logo: '/gp.png' },
    { name: 'Robi', logo: '/robi.png' },
    { name: 'Banglalink', logo: '/bl.png' },
    { name: 'Airtel', logo: '/airtel.png' }
  ];

  return (
    <div className="bg-gray-100 min-h-screen pb-20">
      {/* ব্যালেন্স কার্ড */}
      <div className="bg-blue-600 p-6 rounded-b-3xl text-white">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-80">আমার ব্যালেন্স</p>
            <h1 className="text-3xl font-bold">৳ {user?.balance || 0}</h1>
          </div>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-full font-bold">Add Money</button>
        </div>
      </div>

      {/* অপারেটর সিলেকশন */}
      <div className="p-4 grid grid-cols-4 gap-4 mt-4">
        {operators.map(op => (
          <div key={op.name} onClick={() => setSelectedOperator(op.name)} 
            className="bg-white p-2 rounded-xl shadow text-center cursor-pointer">
            <img src={op.logo} className="w-12 h-12 mx-auto" />
            <p className="text-xs mt-1">{op.name}</p>
          </div>
        ))}
      </div>

      {/* ক্যাটাগরি ও অফার লিস্ট (অপারেটর সিলেক্ট করলে দেখাবে) */}
      {selectedOperator && (
        <div className="p-4">
          <h2 className="font-bold text-lg mb-4">{selectedOperator} এর অফার সমূহ</h2>
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {['MB', 'Minute', 'SMS', 'Bundle'].map(cat => (
              <button key={cat} className="bg-blue-100 px-4 py-1 rounded-full text-blue-600">{cat}</button>
            ))}
          </div>
          {/* অফার কার্ড স্টাইল */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border-l-4 border-orange-500 flex justify-between">
            <div>
              <h3 className="font-bold">৫ জিবি ইন্টারনেট</h3>
              <p className="text-sm text-gray-500">মেয়াদ: ৭ দিন</p>
            </div>
            <div className="text-right">
              <p className="text-blue-600 font-bold text-xl">৳৮৯</p>
              <button className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm">কিনুন</button>
            </div>
          </div>
        </div>
      )}

      {/* বটম নেভিগেশন */}
      <div className="fixed bottom-0 w-full bg-white border-t flex justify-around p-3 text-gray-500">
         <div className="text-center"><span>Home</span></div>
         <div className="text-center"><span>Offers</span></div>
         <div className="text-center font-bold text-blue-600"><span>History</span></div>
         <div className="text-center"><span>Profile</span></div>
      </div>
    </div>
  );
}
