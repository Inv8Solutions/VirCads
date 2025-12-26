"use client";

import { useEffect, useRef } from 'react';
import { Game } from 'phaser';
import { PPERoomScene } from '../scenes/PPERoomScene';

export interface PhaserGameInnerProps {
  width?: number;
  height?: number;
  onEquipmentClick?: (equipment: 'gloves' | 'gown' | 'mask') => void;
  ppeStates?: { gloves: boolean; gown: boolean; mask: boolean };
}

export default function PhaserGameInner({ width = 800, height = 600, onEquipmentClick, ppeStates }: PhaserGameInnerProps) {
  const gameRef = useRef<HTMLDivElement>(null);
  const gameInstanceRef = useRef<Game | null>(null);

  useEffect(() => {
    if (!gameRef.current || gameInstanceRef.current) return;

    console.log('Initializing Phaser game...');

    const config = {
      type: Phaser.AUTO,
      width: width,
      height: height,
      parent: gameRef.current,
      backgroundColor: '#2d2d2d',
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: false,
        },
      },
      scene: [PPERoomScene],
    };

    const game = new Game(config);
    gameInstanceRef.current = game;

    // Log when game is ready
    game.events.on('ready', () => {
      console.log('Phaser game is ready!');
    });

    return () => {
      if (gameInstanceRef.current) {
        console.log('Destroying Phaser game...');
        gameInstanceRef.current.destroy(true);
        gameInstanceRef.current = null;
      }
    };
  }, [width, height]);

  return (
    <div 
      ref={gameRef} 
      className="w-full h-full flex items-center justify-center"
      style={{ maxWidth: width, maxHeight: height }}
    />
  );
}
