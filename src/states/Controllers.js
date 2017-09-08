import Phaser from 'phaser'

export default class extends Phaser.State {
  init() {
  }

  preload() {
  }

  addButtons(pad) {
    let buttonA = pad.getButton(Phaser.Gamepad.XBOX360_A);

    buttonA.onDown.add(this.onDown, this);
  }

  onDown(button, value) {
    console.log('hello');
  }

  create() {
    this.game.input.gamepad.start();

    let pad1 = this.game.input.gamepad.pad1;
    let pad2 = this.game.input.gamepad.pad2;
    let pad3 = this.game.input.gamepad.pad3;
    let pad4 = this.game.input.gamepad.pad4;

    pad1.addCallbacks(this, { onConnect: this.addButtons.bind(this, pad1) });
    pad2.addCallbacks(this, { onConnect: this.addButtons.bind(this, pad2) });
    pad3.addCallbacks(this, { onConnect: this.addButtons.bind(this, pad3) });
    pad4.addCallbacks(this, { onConnect: this.addButtons.bind(this, pad4) });

    // this.state.start('Game');
  }

  render() {

  }
}
