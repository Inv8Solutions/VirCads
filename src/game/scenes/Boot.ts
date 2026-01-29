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
        this.load.image('req_form', 'src/gameassets/req_form.png');
        this.load.image('spot_report', 'src/gameassets/spot_report.png');
        this.load.image('consent_form', 'src/gameassets/consent_form.png');
        this.load.image('consent_cert', 'src/gameassets/consent_cert.png');
    }

    create ()
    {
        this.scene.start('ContentAdvisory');
    }
}
