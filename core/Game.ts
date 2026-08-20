import { Application } from 'pixi.js';

export class Game {
    private app: Application;

    constructor() {
        this.app = new Application();
    }

    public async bootstrap(containerElement: HTMLElement): Promise<void> {
        await this.app.init({
            width: 1280,
            height: 720,
            backgroundColor: 0x1a1a1a,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
        });

        containerElement.appendChild(this.app.canvas);
    }

    public get stage() {
        return this.app.stage;
    }
}