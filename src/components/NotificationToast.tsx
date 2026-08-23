import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface NotificationToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  message,
  type = 'info',
  onClose,
}) => {
  let bgColors = 'bg-slate-900 text-white border-slate-800';
  let icon = <Info className="w-4 h-4 text-indigo-400" />;

  if (type === 'success') {
    bgColors = 'bg-emerald-950 text-emerald-100 border-emerald-800';
    icon = <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
  } else if (type === 'error') {
    bgColors = 'bg-rose-950 text-rose-100 border-rose-800';
    icon = <AlertCircle className="w-4 h-4 text-rose-400" />;
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl border shadow-2xl flex items-center space-x-3 text-xs font-semibold max-w-md animate-slideUp ${bgColors}`}>
      {icon}
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="p-1 hover:opacity-80 transition-opacity">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
