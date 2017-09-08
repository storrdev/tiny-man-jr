import Phaser from 'phaser'

import {
  INPUT_LEFT,
  INPUT_RIGHT,
  INPUT_DOWN,
  INPUT_B,
  INPUT_A
} from '../config';

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset, collision, options }) {
    super(game, x, y, asset, collision, options);

    this.game = game;

    this.inputs = [];

    game.input.gamepad.start();

    this.pad = game.input.gamepad.pad1;

    this.pad.addCallbacks(this, { onConnect: this.handleGamepadConnect.bind(this) });

    this.collision = collision;

    this.jump = 100;

    this.anchor.setTo(0.5);

    if (typeof options === 'object') {
      if (typeof options.scale === 'object') {
        this.scale = options.scale;
      }
    }

    this.animations.add('walk', ['player_walk1.png', 'player_walk2.png'], true);

    this.animations.add('swim', ['player_swim1.png', 'player_swim2.png'], true);
    // this.animations.play('swim', 10, true);

    this.animations.add('cheer', ['player_cheer1.png', 'player_cheer2.png'], true);
    // this.animations.play('cheer', 10, true);

    this.animations.add('climb', ['player_climb1.png', 'player_climb2.png'], true);
    // this.animations.play('climb', 10, true);

    this.animations.add('action', ['player_action1.png', 'player_action2.png'], true);
    // this.animations.play('action', 10, true);

    this.animations.add('hold', ['player_hold1.png', 'player_hold2.png'], true);
    // this.animations.play('hold', 10, true);

    this.animations.add('idle', ['player_idle.png']);
    // this.animations.play('idle');

    this.animations.add('jump', ['player_jump.png']);
    // this.animations.play('jump');

    this.animations.add('back', ['player_back.png']);
    // this.animations.play('back');

    this.animations.add('duck', ['player_duck.png']);
    // this.animations.play('duck');

    this.animations.add('fall', ['player_fall.png']);
    // this.animations.play('fall');

    this.animations.add('hang', ['player_hang.png']);
    // this.animations.play('hang');

    this.animations.add('hurt', ['player_hurt.png']);
    // this.animations.play('hurt');

    this.animations.add('kick', ['player_kick.png']);
    // this.animations.play('kick');

    this.animations.add('skid', ['player_skid.png']);
    // this.animations.play('skid');

    this.animations.add('slide', ['player_slide.png']);
    // this.animations.play('slide');

    this.animations.add('stand', ['player_stand.png']);
    this.animations.play('stand');

    this.animations.add('talk', ['player_talk.png']);
    // this.animations.play('talk');
  }

  handleGamepadConnect() {
    //  We can't do this until we know that the gamepad has been connected and is started

    this.buttonA = this.pad.getButton(Phaser.Gamepad.XBOX360_A);
    this.buttonB = this.pad.getButton(Phaser.Gamepad.XBOX360_B);
    this.buttonX = this.pad.getButton(Phaser.Gamepad.XBOX360_X);
    this.buttonY = this.pad.getButton(Phaser.Gamepad.XBOX360_Y);

    this.buttonA.onDown.add(this.handleInputDown, this);
    this.buttonB.onDown.add(this.handleInputDown, this);
    this.buttonX.onDown.add(this.handleInputDown, this);
    this.buttonY.onDown.add(this.handleInputDown, this);

    this.buttonA.onUp.add(this.handleInputUp, this);
    this.buttonB.onUp.add(this.handleInputUp, this);
    this.buttonX.onUp.add(this.handleInputUp, this);
    this.buttonY.onUp.add(this.handleInputUp, this);

    //  These won't work in Firefox, sorry! It uses totally different button mappings

    this.buttonDPadLeft = this.pad.getButton(Phaser.Gamepad.XBOX360_DPAD_LEFT);
    this.buttonDPadRight = this.pad.getButton(Phaser.Gamepad.XBOX360_DPAD_RIGHT);
    this.buttonDPadUp = this.pad.getButton(Phaser.Gamepad.XBOX360_DPAD_UP);
    this.buttonDPadDown = this.pad.getButton(Phaser.Gamepad.XBOX360_DPAD_DOWN);

    this.buttonDPadLeft.onDown.add(this.handleInputDown, this);
    this.buttonDPadRight.onDown.add(this.handleInputDown, this);
    this.buttonDPadUp.onDown.add(this.handleInputDown, this);
    this.buttonDPadDown.onDown.add(this.handleInputDown, this);

    this.buttonDPadLeft.onUp.add(this.handleInputUp, this);
    this.buttonDPadRight.onUp.add(this.handleInputUp, this);
    this.buttonDPadUp.onUp.add(this.handleInputUp, this);
    this.buttonDPadDown.onUp.add(this.handleInputUp, this);
  }

  handleInputDown(button, value) {

    if (button.buttonCode === Phaser.Gamepad.XBOX360_A) {
        this.inputs.push(INPUT_A);
    }
    else if (button.buttonCode === Phaser.Gamepad.XBOX360_B) {
        this.inputs.push(INPUT_B);
    }
    else if (button.buttonCode === Phaser.Gamepad.XBOX360_X) {
    }
    else if (button.buttonCode === Phaser.Gamepad.XBOX360_Y) {
    }
    else if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_LEFT) {
        // imageDPad.frameName = '360_Dpad_Left';
        this.inputs.push(INPUT_LEFT);
    }
    else if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_RIGHT) {
        this.inputs.push(INPUT_RIGHT);
    }
    else if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_UP) {
    }
    else if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_DOWN) {
        this.inputs.push(INPUT_DOWN);
    }
  }

  handleInputUp(button, value) {
    if (button.buttonCode === Phaser.Gamepad.XBOX360_A) {
        let index = this.inputs.indexOf(INPUT_A);
        this.inputs.splice(index, 1);
    }
    else if (button.buttonCode === Phaser.Gamepad.XBOX360_B) {
        let index = this.inputs.indexOf(INPUT_B);
        this.inputs.splice(index, 1);
    }
    else if (button.buttonCode === Phaser.Gamepad.XBOX360_X) {
        // imageX.alpha = 1;
    }
    else if (button.buttonCode === Phaser.Gamepad.XBOX360_Y) {
        // imageY.alpha = 1;
    } else {
        let directions = [INPUT_LEFT, INPUT_RIGHT, INPUT_DOWN];

        directions.forEach(direction => {
          let index = this.inputs.indexOf(direction);
          this.inputs.splice(index, 1);
        });

    }

  }

  update () {
    // This needs to stay at the top
    this.game.physics.arcade.collide(this, this.collision);

    // Directional movement
    if (this.inputs.indexOf(INPUT_LEFT) > -1) {
      // Move Left
      this.body.velocity.x = -260;
      if (this.scale.x > 0) {
        this.scale.x *= -1;
      }

      this.animations.play('walk', 10, true);
    }
    else if (this.inputs.indexOf(INPUT_RIGHT) > -1) {
      // Move Right
      this.body.velocity.x = 260;
      if (this.scale.x < 0) {
        this.scale.x *= -1;
      }
      this.animations.play('walk', 10, true);
    }
    else if (this.inputs.indexOf(INPUT_DOWN) > -1) {
      // Crouch
      this.animations.play('duck', 10, true);
    } else {
      this.body.velocity.x = 0;
      this.animations.play('stand');
    }

    if (this.inputs.indexOf(INPUT_A) > -1) {
      this.jump -= 10;
      if (this.jump > 0) {
        this.body.velocity.y = -1000;
      }
      this.animations.play('jump');
    } else {
      if (this.body.onFloor()) {
        // Reset Jump
        this.jump = 100;
      }
    }

    if (this.inputs.indexOf(INPUT_B) > -1) {
      this.animations.play('kick');
    }
  }
}
