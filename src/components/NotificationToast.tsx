import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface NotificationToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  message,
  type = 'info',
  onClose,
  duration = 4000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  let icon = <Info className="w-4 h-4 text-[#588157]" />;
  let style = 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-800 dark:border-stone-200';

  if (type === 'success') {
    icon = <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
  } else if (type === 'error') {
    icon = <AlertCircle className="w-4 h-4 text-rose-400" />;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fadeIn">
      <div className={`flex items-center space-x-3 px-4 py-3 rounded-xl border shadow-lg text-xs font-semibold max-w-md ${style}`}>
        {icon}
        <span className="flex-1">{message}</span>
        <button onClick={onClose} className="opacity-70 hover:opacity-100 transition-opacity">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
