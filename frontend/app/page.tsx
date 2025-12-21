"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [checkedItems, setCheckedItems] = useState({
    gloves: false,
    gown: false,
    mask: false,
  });

  const toggleCheck = (item: keyof typeof checkedItems) => {
    setCheckedItems(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const allChecked = Object.values(checkedItems).every(Boolean);

  return (
    <div className="h-screen bg-gray-50 p-6 flex flex-col overflow-hidden">
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-blue-600 to-blue-900 rounded-full px-8 py-5 mb-6 flex items-center relative max-w-full flex-shrink-0">
        <button className="text-white hover:opacity-80 transition-opacity">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2.5} 
            stroke="currentColor" 
            className="w-7 h-7"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-white text-3xl font-semibold">
          Vircards
        </h1>
      </nav>

      {/* Main Content */}
      <div className="flex gap-6 max-w-full flex-1 min-h-0">
        {/* Left Side - Image */}
        <div className="flex-1 min-h-0">
          <div className="rounded-3xl overflow-hidden shadow-lg bg-white h-full flex items-center justify-center relative">
            <Image
              src="/ppe-storage.png"
              alt="PPE Storage Room"
              width={700}
              height={500}
              priority
              className="w-full h-full object-contain"
            />
            
            {/* Interactive Hotspots */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Gloves Hotspot */}
              <button
                onClick={() => toggleCheck('gloves')}
                className="absolute pointer-events-auto transition-all duration-200 group"
                style={{ left: '15%', top: '35%', width: '20%', height: '25%' }}
              >
                <div className={`w-full h-full border-4 rounded-lg transition-all ${
                  checkedItems.gloves 
                    ? 'border-green-500 bg-green-500/30' 
                    : 'border-blue-400 bg-blue-400/20 group-hover:bg-blue-400/40'
                }`}>
                  {checkedItems.gloves && (
                    <div className="flex items-center justify-center h-full">
                      <svg className="w-12 h-12 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-3 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Nitrile Gloves
                </div>
              </button>

              {/* Gown Hotspot */}
              <button
                onClick={() => toggleCheck('gown')}
                className="absolute pointer-events-auto transition-all duration-200 group"
                style={{ left: '40%', top: '25%', width: '25%', height: '35%' }}
              >
                <div className={`w-full h-full border-4 rounded-lg transition-all ${
                  checkedItems.gown 
                    ? 'border-green-500 bg-green-500/30' 
                    : 'border-blue-400 bg-blue-400/20 group-hover:bg-blue-400/40'
                }`}>
                  {checkedItems.gown && (
                    <div className="flex items-center justify-center h-full">
                      <svg className="w-12 h-12 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-3 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Protective Gown
                </div>
              </button>

              {/* Mask Hotspot */}
              <button
                onClick={() => toggleCheck('mask')}
                className="absolute pointer-events-auto transition-all duration-200 group"
                style={{ left: '70%', top: '40%', width: '20%', height: '20%' }}
              >
                <div className={`w-full h-full border-4 rounded-lg transition-all ${
                  checkedItems.mask 
                    ? 'border-green-500 bg-green-500/30' 
                    : 'border-blue-400 bg-blue-400/20 group-hover:bg-blue-400/40'
                }`}>
                  {checkedItems.mask && (
                    <div className="flex items-center justify-center h-full">
                      <svg className="w-12 h-12 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-3 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Face Mask & Shield
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Info Panel */}
        <div className="w-[380px] bg-white rounded-3xl shadow-lg p-8 overflow-y-auto flex-shrink-0">
          {/* Header */}
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            PPE and Environment Setup
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            Before entering the morgue, you must wear proper personal protective equipment.
          </p>

          {/* Required Protocol Alert */}
          <div className="bg-red-50 border border-red-300 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <svg 
                  className="w-5 h-5 text-red-600" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-red-900 font-semibold text-sm mb-1">
                  Required Protocol
                </h3>
                <p className="text-red-800 text-xs leading-relaxed">
                  Standard precautions require full PPE for all postmortem examinations to protect against biological hazards.
                </p>
              </div>
            </div>
          </div>

          {/* PPE Checklist */}
          <div>
            <h3 className="text-gray-900 font-semibold text-base mb-4">
              Personal Protective Equipment:
            </h3>

            {/* Checklist Items */}
            <div className="space-y-3 mb-6">
              {/* Nitrile Gloves */}
              <div 
                className="flex items-start justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => toggleCheck('gloves')}
              >
                <div className="flex-1">
                  <h4 className="text-gray-900 font-medium text-sm mb-0.5">
                    Nitrile Gloves
                  </h4>
                  <p className="text-gray-500 text-xs">
                    Double-layered protection
                  </p>
                </div>
                <div className={`w-5 h-5 border-2 rounded ${
                  checkedItems.gloves 
                    ? 'bg-blue-600 border-blue-600' 
                    : 'border-gray-300'
                } flex items-center justify-center flex-shrink-0`}>
                  {checkedItems.gloves && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Protective Gown */}
              <div 
                className="flex items-start justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => toggleCheck('gown')}
              >
                <div className="flex-1">
                  <h4 className="text-gray-900 font-medium text-sm mb-0.5">
                    Protective Gown
                  </h4>
                  <p className="text-gray-500 text-xs">
                    Fluid-resistant Material
                  </p>
                </div>
                <div className={`w-5 h-5 border-2 rounded ${
                  checkedItems.gown 
                    ? 'bg-blue-600 border-blue-600' 
                    : 'border-gray-300'
                } flex items-center justify-center flex-shrink-0`}>
                  {checkedItems.gown && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Face Mask & Shield */}
              <div 
                className="flex items-start justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => toggleCheck('mask')}
              >
                <div className="flex-1">
                  <h4 className="text-gray-900 font-medium text-sm mb-0.5">
                    Face Mask & Shield
                  </h4>
                  <p className="text-gray-500 text-xs">
                    Respiratory Protection
                  </p>
                </div>
                <div className={`w-5 h-5 border-2 rounded ${
                  checkedItems.mask 
                    ? 'bg-blue-600 border-blue-600' 
                    : 'border-gray-300'
                } flex items-center justify-center flex-shrink-0`}>
                  {checkedItems.mask && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            </div>

            {/* Complete Button */}
            <button
              disabled={!allChecked}
              className={`w-full py-3 px-4 rounded-xl font-medium text-sm transition-all ${
                allChecked
                  ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Complete PPE Checklist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
