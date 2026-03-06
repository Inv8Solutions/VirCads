import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene62 extends Scene {
    constructor() {
        super('Scene62');
    }

    create() {
        if (this.textures.exists('scene_27')) {
            const bg = this.add.image(800, 450, 'scene_27');
            bg.setDisplaySize(1600, 900);
            bg.setDepth(0);
        } else {
            this.cameras.main.setBackgroundColor('#111');
        }

        // Dialog: prompt to download recorded findings
        const dlgW = 820;
        const dlgH = 160;
        const dlgX = 800;
        const dlgY = 300;
        const g = this.add.graphics().setDepth(200);
        g.fillStyle(0x1a3a8f, 1);
        g.fillRoundedRect(dlgX - dlgW / 2 - 6, dlgY - dlgH / 2 - 6, dlgW + 12, dlgH + 12, 14);
        g.fillStyle(0x2255cc, 1);
        g.fillRoundedRect(dlgX - dlgW / 2, dlgY - dlgH / 2, dlgW, dlgH, 12);

        const dlgStyle = { fontSize: '20px', color: '#ffffff', fontFamily: 'Arial', align: 'center', wordWrap: { width: dlgW - 40 } } as any;
        const dlgText = this.add.text(dlgX, dlgY - 28, 'You can download the recorded findings by clicking the button below', dlgStyle)
            .setOrigin(0.5, 0)
            .setDepth(201);

        // Buttons: Download (left) and Next (right)
        const btnY = dlgY + dlgH / 2 + 44;
        const gap = 160;
        // Download button (green)
        const dlX = dlgX - gap;
        const dlBtn = this.add.rectangle(dlX, btnY, 220, 52, 0x1a3a8f, 1).setDepth(202).setInteractive({ useHandCursor: true });
        dlBtn.setStrokeStyle(2, 0xffffff, 0.5);
        const dlText = this.add.text(dlX, btnY, 'Download', { fontSize: '18px', color: '#fff', fontFamily: 'Arial' } as any).setOrigin(0.5).setDepth(203);
        dlBtn.on('pointerdown', () => {
            // Download the PDF file located in src/gameassets
            try {
                const pdfPath = 'src/gameassets/VirCads-Postmortem-Examination_20260223_194412_0000.pdf';
                const a = document.createElement('a');
                a.href = pdfPath;
                a.download = pdfPath.split('/').pop() || 'recorded_findings.pdf';
                document.body.appendChild(a);
                a.click();
                a.remove();
                this.cameras.main.flash(200, 200, 255, 200);
                console.log('[DOWNLOAD] ' + a.download);
            } catch (e) {
                console.error('Download failed', e);
            }
        });

        // Next button (blue) - starts Scene63
        const nxX = dlgX + gap;
        const nxBtn = this.add.rectangle(nxX, btnY, 160, 52, 0x1a3a8f, 1).setDepth(202).setInteractive({ useHandCursor: true });
        nxBtn.setStrokeStyle(2, 0xffffff, 0.5);
        const nxText = this.add.text(nxX, btnY, 'Next', { fontSize: '18px', color: '#fff', fontFamily: 'Arial' } as any).setOrigin(0.5).setDepth(203);
        nxBtn.on('pointerdown', () => {
            this.scene.start('Scene63');
        });

        EventBus.emit('current-scene-ready', this);
    }
}
