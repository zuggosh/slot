import { Ticker } from 'pixi.js';
import type { ReelConfig } from '../../reel-config';
import type { ReelSymbol } from './reel-symbol';

export class ReelAnimator {
    private isSpinning: boolean = false;
    private isStopping: boolean = false;
    private resolveStop?: () => void;

    constructor(
        private config: ReelConfig,
        private symbolsPool: ReelSymbol[]
    ) {}

    public startSpin(): void {
        if (this.isSpinning) return;

        this.isSpinning = true;
        this.isStopping = false;

        Ticker.shared.add(this.tick);
    }

    public stopSpin(resultSymbols: number[]): Promise<void> {
        return new Promise((resolve) => {
            this.isStopping = true;
            this.resolveStop = resolve;

            const symbolHeight = this.config.symbolHeight;

            this.symbolsPool.forEach(item => {
                const targetY = Math.round(item.container.y / symbolHeight) * symbolHeight;

                if (targetY === 0) {
                    item.text.text = `${resultSymbols[0]}`;
                } else if (targetY === symbolHeight) {
                    item.text.text = `${resultSymbols[1]}`;
                } else if (targetY === symbolHeight * 2) {
                    item.text.text = `${resultSymbols[2]}`;
                }
            });
        });
    }

    private tick = (ticker: Ticker): void => {
        const speed = this.config.animationSpeed * ticker.deltaTime;
        const symbolHeight = this.config.symbolHeight;
        const bottomLimit = (this.config.visibleRows + 1) * symbolHeight;
        const totalSymbols = this.config.visibleRows + 2;

        let allSnapped = true;

        for (let i = 0; i < this.symbolsPool.length; i++) {
            const item = this.symbolsPool[i];

            if (!this.isStopping) {
                item.container.y += speed;
                allSnapped = false;

                if (item.container.y >= bottomLimit) {
                    item.container.y -= totalSymbols * symbolHeight;
                    item.text.text = `${Math.floor(Math.random() * 10)}`;
                }
            } else {
                const targetY = Math.round(item.container.y / symbolHeight) * symbolHeight;
                const diff = targetY - item.container.y;

                if (Math.abs(diff) > 1) {
                    item.container.y += diff * 0.1 * ticker.deltaTime;
                    allSnapped = false;
                } else {
                    item.container.y = targetY;
                }
            }
        }

        if (this.isStopping && allSnapped) {
            this.isSpinning = false;
            this.isStopping = false;
            Ticker.shared.remove(this.tick);

            if (this.resolveStop) {
                this.resolveStop();
                this.resolveStop = undefined;
            }
        }
    };
}