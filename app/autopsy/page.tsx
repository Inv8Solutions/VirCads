"use client";

import { useState } from "react";
import Image from "next/image";
import PhaserGame from "../phaser/components/PhaserGame";

export default function AutopsyRoom() {
  const handleSceneChange = (scene: string) => {
    console.log('Scene changed to:', scene);
  };

  const handlePPEComplete = () => {
    console.log('PPE checklist completed - transitioning to autopsy room');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 flex items-center">
        <button className="mr-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-semibold text-center flex-1">Vircards - Autopsy Room</h1>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Main Content Area */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative" style={{ height: '600px' }}>
              <PhaserGame 
                width={1600} 
                height={900} 
                onPPEComplete={handlePPEComplete}
                onSceneChange={handleSceneChange}
                startScene="AutopsyIntroScene"
              />
            </div>
            <div className="p-4 bg-gray-50 text-center">
              <p className="text-sm text-gray-600">FOR FORENSICS AUTOPSY ROOM</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-96 p-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Autopsy Room Content */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Autopsy Room</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="text-sm font-semibold text-blue-800">Examination Ready</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      PPE protocol complete. The technician is ready to assist with the forensic examination.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Examination Steps */}
            <div className="mb-6">
              <h3 className="font-semibold mb-4">Examination Protocol:</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <div>
                    <p className="font-medium text-gray-900">External Examination</p>
                    <p className="text-sm text-gray-600">Document external findings</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gray-300 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <div>
                    <p className="font-medium text-gray-900">Internal Examination</p>
                    <p className="text-sm text-gray-600">Systematic internal assessment</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gray-300 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <div>
                    <p className="font-medium text-gray-900">Evidence Collection</p>
                    <p className="text-sm text-gray-600">Gather and document samples</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technician Status */}
            <div className="border-t pt-4">
              <div className="bg-green-100 text-green-800 text-center p-3 rounded-lg">
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Technician Ready for Examination</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
