import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset, collision }) {
    super(game, x, y, asset, collision)

    this.collision = collision;

    this.anchor.setTo(0.5)

    this.animations.add('walk', ['player_walk1.png', 'player_walk2.png'], true);
    this.animations.play('walk', 10, true);

    this.animations.add('swim', ['player_swim1.png', 'player_swim2.png'], true);
    this.animations.play('swim', 10, true);

    this.animations.add('cheer', ['player_cheer1.png', 'player_cheer2.png'], true);
    this.animations.play('cheer', 10, true);

    this.animations.add('climb', ['player_climb1.png', 'player_climb2.png'], true);
    this.animations.play('climb', 10, true);

    this.animations.add('action', ['player_action1.png', 'player_action2.png'], true);
    this.animations.play('action', 10, true);

    this.animations.add('hold', ['player_hold1.png', 'player_hold2.png'], true);
    this.animations.play('hold', 10, true);

    this.animations.add('idle', ['player_idle.png']);
    this.animations.play('idle');

    this.animations.add('jump', ['player_jump.png']);
    this.animations.play('jump');

    this.animations.add('back', ['player_back.png']);
    this.animations.play('back');

    this.animations.add('duck', ['player_duck.png']);
    this.animations.play('duck');

    this.animations.add('fall', ['player_fall.png']);
    this.animations.play('fall');

    this.animations.add('hang', ['player_hang.png']);
    this.animations.play('hang');

    this.animations.add('hurt', ['player_hurt.png']);
    this.animations.play('hurt');

    this.animations.add('kick', ['player_kick.png']);
    this.animations.play('kick');

    this.animations.add('skid', ['player_skid.png']);
    this.animations.play('skid');

    this.animations.add('slide', ['player_slide.png']);
    this.animations.play('slide');

    this.animations.add('stand', ['player_stand.png']);
    this.animations.play('stand');

    this.animations.add('talk', ['player_talk.png']);
    this.animations.play('talk');
  }

  update () {
    // this.angle += 1

    this.game.physics.arcade.collide(this, this.collision);
  }
}
