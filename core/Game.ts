import { Application } from 'pixi.js';
import { MainScene } from './reel/main-scene/main-scene';
import {loadGameAssets} from "../public/assets/asset-loader/asset-loader.ts";

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

        await loadGameAssets();

        const mainScene = new MainScene();
        this.app.stage.addChild(mainScene);
    }
}