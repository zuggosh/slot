import { Container } from 'pixi.js';
import { Reel } from '../../reel';

export class SlotGrid extends Container {
    private reels: Reel[] = [];
    private readonly REEL_COUNT = 5;
    private readonly REEL_WIDTH = 150;

    constructor() {
        super();
        this.buildGrid();
    }

    private buildGrid(): void {
        for (let i = 0; i < this.REEL_COUNT; i++) {
            const reel = new Reel({
                reelIndex: i,
                symbolWidth: this.REEL_WIDTH,
                symbolHeight: 150,
                visibleRows: 3,
                animationSpeed: 15
            });

            reel.x = i * this.REEL_WIDTH;

            this.reels.push(reel);
            this.addChild(reel);
        }
    }

    public get gridWidth(): number {
        return this.REEL_COUNT * this.REEL_WIDTH;
    }

    public startSpin(): void {
        this.reels.forEach(reel => reel.startSpin());
    }

    public async stopSpin(matrix: number[][]): Promise<void> {
        const stopPromises = this.reels.map((reel, index) => {
            return new Promise<void>((resolve) => {
                const delay = index * 300;

                setTimeout(async () => {
                    await reel.stopSpin(matrix[index]);
                    resolve();
                }, delay);
            });
        });

        await Promise.all(stopPromises);
    }
}