import React from 'react';

const CustomersLoading = () => {
  return (
    <div className="w-full min-h-screen bg-neutral-950 px-4 sm:px-8 md:pl-64 md:pr-8 pb-12 select-none animate-pulse">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-8 pb-6 border-b border-neutral-900">
        <div className="space-y-2 w-full sm:w-auto">
          <div className="h-8 bg-neutral-900 rounded-xl w-36" />
          <div className="h-4 bg-neutral-900 rounded-lg w-64 hidden sm:block" />
        </div>
        <div className="h-10 bg-neutral-900 rounded-xl w-full sm:w-36 self-stretch sm:self-auto" />
      </div>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className="h-24 bg-neutral-900/40 border border-neutral-900/80 rounded-2xl p-4 flex flex-col justify-between"
          >
            <div className="h-4 bg-neutral-900 rounded-md w-16" />
            <div className="h-6 bg-neutral-900 rounded-lg w-24 mt-2" />
          </div>
        ))}
      </div> */}

      <div className="mt-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="h-11 bg-neutral-900 rounded-xl w-full md:w-96" />
        <div className="h-11 bg-neutral-900 rounded-xl w-full md:w-64" />
      </div>

      <div className="mt-6 border border-neutral-900 bg-neutral-900/10 rounded-2xl overflow-hidden">
        
        <div className="flex items-center justify-between p-4 pl-6 pr-6 border-b border-neutral-900 bg-neutral-950/40">
          <div className="h-3 bg-neutral-900 rounded w-16" />
          <div className="h-3 bg-neutral-900 rounded w-32 hidden lg:block" />
          <div className="h-3 bg-neutral-900 rounded w-14" />
          <div className="h-3 bg-neutral-900 rounded w-12" />
        </div>

        <div className="p-4 pl-6 pr-6 divide-y divide-neutral-900/40">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center justify-between py-4 first:pt-2 last:pb-2">
              <div className="h-4 bg-neutral-900 rounded-md w-28 sm:w-36" />
              
              <div className="h-4 bg-neutral-900 rounded-md w-48 hidden lg:block" />
              
              <div className="h-6 bg-neutral-900 rounded-xl w-16" />
              
              <div className="h-4 bg-neutral-900 rounded-md w-4" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default CustomersLoading;