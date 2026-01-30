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
        this.load.image('req_form', 'src/gameassets/req_form.png');
        this.load.image('spot_report', 'src/gameassets/spot_report.png');
        this.load.image('consent_form', 'src/gameassets/consent_form.png');
        this.load.image('consent_cert', 'src/gameassets/consent_cert.png');
        this.load.image('correct_tooltip', 'src/gameassets/correct_tooltip.png');
        this.load.image('wrong_tooltip', 'src/gameassets/wrong_tooltip.png');
    }

    create ()
    {
        this.scene.start('ContentAdvisory');
    }
}
