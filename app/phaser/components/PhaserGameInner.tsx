"use client";

import { useEffect, useRef } from 'react';
import { Game } from 'phaser';
import { PPERoomScene } from '../scenes/PPERoomScene';
import { AutopsyIntroScene } from '../scenes/AutopsyIntroScene';

export interface PhaserGameInnerProps {
  width?: number;
  height?: number;
  onEquipmentClick?: (equipment: 'gloves' | 'gown' | 'mask') => void;
  ppeStates?: { gloves: boolean; gown: boolean; mask: boolean };
  onPPEComplete?: () => void;
  onSceneChange?: (scene: string) => void;
  startScene?: string;
}

export default function PhaserGameInner({ width = 800, height = 600, onEquipmentClick, ppeStates, onPPEComplete, onSceneChange, startScene }: PhaserGameInnerProps) {
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
      scene: [PPERoomScene, AutopsyIntroScene],
    };

    const game = new Game(config);
    gameInstanceRef.current = game;

    // Log when game is ready
    game.events.on('ready', () => {
      console.log('Phaser game is ready!');
      // Set up equipment click callback
      const ppeScene = game.scene.getScene('PPERoomScene') as PPERoomScene;
      if (ppeScene && onEquipmentClick) {
        ppeScene.setEquipmentClickCallback(onEquipmentClick);
      }
      // Set up PPE complete callback
      if (ppeScene && onPPEComplete) {
        ppeScene.setPPECompleteCallback(onPPEComplete);
      }
      // Start with specified scene
      const initialScene = startScene || 'PPERoomScene';
      if (onSceneChange) {
        onSceneChange(initialScene);
      }
      // Switch to the specified scene if it's not the default
      if (startScene && startScene !== 'PPERoomScene') {
        setTimeout(() => {
          game.scene.start(startScene);
        }, 100);
      }
    });

    // Listen for scene changes
    game.events.on('scenecreated', (scene: Phaser.Scene) => {
      const sceneKey = (scene as any).sys.settings.key;
      console.log('Scene created:', sceneKey);
      if (onSceneChange) {
        onSceneChange(sceneKey);
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
