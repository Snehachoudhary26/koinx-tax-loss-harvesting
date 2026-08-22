import React from 'react';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="animate-pulse space-y-6 max-w-7xl mx-auto px-4 py-8">
      {/* Top Header skeleton */}
      <div className="h-10 bg-slate-200 rounded-xl w-1/3"></div>

      {/* Two Cards skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-64 bg-slate-200 rounded-2xl"></div>
        <div className="h-64 bg-slate-200 rounded-2xl"></div>
      </div>

      {/* Table skeleton */}
      <div className="h-96 bg-slate-200 rounded-2xl"></div>
    </div>
  );
};
