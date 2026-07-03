"use client";

import React from 'react';

const HomeLoading = () => {
  return (
    <div className="w-full min-h-screen bg-neutral-950 px-4 sm:px-8 md:pl-64 md:pr-8 pb-12 select-none animate-pulse">
      
      {/* Top Banner Context / Greeting Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-8 pb-6 border-b border-neutral-900">
        <div className="space-y-2 w-full sm:w-auto">
          {/* Mock Main Title Heading */}
          <div className="h-8 bg-neutral-900 rounded-xl w-48" />
          {/* Mock Subtitle Context String */}
          <div className="h-4 bg-neutral-900 rounded-lg w-64 hidden sm:block" />
        </div>
        {/* Right Filter Controls / Date Picker Placeholder */}
        <div className="h-9 bg-neutral-900 rounded-xl w-full sm:w-44 self-stretch sm:self-auto" />
      </div>

      {/* Top Level Metric Analytics Cards Grid Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className="h-24 bg-neutral-900/40 border border-neutral-900/80 rounded-2xl p-4 flex flex-col justify-between"
          >
            <div className="h-4 bg-neutral-900 rounded-md w-16" />
            <div className="h-6 bg-neutral-900 rounded-lg w-28 mt-2" />
          </div>
        ))}
      </div>

      {/* Asymmetric Dashboard Body Blocks Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 w-full">
        
        {/* Large Complex Chart Area (Spans 2 Columns on Large Screens) */}
        <div className="lg:col-span-2 border border-neutral-900 bg-neutral-900/10 rounded-2xl p-6 h-96 flex flex-col justify-between">
          <div className="flex items-center justify-between w-full">
            <div className="h-5 bg-neutral-900 rounded-lg w-32" />
            <div className="h-8 bg-neutral-900 rounded-lg w-24" />
          </div>
          {/* Simulated Analytical Graph Intersecting Vectors */}
          <div className="w-full flex-1 mt-6 bg-neutral-900/40 rounded-xl flex items-end p-4 gap-3">
            {[...Array(6)].map((_, idx) => (
              <div 
                key={idx} 
                className="bg-neutral-900/80 w-full rounded-t-lg transition-all" 
                style={{ height: `${(idx + 1) * 15}%` }} 
              />
            ))}
          </div>
        </div>

        {/* Small Active Stream Feed Area (Spans 1 Column) */}
        <div className="lg:col-span-1 border border-neutral-900 bg-neutral-900/10 rounded-2xl p-6 h-96 flex flex-col">
          <div className="h-5 bg-neutral-900 rounded-lg w-28 mb-6" />
          
          {/* Side Panel Item Rows Mockups */}
          <div className="flex flex-col flex-1 divide-y divide-neutral-900/50">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-neutral-900" />
                  <div className="space-y-1.5">
                    <div className="h-3.5 bg-neutral-900 rounded-md w-24" />
                    <div className="h-2.5 bg-neutral-900/60 rounded w-16" />
                  </div>
                </div>
                <div className="h-3 bg-neutral-900 rounded w-10" />
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default HomeLoading;