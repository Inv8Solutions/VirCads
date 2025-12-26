import { Scene } from 'phaser';

export class PPERoomScene extends Scene {
  private onEquipmentClick?: (equipment: 'gloves' | 'gown' | 'mask') => void;
  private equipmentStates = {
    gloves: false,
    gown: false,
    mask: false
  };
  private equipmentSquares: {
    gloves?: Phaser.GameObjects.Rectangle;
    gown?: Phaser.GameObjects.Rectangle;
    mask?: Phaser.GameObjects.Rectangle;
  } = {};
  private checkmarks: {
    gloves?: Phaser.GameObjects.Text;
    gown?: Phaser.GameObjects.Text;
    mask?: Phaser.GameObjects.Text;
  } = {};

  constructor() {
    super('PPERoomScene');
  }

  setEquipmentClickCallback(callback: (equipment: 'gloves' | 'gown' | 'mask') => void) {
    this.onEquipmentClick = callback;
  }

  preload() {
    console.log('Preloading PPERoomScene assets...');
    
    // Create a colored background rectangle as fallback
    this.add.rectangle(400, 300, 800, 600, 0x2d3748);
    
    // Add loading text
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    
    this.add.text(centerX, centerY, 'Loading PPE Room...', {
      fontSize: '24px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 10, y: 5 }
    }).setOrigin(0.5);

    // Try to load the PPE room background image
    this.load.image('ppe-room', '/phaser/assets/images/ppe-room.png');
    
    // Handle load errors
    this.load.on('fileerror', (fileKey: string) => {
      console.error(`Failed to load file: ${fileKey}`);
    });
    
    this.load.on('complete', () => {
      console.log('All assets loaded successfully');
    });
  }

  create() {
    console.log('Creating PPERoomScene...');
    
    // Clear the loading text
    this.children.removeAll();
    
    // Try to add the PPE room as background
    try {
      if (this.textures.exists('ppe-room')) {
        const background = this.add.image(0, 0, 'ppe-room').setOrigin(0, 0);
        
        // Scale background to fit the screen
        const scaleX = this.cameras.main.width / background.width;
        const scaleY = this.cameras.main.height / background.height;
        const scale = Math.max(scaleX, scaleY);
        
        background.setScale(scale);
        
        // Center the background if it's larger than the screen
        if (background.displayWidth > this.cameras.main.width) {
          background.x = (this.cameras.main.width - background.displayWidth) / 2;
        }
        if (background.displayHeight > this.cameras.main.height) {
          background.y = (this.cameras.main.height - background.displayHeight) / 2;
        }
        
        console.log('PPE room background loaded and positioned');
      } else {
        // Fallback to colored background if image failed to load
        this.add.rectangle(400, 300, 800, 600, 0x4a5568);
        this.add.text(400, 300, 'PPE Room\n(Background image not found)', {
          fontSize: '32px',
          color: '#ffffff',
          align: 'center'
        }).setOrigin(0.5);
      }
    } catch (error) {
      console.error('Error creating PPE room scene:', error);
      // Fallback visual
      this.add.rectangle(400, 300, 800, 600, 0x1a202c);
      this.add.text(400, 300, 'PPE Room Scene\nError loading assets', {
        fontSize: '32px',
        color: '#ffffff',
        align: 'center'
      }).setOrigin(0.5);
    }

    // Add interactive squares at specified coordinates
    const squareSize = 50;
    const squareColor = 0xff0000; // Red color
    const squareAlpha = 0.7; // Semi-transparent

    // Square 1: (211, 438) - Protective Gown
    const square1 = this.add.rectangle(211, 438, squareSize, squareSize, squareColor, squareAlpha);
    square1.setInteractive();
    this.equipmentSquares.gown = square1;
    square1.on('pointerdown', () => {
      console.log('Square 1 clicked at (211, 438) - Protective Gown');
      this.toggleEquipment('gown');
    });

    // Square 2: (763, 499) - Nitrile Gloves
    const square2 = this.add.rectangle(763, 499, squareSize, squareSize, squareColor, squareAlpha);
    square2.setInteractive();
    this.equipmentSquares.gloves = square2;
    square2.on('pointerdown', () => {
      console.log('Square 2 clicked at (763, 499) - Nitrile Gloves');
      this.toggleEquipment('gloves');
    });

    // Square 3: (1388, 519) - Face Mask and Shield
    const square3 = this.add.rectangle(1388, 519, squareSize, squareSize, squareColor, squareAlpha);
    square3.setInteractive();
    this.equipmentSquares.mask = square3;
    square3.on('pointerdown', () => {
      console.log('Square 3 clicked at (1388, 519) - Face Mask and Shield');
      this.toggleEquipment('mask');
    });

    // Make the scene interactive for future PPE item interactions
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      console.log('Clicked at:', pointer.x, pointer.y);
    });

    console.log('PPERoomScene created successfully');
  }

  toggleEquipment(equipment: 'gloves' | 'gown' | 'mask') {
    // Toggle state
    this.equipmentStates[equipment] = !this.equipmentStates[equipment];
    
    const square = this.equipmentSquares[equipment];
    if (!square) return;

    if (this.equipmentStates[equipment]) {
      // Equipment selected - show checkmark
      square.setVisible(false);
      
      // Create checkmark
      const checkmark = this.add.text(square.x, square.y, '✓', {
        fontSize: '32px',
        color: '#00ff00',
        backgroundColor: '#000000',
        padding: { x: 8, y: 8 }
      }).setOrigin(0.5);
      
      this.checkmarks[equipment] = checkmark;
      
      // Add entrance animation
      this.tweens.add({
        targets: checkmark,
        scaleX: { from: 0, to: 1 },
        scaleY: { from: 0, to: 1 },
        duration: 200,
        ease: 'Back.easeOut'
      });
    } else {
      // Equipment deselected - show square again
      square.setVisible(true);
      
      // Remove checkmark
      if (this.checkmarks[equipment]) {
        this.tweens.add({
          targets: this.checkmarks[equipment],
          scaleX: { from: 1, to: 0 },
          scaleY: { from: 1, to: 0 },
          duration: 150,
          ease: 'Back.easeIn',
          onComplete: () => {
            if (this.checkmarks[equipment]) {
              this.checkmarks[equipment]!.destroy();
              this.checkmarks[equipment] = undefined;
            }
          }
        });
      }
    }

    // Notify React component
    if (this.onEquipmentClick) {
      this.onEquipmentClick(equipment);
    }
  }

  setEquipmentState(equipment: 'gloves' | 'gown' | 'mask', state: boolean) {
    if (this.equipmentStates[equipment] === state) return;
    
    this.equipmentStates[equipment] = state;
    const square = this.equipmentSquares[equipment];
    if (!square) return;

    if (state) {
      // Equipment selected - show checkmark
      square.setVisible(false);
      
      const checkmark = this.add.text(square.x, square.y, '✓', {
        fontSize: '32px',
        color: '#00ff00',
        backgroundColor: '#000000',
        padding: { x: 8, y: 8 }
      }).setOrigin(0.5);
      
      this.checkmarks[equipment] = checkmark;
    } else {
      // Equipment deselected - show square again
      square.setVisible(true);
      
      if (this.checkmarks[equipment]) {
        this.checkmarks[equipment]!.destroy();
        this.checkmarks[equipment] = undefined;
      }
    }
  }

  update() {
    // Update logic for the scene (if needed)
  }
}
