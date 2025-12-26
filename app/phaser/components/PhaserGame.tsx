"use client";

import { useEffect, useRef } from 'react';
import { Game } from 'phaser';
import { PPERoomScene } from '../scenes/PPERoomScene';

interface PhaserGameProps {
  width?: number;
  height?: number;
  onEquipmentClick?: (equipment: 'gloves' | 'gown' | 'mask') => void;
  ppeStates?: { gloves: boolean; gown: boolean; mask: boolean };
}

export default function PhaserGame({ width = 800, height = 600, onEquipmentClick, ppeStates }: PhaserGameProps) {
  const gameRef = useRef<HTMLDivElement>(null);
  const gameInstanceRef = useRef<Game | null>(null);

  useEffect(() => {
    // Only initialize on client side
    if (typeof window === 'undefined') return;
    if (!gameRef.current || gameInstanceRef.current) return;

    console.log('Initializing Phaser game...');

    const config = {
      type: Phaser.AUTO,
      width: width,
      height: height,
      parent: gameRef.current,
      backgroundColor: '#2d3748',
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

    game.events.on('ready', () => {
      console.log('Phaser game is ready!');
      // Set up equipment click callback
      const scene = game.scene.getScene('PPERoomScene') as PPERoomScene;
      if (scene && onEquipmentClick) {
        scene.setEquipmentClickCallback(onEquipmentClick);
      }
    });

    return () => {
      if (gameInstanceRef.current) {
        console.log('Destroying Phaser game...');
        gameInstanceRef.current.destroy(true);
        gameInstanceRef.current = null;
      }
    };
  }, [width, height]);

  // Sync PPE states from React to Phaser
  useEffect(() => {
    if (!gameInstanceRef.current || !ppeStates) return;
    
    const scene = gameInstanceRef.current.scene.getScene('PPERoomScene') as PPERoomScene;
    if (scene) {
      scene.setEquipmentState('gloves', ppeStates.gloves);
      scene.setEquipmentState('gown', ppeStates.gown);
      scene.setEquipmentState('mask', ppeStates.mask);
    }
  }, [ppeStates?.gloves, ppeStates?.gown, ppeStates?.mask]);

  // Update callback when it changes
  useEffect(() => {
    if (!gameInstanceRef.current || !onEquipmentClick) return;
    
    const scene = gameInstanceRef.current.scene.getScene('PPERoomScene') as PPERoomScene;
    if (scene) {
      scene.setEquipmentClickCallback(onEquipmentClick);
    }
  }, [onEquipmentClick]);

  return (
    <div 
      ref={gameRef} 
      className="w-full h-full flex items-center justify-center"
      style={{ maxWidth: width, maxHeight: height }}
    />
  );
}
