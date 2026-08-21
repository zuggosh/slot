import { Container, Graphics, Text, TextStyle } from 'pixi.js';
import { COLORS, BUTTON_CONFIG} from "../../../constants.ts";

export class SpinButton extends Container {
    private bg: Graphics;
    private label: Text;
    private _isEnabled: boolean = true;

    constructor() {
        super();

        this.bg = new Graphics();

        const style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 28,
            fill: COLORS.TEXT.PRIMARY,
            fontWeight: 'bold',
        });

        this.label = new Text({ text: 'SPIN', style });
        this.label.anchor.set(0.5);
        this.label.x = BUTTON_CONFIG.WIDTH / 2;
        this.label.y = BUTTON_CONFIG.HEIGHT / 2;

        this.addChild(this.bg, this.label);
        this.drawBackground(COLORS.BUTTON.DEFAULT);

        this.eventMode = 'static';
        this.cursor = 'pointer';

        this.on('pointerdown', this.onDown);
        this.on('pointerup', this.onUp);
        this.on('pointerupoutside', this.onUp);
        this.on('pointerover', this.onHover);
        this.on('pointerout', this.onOut);
    }

    private drawBackground(color: number): void {
        this.bg.clear();
        this.bg.roundRect(0, 0, BUTTON_CONFIG.WIDTH, BUTTON_CONFIG.HEIGHT, BUTTON_CONFIG.RADIUS);
        this.bg.fill(color);
        this.bg.stroke({ width: BUTTON_CONFIG.STROKE_WIDTH, color: COLORS.TEXT.PRIMARY });
    }

    private onDown = (): void => {
        if (!this._isEnabled) return;
        this.drawBackground(COLORS.BUTTON.ACTIVE);

        this.emit('spin_requested');
    };

    private onUp = (): void => {
        if (!this._isEnabled) return;
        this.drawBackground(COLORS.BUTTON.HOVER);
    };

    private onHover = (): void => {
        if (!this._isEnabled) return;
        this.drawBackground(COLORS.BUTTON.HOVER);
    };

    private onOut = (): void => {
        if (!this._isEnabled) return;
        this.drawBackground(COLORS.BUTTON.DEFAULT);
    };

    public set isEnabled(value: boolean) {
        this._isEnabled = value;
        this.cursor = value ? 'pointer' : 'default';
        this.drawBackground(value ? COLORS.BUTTON.DEFAULT : COLORS.BUTTON.DISABLED);
        this.label.alpha = value ? 1 : 0.5;
    }

    public get isEnabled(): boolean {
        return this._isEnabled;
    }
}