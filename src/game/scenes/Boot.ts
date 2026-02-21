    
import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
            
        
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.image('content_advisory', 'src/gameassets/content_advisory.png');
        this.load.image('intro_text', 'src/gameassets/intro_text.png');
        this.load.image('scene_1', 'src/gameassets/scene_1.png');
        this.load.image('scene_2', 'src/gameassets/scene_2.png');
        this.load.image('scene_3', 'src/gameassets/scene_3.png');
        this.load.image('scene_4', 'src/gameassets/scene_4.png');
        this.load.image('scene_5', 'src/gameassets/scene_5.png');
        this.load.image('scene_6', 'src/gameassets/scene_6.png');
        this.load.image('scene_7', 'src/gameassets/scene_7.png');
        this.load.image('scene_8', 'src/gameassets/scene_8.png');
        this.load.image('scene_9', 'src/gameassets/scene_9.png');
        this.load.image('scene_10', 'src/gameassets/scene_10.png');
        this.load.image('scene_11', 'src/gameassets/scene_11.png');
        this.load.image('scene_12', 'src/gameassets/scene_12.png');
        this.load.image('scene_13', 'src/gameassets/scene_13.png');
        this.load.image('scene_14', 'src/gameassets/scene_14.png');
        this.load.image('scene_15', 'src/gameassets/scene_15.png');
        this.load.image('scene_16', 'src/gameassets/scene_16.png');
        this.load.image('scene_17', 'src/gameassets/scene_17.png');
        this.load.image('scene_18', 'src/gameassets/scene_18.png');
        this.load.image('scene_19', 'src/gameassets/scene_19.png');
        this.load.image('scene_20', 'src/gameassets/scene_20.png');
        this.load.image('scene_21', 'src/gameassets/scene_21.png');
        this.load.image('scene_22', 'src/gameassets/scene_22.png');
        this.load.image('scene_23', 'src/gameassets/scene_23.png');
        this.load.image('scene_24', 'src/gameassets/scene_24.png');
        this.load.image('scene_25', 'src/gameassets/scene_25.png');
        this.load.image('scene_26', 'src/gameassets/scene_26.png');
        this.load.image('scene_27', 'src/gameassets/scene_27.png');
        this.load.image('clipboard_1', 'src/gameassets/clipboard_1.png');
        this.load.image('clipboard_2', 'src/gameassets/clipboard_2.png');
        this.load.image('clipboard_3', 'src/gameassets/clipboard_3.png');
        this.load.image('clipboard_4', 'src/gameassets/clipboard_4.png');
        this.load.image('laceration_clipboard', 'src/gameassets/laceration_clipboard.png');
        this.load.image('req_form', 'src/gameassets/req_form.png');
        this.load.image('spot_report', 'src/gameassets/spot_report.png');
        this.load.image('consent_form', 'src/gameassets/consent_form.png');
        this.load.image('consent_cert', 'src/gameassets/consent_cert.png');
        this.load.image('correct_tooltip', 'src/gameassets/correct_tooltip.png');
        this.load.image('wrong_tooltip', 'src/gameassets/wrong_tooltip.png');
        this.load.image('laceration_img', 'src/gameassets/laceration_img.png');
        this.load.image('scene_29', 'src/gameassets/scene_29.png');
        this.load.image('scene_30', 'src/gameassets/scene_30.png');
        this.load.image('scene_31', 'src/gameassets/scene_31.png');
        this.load.image('scene_32', 'src/gameassets/scene_32.png');
        this.load.image('scene_33', 'src/gameassets/scene_33.png');
        this.load.image('scene_34', 'src/gameassets/scene_34.png');
        this.load.image('scene_35', 'src/gameassets/scene_35.png');
        this.load.image('scene_36', 'src/gameassets/scene_36.png');
        this.load.image('scene_40', 'src/gameassets/scene_40.png');
        this.load.image('scene_38_b_6', 'src/gameassets/scene_38_b_6.png');
        this.load.image('scene_38_b_7', 'src/gameassets/scene_38_b_7.png');
        this.load.image('scene_38_b_8', 'src/gameassets/scene_38_b_8.png');
        this.load.image('scene_38_b_11', 'src/gameassets/scene_38_b_11.png');
        this.load.image('scene_38_b_12', 'src/gameassets/scene_38_b_12.png');
        this.load.image('scene_38', 'src/gameassets/scene_38.png');
        this.load.image('scene_38_a_9', 'src/gameassets/scene_38_a_9.png');
        this.load.image('scene_38_b_13', 'src/gameassets/scene_38_b_13.png');
        this.load.image('lab_tech', 'src/gameassets/lab_tech.png');
        this.load.image('tissue_bridging', 'src/gameassets/tissue_bridging.png');
        this.load.image('contusion_stage1', 'src/gameassets/contusion_stage1.png');
        this.load.image('contusion_stage2', 'src/gameassets/contusion_stage2.png');
        this.load.image('contusion_stage3', 'src/gameassets/contusion_stage3.png');
        this.load.image('contusion_stage4', 'src/gameassets/contusion_stage4.png');
        this.load.image('stab_wound', 'src/gameassets/stab_wound.png');
        this.load.image('scene_46', 'src/gameassets/scene_46.png');
        this.load.image('probing_stick', 'src/gameassets/probing_stick.png');
        this.load.image('bloodied_stick', 'src/gameassets/bloodied_stick.png');
    }

    create ()
    {
        this.scene.start('ContentAdvisory');
    }
}
