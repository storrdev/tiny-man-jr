/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.physics.arcade.gravity.y = 300;

    this.bg = this.game.add.tileSprite(0, 0, 1400, 1400, 'background');

    this.map = this.game.add.tilemap('test');

    this.map.addTilesetImage('base', 'tiles');

    this.layer = this.map.createLayer('Tile Layer 1');

    this.layer.resizeWorld();

    this.map.setCollisionByExclusion([], true, this.layer);

    this.player = new Player({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY - 300,
      asset: 'player',
      collision: this.layer
    });

    this.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.collideWorldBounds = true;
    this.player.body.gravity.y = 1000;
    this.player.body.maxVelocity.y = 500;
    this.player.body.setSize(75, 100, 0, 15);

    this.game.add.existing(this.player)
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32)
      this.game.debug.body(this.player);
    }
  }
}
