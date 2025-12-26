"use client";

import { useState } from "react";
import Image from "next/image";
import PhaserGame from "./phaser/components/PhaserGame";

export default function Home() {
  const [ppeItems, setPpeItems] = useState({
    gloves: false,
    gown: false,
    mask: false,
  });

  const togglePPE = (item: keyof typeof ppeItems) => {
    setPpeItems(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const allChecked = Object.values(ppeItems).every(Boolean);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 flex items-center">
        <button className="mr-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-semibold text-center flex-1">Vircards</h1>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Main Content Area */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative" style={{ height: '600px' }}>
              <PhaserGame 
                width={1600} 
                height={900} 
                onEquipmentClick={(equipment) => togglePPE(equipment)}
                ppeStates={ppeItems}
              />
            </div>
            <div className="p-4 bg-gray-50 text-center">
              <p className="text-sm text-gray-600">FOR FORENSICS PPE STORAGE ROOM</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-96 p-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">PPE and Environment Setup</h2>
            
            <p className="text-gray-700 mb-6">
              Before entering the morgue, you must wear proper personal protective equipment.
            </p>

            {/* Alert Box */}
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-sm font-semibold text-red-800">Required Protocol:</h3>
                  <p className="text-sm text-red-700 mt-1">
                    Standard precautions require full PPE for all postmortem examinations to protect against biological hazards.
                  </p>
                </div>
              </div>
            </div>

            {/* PPE Checklist */}
            <div className="mb-6">
              <h3 className="font-semibold mb-4">Personal Protective Equipment:</h3>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="gloves"
                    checked={ppeItems.gloves}
                    onChange={() => togglePPE('gloves')}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div>
                    <label htmlFor="gloves" className="font-medium text-gray-900">Nitrile Gloves</label>
                    <p className="text-sm text-gray-600">Double-layered protection</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="gown"
                    checked={ppeItems.gown}
                    onChange={() => togglePPE('gown')}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div>
                    <label htmlFor="gown" className="font-medium text-gray-900">Protective Gown</label>
                    <p className="text-sm text-gray-600">Fluid-resistant Material</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="mask"
                    checked={ppeItems.mask}
                    onChange={() => togglePPE('mask')}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div>
                    <label htmlFor="mask" className="font-medium text-gray-900">Face Mask & Shield</label>
                    <p className="text-sm text-gray-600">Respiratory Protection</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Complete Button */}
            <button
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                allChecked
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!allChecked}
            >
              Complete PPE Checklist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
