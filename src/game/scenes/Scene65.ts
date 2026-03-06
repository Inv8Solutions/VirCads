import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene65 extends Scene {
    constructor() {
        super('Scene65');
    }

    create() {
        if (this.textures.exists('scene_27')) {
            const bg = this.add.image(800, 450, 'scene_27');
            bg.setDisplaySize(1600, 900);
            bg.setDepth(0);
        } else {
            this.cameras.main.setBackgroundColor('#111');
        }

        // References panel
        const panelW = 1400;
        const panelH = 740;
        const panelX = 800;
        const panelY = 420;
        const panelG = this.add.graphics().setDepth(260);
        panelG.fillStyle(0x1a3a8f, 1);
        panelG.fillRoundedRect(panelX - panelW / 2 - 6, panelY - panelH / 2 - 6, panelW + 12, panelH + 12, 14);
        panelG.fillStyle(0x2255cc, 1);
        panelG.fillRoundedRect(panelX - panelW / 2, panelY - panelH / 2, panelW, panelH, 12);

        // Title
        this.add.text(panelX, panelY - panelH / 2 + 36, 'References', {
            fontSize: '28px', color: '#ffffff', fontFamily: 'Arial', fontStyle: 'bold', align: 'center'
        } as any).setOrigin(0.5).setDepth(261);

        // References content
        const references = [
            'Technical Working Group on Crime Scene Investigation. (2000). A Guide for Law Enforcement a Guide for Law Enforcement Crime Scene Investigation Crime Scene Investigation. https://www.ojp.gov/pdffiles1/nij/178280.pdf',
            '',
            'Gitto, L., & Arunkumar, P. (2021, August 25). Sharp force injuries. Www.pathologyoutlines.com. https://www.pathologyoutlines.com/topic/autopsysharpforce.html',
            '',
            'French, K., & Jacques, R. (2012). Postmortem changes. Pathologyoutlines.com. https://www.pathologyoutlines.com/topic/forensicspostmortem.html',
            '',
            'Simon, L. V., Lopez, R. A., & King, K. C. (2023, August 7). Blunt force trauma. PubMed; StatPearls Publishing. https://www.ncbi.nlm.nih.gov/books/NBK470338/',
            '',
            'Autopsy report-general. (n.d.). Www.pathologyoutlines.com. https://www.pathologyoutlines.com/topic/forensicsautopsygeneral.html'
        ].join('\n');

        this.add.text(panelX, panelY - panelH / 2 + 70, references, {
            fontSize: '15px',
            color: '#ffffff',
            fontFamily: 'Arial',
            align: 'left',
            wordWrap: { width: panelW - 60 },
            lineSpacing: 6
        } as any).setOrigin(0.5, 0).setDepth(261);

        // OK button at bottom of panel
        const okX = panelX;
        const okY = panelY + panelH / 2 - 40;
        const okBtn = this.add.rectangle(okX, okY, 140, 48, 0x1a3a8f).setDepth(262).setInteractive({ useHandCursor: true });
        const okText = this.add.text(okX, okY, 'OK', { fontSize: '18px', color: '#fff', fontFamily: 'Arial' } as any).setOrigin(0.5).setDepth(263);
        okBtn.on('pointerdown', () => {
            this.scene.start('Scene66');
        });

        EventBus.emit('current-scene-ready', this);
    }
}
