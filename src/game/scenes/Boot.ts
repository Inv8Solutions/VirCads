    
import { Scene } from 'phaser';

export class Boot extends Scene
{
    private progressBar!: Phaser.GameObjects.Graphics;
    private progressBox!: Phaser.GameObjects.Graphics;
    private loadingText!: Phaser.GameObjects.Text;
    private percentText!: Phaser.GameObjects.Text;
    private assetText!: Phaser.GameObjects.Text;
    private titleText!: Phaser.GameObjects.Text;

    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        const { width, height } = this.cameras.main;
        const centerX = width / 2;
        const centerY = height / 2;

        // Dark background
        this.cameras.main.setBackgroundColor('#0a0a0a');

        // Title
        this.titleText = this.add.text(centerX, centerY - 120, 'VirCads', {
            fontSize: '48px',
            color: '#ffffff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // "Loading..." label
        this.loadingText = this.add.text(centerX, centerY - 40, 'Loading...', {
            fontSize: '22px',
            color: '#cccccc',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Progress bar background
        const barWidth = 460;
        const barHeight = 36;
        const barX = centerX - barWidth / 2;
        const barY = centerY;

        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(0x222222, 0.9);
        this.progressBox.fillRoundedRect(barX, barY, barWidth, barHeight, 6);
        this.progressBox.lineStyle(2, 0x444444, 1);
        this.progressBox.strokeRoundedRect(barX, barY, barWidth, barHeight, 6);

        // Progress bar fill
        this.progressBar = this.add.graphics();

        // Percentage text centered over bar
        this.percentText = this.add.text(centerX, barY + barHeight / 2, '0%', {
            fontSize: '18px',
            color: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Current asset text below bar
        this.assetText = this.add.text(centerX, barY + barHeight + 24, '', {
            fontSize: '14px',
            color: '#888888',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Loader events
        this.load.on('progress', (value: number) => {
            this.progressBar.clear();
            this.progressBar.fillStyle(0x3b82f6, 1);
            const fillWidth = (barWidth - 8) * value;
            this.progressBar.fillRoundedRect(barX + 4, barY + 4, fillWidth, barHeight - 8, 4);
            this.percentText.setText(`${Math.round(value * 100)}%`);
        });

        this.load.on('fileprogress', (file: Phaser.Loader.File) => {
            this.assetText.setText(`Loading: ${file.key}`);
        });

        this.load.on('complete', () => {
            this.loadingText.setText('Complete!');
            this.assetText.setText('');
        });

        // ── Assets ──

        this.load.image('content_advisory', 'gameassets/content_advisory.png');
        this.load.image('intro_text', 'gameassets/intro_text.png');
        this.load.image('scene_1', 'gameassets/scene_1.png');
        this.load.image('scene_2', 'gameassets/scene_2.png');
        this.load.image('scene_3', 'gameassets/scene_3.png');
        this.load.image('scene_4', 'gameassets/scene_4.png');
        this.load.image('scene_5', 'gameassets/scene_5.png');
        this.load.image('scene_6', 'gameassets/scene_6.png');
        this.load.image('scene_7', 'gameassets/scene_7.png');
        this.load.image('scene_8', 'gameassets/scene_8.png');
        this.load.image('scene_9', 'gameassets/scene_9.png');
        this.load.image('scene_10', 'gameassets/scene_10.png');
        this.load.image('scene_11', 'gameassets/scene_11.png');
        this.load.image('scene_12', 'gameassets/scene_12.png');
        this.load.image('scene_13', 'gameassets/scene_13.png');
        this.load.image('scene_14', 'gameassets/scene_14.png');
        this.load.image('scene_15', 'gameassets/scene_15.png');
        this.load.image('scene_16', 'gameassets/scene_16.png');
        this.load.image('scene_17', 'gameassets/scene_17.png');
        this.load.image('scene_18', 'gameassets/scene_18.png');
        this.load.image('scene_19', 'gameassets/scene_19.png');
        this.load.image('scene_20', 'gameassets/scene_20.png');
        this.load.image('scene_21', 'gameassets/scene_21.png');
        this.load.image('scene_22', 'gameassets/scene_22.png');
        this.load.image('scene_23', 'gameassets/scene_23.png');
        this.load.image('scene_24', 'gameassets/scene_24.png');
        this.load.image('scene_25', 'gameassets/scene_25.png');
        this.load.image('scene_26', 'gameassets/scene_26.png');
        this.load.image('scene_27', 'gameassets/scene_27.png');
        this.load.image('clipboard_1', 'gameassets/clipboard_1.png');
        this.load.image('clipboard_2', 'gameassets/clipboard_2.png');
        this.load.image('clipboard_3', 'gameassets/clipboard_3.png');
        this.load.image('clipboard_4', 'gameassets/clipboard_4.png');
        this.load.image('clipboard_6', 'gameassets/clipboard_6.png');
        this.load.image('clipboard_7', 'gameassets/clipboard_7.png');
        this.load.image('laceration_clipboard', 'gameassets/laceration_clipboard.png');
        this.load.image('req_form', 'gameassets/req_form.png');
        this.load.image('spot_report', 'gameassets/spot_report.png');
        this.load.image('consent_form', 'gameassets/consent_form.png');
        this.load.image('consent_cert', 'gameassets/consent_cert.png');
        this.load.image('correct_tooltip', 'gameassets/correct_tooltip.png');
        this.load.image('wrong_tooltip', 'gameassets/wrong_tooltip.png');
        this.load.image('laceration_img', 'gameassets/laceration_img.png');
        this.load.image('abrasion_image', 'gameassets/abrasion_image.png');
        this.load.image('scene_29', 'gameassets/scene_29.png');
        this.load.image('scene_30', 'gameassets/scene_30.png');
        this.load.image('scene_31', 'gameassets/scene_31.png');
        this.load.image('scene_32', 'gameassets/scene_32.png');
        this.load.image('scene_33', 'gameassets/scene_33.png');
        this.load.image('scene_34', 'gameassets/scene_34.png');
        this.load.image('scene_35', 'gameassets/scene_35.png');
        this.load.image('scene_36', 'gameassets/scene_36.png');
        this.load.image('scene_40', 'gameassets/scene_40.png');
        this.load.image('scene_38_b_6', 'gameassets/scene_38_b_6.png');
        this.load.image('scene_38_b_7', 'gameassets/scene_38_b_7.png');
        this.load.image('scene_38_b_8', 'gameassets/scene_38_b_8.png');
        this.load.image('scene_38_b_11', 'gameassets/scene_38_b_11.png');
        this.load.image('scene_38_b_12', 'gameassets/scene_38_b_12.png');
        this.load.image('scene_38', 'gameassets/scene_38.png');
        this.load.image('scene_38_a_9', 'gameassets/scene_38_a_9.png');
        this.load.image('scene_38_b_13', 'gameassets/scene_38_b_13.png');
        this.load.image('lab_tech', 'gameassets/lab_tech.png');
        this.load.image('tissue_bridging', 'gameassets/tissue_bridging.png');
        this.load.image('contusion_stage1', 'gameassets/contusion_stage1.png');
        this.load.image('contusion_stage2', 'gameassets/contusion_stage2.png');
        this.load.image('contusion_stage3', 'gameassets/contusion_stage3.png');
        this.load.image('contusion_stage4', 'gameassets/contusion_stage4.png');
        this.load.image('stab_wound', 'gameassets/stab_wound.png');
        this.load.image('scene_46', 'gameassets/scene_46.png');
        this.load.image('probing_stick', 'gameassets/probing_stick.png');
        this.load.image('bloodied_stick', 'gameassets/bloodied_stick.png');
        this.load.image('scene_50_a_1', 'gameassets/scene_50_a_1.png');
        this.load.image('scene_50_a_5', 'gameassets/scene_50_a_5.png');
        this.load.image('scene_56', 'gameassets/scene_56.png');
        this.load.image('body_measurement', 'gameassets/body_measurement.png');
    }

    create ()
    {
        // Brief delay so "Complete!" is visible before transitioning
        this.time.delayedCall(400, () => {
            this.scene.start('ContentAdvisory');
        });
    }
}
