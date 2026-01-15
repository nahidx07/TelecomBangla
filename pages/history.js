import { Clock, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

export default function HistoryPage() {
  const transactions = [
    { id: 1, type: 'Add Money', amount: '৳500', status: 'Success', date: 'Oct 12' },
    { id: 2, type: '10GB Pack', amount: '৳89', status: 'Pending', date: 'Oct 13' },
    { id: 3, type: 'Add Money', amount: '৳200', status: 'Canceled', date: 'Oct 10' },
  ];

  return (
    <div className="bg-[#F6F7FB] min-h-screen p-5">
      <div className="flex items-center gap-4 mb-8">
        <ArrowLeft className="text-gray-800" />
        <h1 className="text-xl font-bold">Transaction History</h1>
      </div>

      <div className="space-y-4">
        {transactions.map(item => (
          <div key={item.id} className="bg-white p-5 rounded-[25px] flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${item.status === 'Success' ? 'bg-green-100 text-green-500' : item.status === 'Pending' ? 'bg-orange-100 text-orange-500' : 'bg-red-100 text-red-500'}`}>
                {item.status === 'Success' ? <CheckCircle size={20}/> : item.status === 'Pending' ? <Clock size={20}/> : <XCircle size={20}/>}
              </div>
              <div>
                <h4 className="font-bold text-sm">{item.type}</h4>
                <p className="text-[10px] text-gray-400">{item.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-black text-gray-800">{item.amount}</p>
              <p className={`text-[9px] font-bold uppercase ${item.status === 'Success' ? 'text-green-500' : 'text-gray-400'}`}>{item.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
