"use client";

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Phaser to avoid SSR issues
const PhaserGameInner = dynamic(
  () => import('./PhaserGameInner').then(mod => ({ default: mod.default })),
  {
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-full bg-gray-800 text-white">Loading game...</div>
  }
);

import type { PhaserGameInnerProps } from './PhaserGameInner';

interface PhaserGameProps {
  width?: number;
  height?: number;
  onEquipmentClick?: (equipment: 'gloves' | 'gown' | 'mask') => void;
  ppeStates?: { gloves: boolean; gown: boolean; mask: boolean };
  onPPEComplete?: () => void;
  onSceneChange?: (scene: string) => void;
  startScene?: string;
}

export default function PhaserGame({ width = 800, height = 600, onEquipmentClick, ppeStates, onPPEComplete, onSceneChange, startScene }: PhaserGameProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <PhaserGameInner 
        width={width} 
        height={height} 
        onEquipmentClick={onEquipmentClick}
        ppeStates={ppeStates}
        onPPEComplete={onPPEComplete}
        onSceneChange={onSceneChange}
        startScene={startScene}
      />
    </div>
  );
}
