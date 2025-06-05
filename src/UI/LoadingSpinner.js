import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'kenya-green', 
  text = null, 
  className = '',
  overlay = false 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  };

  const colorClasses = {
    'kenya-green': 'border-green-600',
    'kenya-red': 'border-red-600',
    'kenya-black': 'border-black',
    white: 'border-white',
    gray: 'border-gray-600'
  };

  const spinnerComponent = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`
          ${sizeClasses[size]} 
          border-4 
          ${colorClasses[color]} 
          border-t-transparent 
          border-solid 
          rounded-full 
          animate-spin
        `}
        role="status"
        aria-label="Loading"
      />
      {text && (
        <p className={`mt-2 text-sm text-gray-600 ${size === 'small' ? 'text-xs' : 'text-sm'}`}>
          {text}
        </p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 shadow-xl">
          {spinnerComponent}
        </div>
      </div>
    );
  }

  return spinnerComponent;
};

// Kenyan Flag Spinner Variant
export const KenyanFlagSpinner = ({ size = 'medium', text = null }) => {
  const sizeClasses = {
    small: 'w-8 h-6',
    medium: 'w-12 h-9',
    large: 'w-16 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`${sizeClasses[size]} relative overflow-hidden rounded animate-pulse`}>
        <div className="absolute top-0 left-0 w-full h-1/3 bg-black"></div>
        <div className="absolute top-1/3 left-0 w-full h-1/3 bg-red-600"></div>
        <div className="absolute top-2/3 left-0 w-full h-1/3 bg-green-600"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
      {text && (
        <p className="mt-2 text-sm text-gray-600">{text}</p>
      )}
    </div>
  );
};

// Skeleton Loader for cards and content
export const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  const CardSkeleton = () => (
    <div className="bg-white p-4 rounded shadow animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-8 bg-gray-200 rounded w-1/2 mb-3"></div>
      <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
    </div>
  );

  const TableSkeleton = () => (
    <div className="bg-white rounded shadow animate-pulse">
      <div className="p-4 border-b">
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="p-4 border-b border-gray-100 flex space-x-4">
          <div className="h-4 bg-gray-200 rounded flex-1"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
      ))}
    </div>
  );

  const ChartSkeleton = () => (
    <div className="bg-white p-4 rounded shadow animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="h-64 bg-gray-200 rounded"></div>
    </div>
  );

  const skeletonTypes = {
    card: CardSkeleton,
    table: TableSkeleton,
    chart: ChartSkeleton
  };

  const SkeletonComponent = skeletonTypes[type] || CardSkeleton;

  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, index) => (
        <SkeletonComponent key={index} />
      ))}
    </div>
  );
};

export default LoadingSpinner;