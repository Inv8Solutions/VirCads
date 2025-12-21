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
        {/* Left Side - SVG Storage Room */}
        <div className="flex-1 min-h-0">
          <div className="rounded-3xl overflow-hidden shadow-lg bg-gray-100 h-full flex items-center justify-center p-4">
            <svg viewBox="0 0 1200 800" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {/* Gradients for realistic lighting */}
                <linearGradient id="wallGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f5f5f5"/>
                  <stop offset="100%" stopColor="#d4d4d4"/>
                </linearGradient>
                
                <linearGradient id="floorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#c7cccf"/>
                  <stop offset="100%" stopColor="#a8aeb2"/>
                </linearGradient>
                
                <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8c9199"/>
                  <stop offset="50%" stopColor="#b8bfc7"/>
                  <stop offset="100%" stopColor="#7a8088"/>
                </linearGradient>
                
                <linearGradient id="gownBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#5a9fd4"/>
                  <stop offset="50%" stopColor="#87c4f0"/>
                  <stop offset="100%" stopColor="#4a8fc4"/>
                </linearGradient>
                
                <linearGradient id="cabinetDark" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6b7280"/>
                  <stop offset="100%" stopColor="#4b5563"/>
                </linearGradient>
                
                <linearGradient id="bannerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#b91c1c"/>
                  <stop offset="100%" stopColor="#7f1d1d"/>
                </linearGradient>
                
                <filter id="shadow">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.3"/>
                </filter>
                
                <filter id="softShadow">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2"/>
                </filter>
              </defs>
              
              {/* Background Wall */}
              <rect width="1200" height="800" fill="url(#wallGradient)"/>
              
              {/* Ceiling tiles */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <g key={i}>
                  <rect x={i * 200} y="0" width="198" height="80" fill="#e8e8e8" stroke="#d0d0d0" strokeWidth="2"/>
                  <rect x={i * 200 + 10} y="10" width="178" height="60" fill="#f5f5f5"/>
                </g>
              ))}
              
              {/* Floor tiles */}
              <rect y="650" width="1200" height="150" fill="url(#floorGradient)"/>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <g key={i}>
                  <line x1={i * 120} y1="650" x2={i * 120} y2="800" stroke="#979ca0" strokeWidth="2"/>
                  <line x1="0" y1={650 + i * 15} x2="1200" y2={650 + i * 15} stroke="#979ca0" strokeWidth="2"/>
                </g>
              ))}
              
              {/* Banner with shadow */}
              <g filter="url(#shadow)">
                <rect x="250" y="30" width="700" height="70" fill="url(#bannerGradient)" rx="4"/>
                <rect x="250" y="30" width="700" height="35" fill="#dc2626" opacity="0.3" rx="4"/>
              </g>
              <text x="600" y="65" fontSize="32" fill="white" fontWeight="bold" textAnchor="middle" filter="url(#softShadow)">
                FORENSICS PPE STORAGE ROOM
              </text>
              <text x="600" y="88" fontSize="14" fill="#fca5a5" textAnchor="middle">
                SILID IMBAGAN NG PPE PARA SA FORENSICS
              </text>
              
              {/* Flag decoration */}
              <g transform="translate(980, 35)">
                <rect width="80" height="50" fill="#1e3a8a"/>
                <polygon points="0,0 0,50 40,25" fill="#dc2626"/>
                <polygon points="20,25 15,27 17,22 14,19 19,19 20,14 21,19 26,19 23,22 25,27" fill="#fbbf24"/>
              </g>
              
              {/* Left Cabinet with Gowns - INTERACTIVE */}
              <g 
                onClick={() => toggleCheck('gown')}
                className={`cursor-pointer transition-all ${
                  checkedItems.gown ? 'opacity-100' : 'opacity-100 hover:opacity-90'
                }`}
              >
                {/* Cabinet frame with metallic look */}
                <rect x="50" y="150" width="200" height="500" fill="url(#metalGradient)" rx="4" filter="url(#shadow)"/>
                <rect x="55" y="155" width="190" height="490" fill="#3f4a54" rx="4"/>
                
                {/* Inner dark area */}
                <rect x="60" y="160" width="180" height="480" fill="#1f2937" rx="4"/>
                
                {/* Rod for hanging */}
                <ellipse cx="150" cy="170" rx="75" ry="4" fill="#4b5563"/>
                
                {/* Realistic Hanging Gowns with folds */}
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <g key={i}>
                    {/* Hanger */}
                    <line x1={70 + i * 25} y1="170" x2={70 + i * 25} y2="185" stroke="#6b7280" strokeWidth="2"/>
                    
                    {/* Gown with gradient and folds */}
                    <path 
                      d={`M ${65 + i * 25} 185 Q ${65 + i * 25} 190, ${60 + i * 25} 200 L ${60 + i * 25} 560 Q ${65 + i * 25} 570, ${70 + i * 25} 570 Q ${75 + i * 25} 570, ${80 + i * 25} 560 L ${80 + i * 25} 200 Q ${80 + i * 25} 190, ${75 + i * 25} 185 Z`}
                      fill="url(#gownBlue)"
                      opacity="0.95"
                    />
                    
                    {/* Gown highlights */}
                    <path 
                      d={`M ${67 + i * 25} 185 L ${67 + i * 25} 560`}
                      stroke="#a8d5f2"
                      strokeWidth="1.5"
                      opacity="0.6"
                    />
                    
                    {/* Gown shadows/folds */}
                    <path 
                      d={`M ${73 + i * 25} 185 L ${73 + i * 25} 560`}
                      stroke="#2d5a7b"
                      strokeWidth="1"
                      opacity="0.4"
                    />
                  </g>
                ))}
                
                {/* Cabinet bottom drawer */}
                <rect x="60" y="610" width="180" height="30" fill="#4b5563" rx="2"/>
                <rect x="115" y="620" width="60" height="8" fill="#6b7280" rx="1"/>
                
                {/* Highlight overlay */}
                {!checkedItems.gown && (
                  <rect 
                    x="50" y="150" width="200" height="500" 
                    fill="#fbbf24" 
                    opacity="0.25" 
                    rx="4"
                    className="pointer-events-none"
                  >
                    <animate attributeName="opacity" values="0.25;0.35;0.25" dur="2s" repeatCount="indefinite"/>
                  </rect>
                )}
                
                {/* Checkmark if selected */}
                {checkedItems.gown && (
                  <g filter="url(#shadow)">
                    <circle cx="150" cy="400" r="45" fill="#22c55e" opacity="0.95"/>
                    <circle cx="150" cy="400" r="45" fill="#16a34a" opacity="0.3"/>
                    <path d="M 125 400 L 142 417 L 180 379" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                )}
              </g>
              
              {/* Center Shelving Unit */}
              <g>
                {/* Main cabinet structure with realistic metal */}
                <rect x="280" y="400" width="600" height="250" fill="url(#metalGradient)" rx="4" filter="url(#shadow)"/>
                <rect x="290" y="410" width="580" height="230" fill="#52595f" rx="4"/>
                
                {/* Cabinet doors */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <g key={i}>
                    <rect x={295 + i * 115} y="415" width="110" height="220" fill="#4a5158" stroke="#6b7280" strokeWidth="1" rx="2"/>
                    <rect x={340 + i * 115} y="510" width="20" height="30" fill="#7a8088" rx="2"/>
                  </g>
                ))}
                
                {/* Top shelf unit */}
                <rect x="280" y="120" width="600" height="280" fill="#9ca3af" rx="4" filter="url(#shadow)"/>
                <rect x="285" y="125" width="590" height="270" fill="#8a9199" rx="4"/>
                
                {/* Shelf board */}
                <rect x="280" y="240" width="600" height="12" fill="#6b7280"/>
                <rect x="280" y="240" width="600" height="4" fill="#9ca3af"/>
                
                {/* Top Shelf - GLOVES (INTERACTIVE) */}
                <g
                  onClick={() => toggleCheck('gloves')}
                  className={`cursor-pointer transition-all ${
                    checkedItems.gloves ? 'opacity-100' : 'opacity-100 hover:opacity-90'
                  }`}
                >
                  {/* Gloves boxes with realistic packaging */}
                  {[0, 1, 2, 3].map((i) => (
                    <g key={i} filter="url(#softShadow)">
                      {/* Box shadow */}
                      <rect x={322 + i * 130} y="148" width="110" height="85" fill="#000" opacity="0.1" rx="2"/>
                      
                      {/* Main box */}
                      <rect x={320 + i * 130} y="145" width="110" height="85" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" rx="2"/>
                      <rect x={325 + i * 130} y="150" width="100" height="75" fill="#e0f2fe" rx="2"/>
                      
                      {/* Box top flap */}
                      <rect x={320 + i * 130} y="145" width="110" height="20" fill="#f1f5f9" opacity="0.8" rx="2"/>
                      
                      {/* Label */}
                      <rect x={330 + i * 130} y="165" width="90" height="30" fill="#2563eb" rx="2"/>
                      <rect x={330 + i * 130} y="165" width="90" height="12" fill="#3b82f6" opacity="0.5" rx="2"/>
                      
                      <text x={375 + i * 130} y="183" fontSize="13" fill="white" fontWeight="bold" textAnchor="middle">
                        GLOVES
                      </text>
                      <text x={375 + i * 130} y="210" fontSize="8" fill="#64748b" textAnchor="middle">
                        Nitrile • Size L
                      </text>
                    </g>
                  ))}
                  
                  {/* Additional smaller boxes */}
                  <g filter="url(#softShadow)">
                    <rect x="300" y="260" width="70" height="55" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" rx="2"/>
                    <rect x="385" y="260" width="70" height="55" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" rx="2"/>
                    <rect x="470" y="260" width="80" height="55" fill="#e0f2fe" stroke="#cbd5e1" strokeWidth="1" rx="2"/>
                  </g>
                  
                  {/* Highlight overlay */}
                  {!checkedItems.gloves && (
                    <rect 
                      x="300" y="135" width="560" height="100" 
                      fill="#fbbf24" 
                      opacity="0.25" 
                      rx="4"
                      className="pointer-events-none"
                    >
                      <animate attributeName="opacity" values="0.25;0.35;0.25" dur="2s" repeatCount="indefinite"/>
                    </rect>
                  )}
                  
                  {/* Checkmark if selected */}
                  {checkedItems.gloves && (
                    <g filter="url(#shadow)">
                      <circle cx="575" cy="185" r="40" fill="#22c55e" opacity="0.95"/>
                      <circle cx="575" cy="185" r="40" fill="#16a34a" opacity="0.3"/>
                      <path d="M 555 185 L 570 200 L 600 170" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                  )}
                </g>
                
                {/* Middle shelf - Various supplies with realistic details */}
                <g>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <g key={i} filter="url(#softShadow)">
                      <rect x={305 + i * 115} y="262" width="100" height="60" fill="#f3f4f6" stroke="#cbd5e1" strokeWidth="1" rx="2"/>
                      <rect x={310 + i * 115} y="267" width="90" height="10" fill="#e5e7eb" rx="1"/>
                    </g>
                  ))}
                </g>
                
                {/* Counter surface with reflection */}
                <rect x="280" y="330" width="600" height="8" fill="#5a6169"/>
                <rect x="280" y="330" width="600" height="2" fill="#7a8088" opacity="0.5"/>
                
                {/* Counter with MASKS (INTERACTIVE) */}
                <g
                  onClick={() => toggleCheck('mask')}
                  className={`cursor-pointer transition-all ${
                    checkedItems.mask ? 'opacity-100' : 'opacity-100 hover:opacity-90'
                  }`}
                >
                  {/* Blue mask packages with realistic detail */}
                  <g filter="url(#shadow)">
                    {/* Main mask stack */}
                    <rect x="480" y="345" width="160" height="65" fill="#2563eb" rx="3"/>
                    <rect x="485" y="350" width="150" height="55" fill="#3b82f6" rx="2"/>
                    
                    {/* Package layers */}
                    {[0, 1, 2, 3, 4].map((i) => (
                      <g key={i}>
                        <rect x="487" y={352 + i * 11} width="146" height="10" fill="#60a5fa" opacity="0.8" rx="1"/>
                        <line x1="490" y1={357 + i * 11} x2="630" y2={357 + i * 11} stroke="#1e40af" strokeWidth="0.5" opacity="0.5"/>
                      </g>
                    ))}
                    
                    {/* Packaging tape/seal */}
                    <rect x="550" y="345" width="20" height="65" fill="#1e40af" opacity="0.3"/>
                    
                    {/* Label on package */}
                    <rect x="500" y="370" width="120" height="25" fill="white" opacity="0.9" rx="2"/>
                    <text x="560" y="385" fontSize="11" fill="#1e40af" fontWeight="bold" textAnchor="middle">
                      FACE MASKS
                    </text>
                    <text x="560" y="397" fontSize="7" fill="#64748b" textAnchor="middle">
                      50 pcs • Surgical Grade
                    </text>
                  </g>
                  
                  {/* Highlight overlay */}
                  {!checkedItems.mask && (
                    <rect 
                      x="475" y="340" width="170" height="75" 
                      fill="#fbbf24" 
                      opacity="0.25" 
                      rx="4"
                      className="pointer-events-none"
                    >
                      <animate attributeName="opacity" values="0.25;0.35;0.25" dur="2s" repeatCount="indefinite"/>
                    </rect>
                  )}
                  
                  {/* Checkmark if selected */}
                  {checkedItems.mask && (
                    <g filter="url(#shadow)">
                      <circle cx="560" cy="377" r="35" fill="#22c55e" opacity="0.95"/>
                      <circle cx="560" cy="377" r="35" fill="#16a34a" opacity="0.3"/>
                      <path d="M 543 377 L 555 389 L 580 364" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                  )}
                </g>
                
                {/* Other supplies on counter with realistic shading */}
                <g filter="url(#softShadow)">
                  {/* Left side supplies */}
                  <rect x="300" y="345" width="130" height="60" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" rx="2"/>
                  <rect x="305" y="350" width="120" height="15" fill="#e0e7ff" rx="1"/>
                  <text x="365" y="362" fontSize="9" fill="#475569" textAnchor="middle">Goggles</text>
                  
                  {/* Right side supplies */}
                  <rect x="670" y="345" width="90" height="60" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" rx="2"/>
                  <rect x="775" y="345" width="85" height="60" fill="#e0f2fe" stroke="#cbd5e1" strokeWidth="1" rx="2"/>
                  
                  {/* Small stacks */}
                  {[0, 1, 2].map((i) => (
                    <rect key={i} x={790 + i * 20} y={355 - i * 3} width="50" height="50" fill="#dbeafe" opacity="0.8" rx="1"/>
                  ))}
                </g>
              </g>
              
              {/* Right Shelving Unit with realistic details */}
              <g>
                <rect x="920" y="120" width="250" height="280" fill="#9ca3af" rx="4" filter="url(#shadow)"/>
                <rect x="925" y="125" width="240" height="270" fill="#8a9199" rx="4"/>
                
                {/* Shelf divider */}
                <rect x="920" y="240" width="250" height="12" fill="#6b7280"/>
                <rect x="920" y="240" width="250" height="4" fill="#9ca3af"/>
                
                {/* Boxes on top shelf */}
                {[0, 1, 2].map((col) => (
                  <g key={col} filter="url(#softShadow)">
                    <rect x={945 + col * 75} y="150" width="65" height="75" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" rx="2"/>
                    <rect x={950 + col * 75} y="155" width="55" height="20" fill="#e0e7ff" rx="1"/>
                  </g>
                ))}
                
                {/* Boxes on middle shelf */}
                {[0, 1, 2].map((col) => (
                  <g key={col} filter="url(#softShadow)">
                    <rect x={945 + col * 75} y="260" width="65" height="65" fill="#f3f4f6" stroke="#cbd5e1" strokeWidth="1" rx="2"/>
                    <rect x={950 + col * 75} y="265" width="55" height="15" fill="#dbeafe" rx="1"/>
                  </g>
                ))}
                
                {/* Bottom cabinet */}
                <rect x="920" y="400" width="250" height="250" fill="url(#metalGradient)" rx="4" filter="url(#shadow)"/>
                <rect x="925" y="405" width="240" height="240" fill="#52595f" rx="4"/>
                
                {/* Cabinet doors */}
                {[0, 1].map((i) => (
                  <g key={i}>
                    <rect x={930 + i * 120} y="410" width="115" height="230" fill="#4a5158" stroke="#6b7280" strokeWidth="1" rx="2"/>
                    <rect x={970 + i * 120} y="510" width="20" height="30" fill="#7a8088" rx="2"/>
                  </g>
                ))}
              </g>
            </svg>
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
