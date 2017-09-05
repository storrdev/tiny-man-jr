import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //

    this.load.image('background', 'assets/images/tiles/Base\ pack/bg_big.png');

    this.load.tilemap('test', 'assets/maps/test.json', null, Phaser.Tilemap.TILED_JSON);

    this.load.image('tiles', 'assets/maps/tileset.png');

    this.load.atlasJSONHash('player', 'assets/images/PNG/Player/player_spritesheet.png', 'assets/images/PNG/Player/player_spritesheet.json');

    // Scales that ass
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.setResizeCallback(() => {
      this.scale.setMaximum();
    });
  }

  create () {
    this.state.start('Game')
  }
}
