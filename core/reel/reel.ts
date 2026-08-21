import {Container, Graphics, Text, TextStyle} from 'pixi.js';
import type {ReelConfig} from "./reel-config";
import {ReelAnimator} from "./components/reel-animator/reel-animator.ts";

export class Reel extends Container {
    private config: ReelConfig;
    private symbolsContainer: Container;
    private symbolsPool: { container: Container; text: Text }[] = [];
    private animator: ReelAnimator;

    constructor(config: ReelConfig) {
        super();
        this.config = config;

        this.symbolsContainer = new Container();
        this.addChild(this.symbolsContainer);

        this.setupMask();
        this.initializeSymbols();

        this.animator = new ReelAnimator(this.config, this.symbolsPool);
    }

    private setupMask(): void {
        const mask = new Graphics();
        const height = this.config.symbolHeight * this.config.visibleRows;

        mask.rect(0, 0, this.config.symbolWidth, height);
        mask.fill(0xffffff);

        this.addChild(mask);
        this.mask = mask;
    }

    private initializeSymbols(): void {
        const totalSymbols = this.config.visibleRows + 2;

        const textStyle = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 24,
            fill: '#ffffff',
            fontWeight: 'bold',
        });

        for (let i = 0; i < totalSymbols; i++) {
            const symbolContainer = new Container();

            // Подложка символа (прямоугольник)
            const bg = new Graphics();
            bg.rect(4, 4, this.config.symbolWidth - 8, this.config.symbolHeight - 8);
            bg.fill(0x333333);
            bg.stroke({ width: 2, color: 0x555555 });

            const text = new Text({
                text: `${i}`,
                style: textStyle
            });
            text.anchor.set(0.5);
            text.x = this.config.symbolWidth / 2;
            text.y = this.config.symbolHeight / 2;

            symbolContainer.addChild(bg);
            symbolContainer.addChild(text);

            symbolContainer.y = (i - 1) * this.config.symbolHeight;

            this.symbolsContainer.addChild(symbolContainer);
            this.symbolsPool.push({ container: symbolContainer, text });
        }
    }

    public startSpin(): void {
        this.animator.startSpin();
    }

    public stopSpin(resultSymbols: number[]): Promise<void> {
        return this.animator.stopSpin(resultSymbols);
    }
}