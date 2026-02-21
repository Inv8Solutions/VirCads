import { Boot } from './scenes/Boot';
import { ContentAdvisory } from './scenes/ContentAdvisory';
import { IntroText } from './scenes/IntroText';
import { Scene1 } from './scenes/Scene1';
import { Scene2 } from './scenes/Scene2';
import { Scene3 } from './scenes/Scene3';
import { Scene4 } from './scenes/Scene4';
import { Scene5 } from './scenes/Scene5';
import { Scene6 } from './scenes/Scene6';
import { Scene7 } from './scenes/Scene7';
import { Scene8 } from './scenes/Scene8';
import { Scene9 } from './scenes/Scene9';
import { Scene10 } from './scenes/Scene10';
import { Scene11 } from './scenes/Scene11';
import { Scene12 } from './scenes/Scene12';
import { Scene13 } from './scenes/Scene13';
import { Scene14 } from './scenes/Scene14';
import { Scene15 } from './scenes/Scene15';
import { Scene16 } from './scenes/Scene16';
import { Scene17 } from './scenes/Scene17';
import { Scene18 } from './scenes/Scene18';
import { Scene19 } from './scenes/Scene19';
import { Scene20 } from './scenes/Scene20';
import { Scene21 } from './scenes/Scene21';
import { Scene22 } from './scenes/Scene22';
import { Scene23 } from './scenes/Scene23';
import { Scene24 } from './scenes/Scene24';
import { Scene25 } from './scenes/Scene25';
import { Scene26 } from './scenes/Scene26';
import { Scene27 } from './scenes/Scene27';
import { Scene28 } from './scenes/Scene28';
import { Scene29 } from './scenes/Scene29';
import { Scene30 } from './scenes/Scene30';
import { Scene31 } from './scenes/Scene31';
import { Scene32 } from './scenes/Scene32';
import { Scene33 } from './scenes/Scene33';
import { Scene34 } from './scenes/Scene34';
import { Scene35 } from './scenes/Scene35';
import { Scene36 } from './scenes/Scene36';
import { Scene37 } from './scenes/Scene37';
import { Scene38 } from './scenes/Scene38';
import { Scene38_a_1 } from './scenes/Scene38_a_1';
import { Scene38_a_2 } from './scenes/Scene38_a_2';
import { Scene38_a_3 } from './scenes/Scene38_a_3';
import { Scene38_a_4 } from './scenes/Scene38_a_4';
import { Scene38_a_5 } from './scenes/Scene38_a_5';
import { Scene38_a_6 } from './scenes/Scene38_a_6';
import { Scene38_a_7 } from './scenes/Scene38_a_7';
import { Scene38_a_8 } from './scenes/Scene38_a_8';
import { Scene38_a_9 } from './scenes/Scene38_a_9';
import { Scene38_a_10 } from './scenes/Scene38_a_10';
import { Scene38_a_11 } from './scenes/Scene38_a_11';
import { Scene38_a_12 } from './scenes/Scene38_a_12';
import { Scene38_a_13 } from './scenes/Scene38_a_13';
import { Scene38_b_1 } from './scenes/Scene38_b_1';
import { Scene38_b_2 } from './scenes/Scene38_b_2';
import { Scene38_b_3 } from './scenes/Scene38_b_3';
import { Scene38_b_4 } from './scenes/Scene38_b_4';
import { Scene38_b_5 } from './scenes/Scene38_b_5';
import { Scene38_b_6 } from './scenes/Scene38_b_6';
import { Scene38_b_7 } from './scenes/Scene38_b_7';
import { Scene38_b_8 } from './scenes/Scene38_b_8';
import { Scene38_b_9 } from './scenes/Scene38_b_9';
import { Scene38_b_10 } from './scenes/Scene38_b_10';
import { Scene38_b_11 } from './scenes/Scene38_b_11';
import { Scene38_b_12 } from './scenes/Scene38_b_12';
import { Scene38_b_13 } from './scenes/Scene38_b_13';
import { Scene39 } from './scenes/Scene39';
import { Scene40 } from './scenes/Scene40';
import { Scene41 } from './scenes/Scene41';
import { Scene42 } from './scenes/Scene42';
import { Scene43 } from './scenes/Scene43';
import { Scene44 } from './scenes/Scene44';
import { Scene45 } from './scenes/Scene45';
import { Scene46 } from './scenes/Scene46';
import { Scene47 } from './scenes/Scene47';
import { Scene48 } from './scenes/Scene48';
import { Scene49 } from './scenes/Scene49';
import { Scene50 } from './scenes/Scene50';
import { Scene51 } from './scenes/Scene51';
import { Scene52 } from './scenes/Scene52';
import { AUTO, Game } from 'phaser';

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1600,
    height: 900,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        Boot,
        ContentAdvisory,
        IntroText,
        Scene1,
        Scene2,
        Scene3,
        Scene4,
        Scene5,
        Scene6,
        Scene7,
        Scene8,
        Scene9,
        Scene10,
        Scene11,
        Scene12,
        Scene13,
        Scene14,
        Scene15,
        Scene16,
        Scene17,
        Scene18,
        Scene19,
        Scene20,
        Scene21,
        Scene22,
        Scene23,
        Scene24,
        Scene25,
        Scene26,
        Scene27,
        Scene28,
        Scene29,
        Scene30,
        Scene31,
        Scene32,
        Scene33,
        Scene34,
        Scene35,
        Scene36,
        Scene37,
        Scene38,
        Scene38_a_1,
        Scene38_a_2,
        Scene38_a_3,
        Scene38_a_4,
        Scene38_a_5,
        Scene38_a_6,
        Scene38_a_7,
        Scene38_a_8,
        Scene38_a_9,
        Scene38_a_10,
        Scene38_a_11,
        Scene38_a_12,
        Scene38_a_13,
        Scene38_b_1,
        Scene38_b_2,
        Scene38_b_3,
        Scene38_b_4,
        Scene38_b_5,
        Scene38_b_6,
        Scene38_b_7,
        Scene38_b_8,
        Scene38_b_9,
        Scene38_b_10,
        Scene38_b_11,
        Scene38_b_12,
        Scene38_b_13,
        Scene39,
        Scene40,
        Scene41,
        Scene42,
        Scene43,
        Scene44,
        Scene45,
        Scene46,
        Scene47,
        Scene48,
        Scene49,
        Scene50,
        Scene51,
        Scene52,
    ]
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
