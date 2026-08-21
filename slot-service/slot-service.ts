export class SlotService {
    private readonly REEL_COUNT = 5;
    private readonly VISIBLE_ROWS = 3;
    private readonly SPIN_DELAY = 1500;

    public async spin(): Promise<number[][]> {
        await new Promise(resolve => setTimeout(resolve, this.SPIN_DELAY));

        const matrix: number[][] = [];

        for (let i = 0; i < this.REEL_COUNT; i++) {
            const reelSymbols: number[] = [];
            for (let j = 0; j < this.VISIBLE_ROWS; j++) {
                const randomSymbolId = Math.floor(Math.random() * 9);
                reelSymbols.push(randomSymbolId);
            }
            matrix.push(reelSymbols);
        }

        return matrix;
    }
}