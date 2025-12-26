import { Scene } from 'phaser';

export class AutopsyIntroScene extends Scene {
  constructor() {
    super('AutopsyIntroScene');
  }

  preload() {
    console.log('Preloading AutopsyIntroScene assets...');
    
    // Create a colored background rectangle as fallback
    this.add.rectangle(400, 300, 800, 600, 0x1a1a2e);
    
    // Add loading text
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    
    this.add.text(centerX, centerY, 'Loading Autopsy Room...', {
      fontSize: '24px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 10, y: 5 }
    }).setOrigin(0.5);

    // Load the morgue background image
    this.load.image('morgue-bg', '/phaser/assets/images/morgue-bg.png');
    
    // Load the technician image
    this.load.image('technician', '/phaser/assets/images/technician-nobg.png');
    
    // Handle load errors
    this.load.on('fileerror', (fileKey: string) => {
      console.error(`Failed to load file: ${fileKey}`);
    });
    
    this.load.on('complete', () => {
      console.log('AutopsyIntroScene assets loaded successfully');
    });
  }

  create() {
    console.log('Creating AutopsyIntroScene...');
    
    // Clear the loading text
    this.children.removeAll();
    
    // Try to add the morgue background
    try {
      if (this.textures.exists('morgue-bg')) {
        const background = this.add.image(0, 0, 'morgue-bg').setOrigin(0, 0);
        
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
        
        console.log('Morgue background loaded and positioned');
      } else {
        // Fallback to colored background if image failed to load
        this.add.rectangle(400, 300, 800, 600, 0x16213e);
        this.add.text(400, 300, 'Autopsy Room\n(Background image not found)', {
          fontSize: '32px',
          color: '#ffffff',
          align: 'center'
        }).setOrigin(0.5);
      }
    } catch (error) {
      console.error('Error creating AutopsyIntroScene:', error);
      // Fallback visual
      this.add.rectangle(400, 300, 800, 600, 0x0f3460);
      this.add.text(400, 300, 'Autopsy Room\nError loading assets', {
        fontSize: '32px',
        color: '#ffffff',
        align: 'center'
      }).setOrigin(0.5);
    }

    // Add title text
    this.add.text(400, 50, 'AUTOPSY ROOM', {
      fontSize: '48px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5);

    

    // Add technician image if available
    if (this.textures.exists('technician')) {
      const technician = this.add.image(54, 509, 'technician').setOrigin(0, 0);
      technician.setDisplaySize(400, 400);
      console.log('Technician image loaded and positioned');
    } else {
      // Fallback placeholder for technician
      this.add.text(54, 509, '[Technician]', {
        fontSize: '16px',
        color: '#ffff00',
        backgroundColor: '#000000',
        padding: { x: 5, y: 3 }
      }).setOrigin(0, 0);
      console.log('Technician image not found, using placeholder');
    }

    // Add dialog box beside technician
    const dialogBox = this.add.rectangle(500, 600, 350, 150, 0x2d2d2d, 0.9);
    dialogBox.setStrokeStyle(3, 0xffffff);

    // Add dialog text
    const dialogText = this.add.text(500, 600, 
      'Greetings,Doctor! I am your autopsy technician. I have received the body that is requested to be examined and it is now on the autopsy table.', {
      fontSize: '18px',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: 320 }
    }).setOrigin(0.5);

    

    // Make the scene interactive
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      console.log('Autopsy room clicked at:', pointer.x, pointer.y);
    });

    console.log('AutopsyIntroScene created successfully');
  }

  update() {
    // Update logic for the scene (if needed)
  }
}
