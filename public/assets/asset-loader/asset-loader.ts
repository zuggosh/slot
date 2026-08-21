import { Assets } from 'pixi.js';

export const TOTAL_SYMBOLS = 9;

export async function loadGameAssets(): Promise<void> {
    for (let i = 0; i < TOTAL_SYMBOLS; i++) {
        Assets.add({
            alias: `symbol_${i}`,
            src: `/assets/symbols/symbol_${i}.svg`
        });
    }

    const assetAliases = Array.from({ length: TOTAL_SYMBOLS }, (_, i) => `symbol_${i}`);

    await Assets.load(assetAliases);
}