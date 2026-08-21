import { Container } from 'pixi.js';
import { SpinButton } from '../spin-button/spin-button';

export class ControlPanel extends Container {
    private spinButton: SpinButton;

    constructor() {
        super();
        this.spinButton = new SpinButton();
        this.addChild(this.spinButton);

        this.spinButton.on('spin_requested', () => {
            this.emit('spin_requested');
        });
    }

    public lockControls(): void {
        this.spinButton.isEnabled = false;
    }

    public unlockControls(): void {
        this.spinButton.isEnabled = true;
    }
}