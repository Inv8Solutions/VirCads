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

  const handlePPEComplete = () => {
    console.log('PPE checklist completed - transitioning to autopsy room');
    // Navigation is handled by the Phaser scene
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
                onPPEComplete={handlePPEComplete}
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
            {/* PPE Storage Room Content */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">PPE Storage Room</h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="text-sm font-semibold text-red-800">Required Protocol:</h3>
                    <p className="text-sm text-red-700 mt-1">
                      Standard precautions require full PPE for all postmortem examinations to protect against biological hazards.
                    </p>
                  </div>
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
                    <label htmlFor="mask" className="font-medium text-gray-900">Face Mask and Shield</label>
                    <p className="text-sm text-gray-600">Respiratory protection</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="border-t pt-4">
              <div className={`text-center p-3 rounded-lg ${allChecked ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {allChecked ? (
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">PPE Complete - Ready for Autopsy</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Complete PPE Checklist</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
