/* globals __DEV__ */
import Phaser from 'phaser';
import Player from '../sprites/Player';

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.physics.arcade.TILE_BIAS = 32;

    this.physics.arcade.gravity.y = 2000;

    this.bg = this.game.add.tileSprite(0, 0, 1400, 1400, 'background');

    this.map = this.game.add.tilemap('test');

    this.map.addTilesetImage('base', 'tiles');

    this.layer = this.map.createLayer('Tile Layer 1');

    this.layer.resizeWorld();

    this.map.setCollisionByExclusion([], true, this.layer);

    this.players = this.game.add.group();
    this.players.enableBody = true;
    this.players.physicsBodyType = Phaser.Physics.ARCADE;

    this.player = new Player({
      game: this.game,
      x: this.world.centerX - 200,
      y: this.world.centerY - 200,
      asset: 'player',
      collision: this.layer
    });

    this.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.collideWorldBounds = true;
    this.player.body.setSize(75, 100, 0, 15);

    this.players.add(this.player);

    // this.enemy = new Player({
    //   game: this.game,
    //   x: this.world.centerX + 200,
    //   y: this.world.centerY - 200,
    //   asset: 'player',
    //   collision: this.layer,
    //   options: {
    //     scale: {
    //       x: -1,
    //       y: 1
    //     }
    //   }
    // });
    //
    // this.physics.enable(this.enemy, Phaser.Physics.ARCADE);
    // this.enemy.body.collideWorldBounds = true;
    // this.enemy.body.setSize(75, 100, 0, 15);
    //
    // this.players.add(this.enemy);
  }

  update() {
    // console.log(this.player);
    // console.log(this.enemies.children[0]);
    // this.game.physics.arcade.overlap(this.player, this.enemies, this.handleCollisions);
    this.game.physics.arcade.collide(this.players);
  }

  render () {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.player, 32, 32)
      this.game.debug.body(this.player);
      // console.log(this);
      // this.game.debug.body(this.enemy);
    }
  }
}
