interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner = ({ 
  message = "Carregando...", 
  size = 'md' 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16',
    lg: 'h-24 w-24',
  };

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative mb-4">
        <div className={`animate-spin rounded-full border-t-4 border-b-4 border-red-600 ${sizeClasses[size]}`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-2xl">🎬</div>
        </div>
      </div>
      {message && (
        <p className="text-gray-400 text-lg">{message}</p>
      )}
    </div>
  );
};

