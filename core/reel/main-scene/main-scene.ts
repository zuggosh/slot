import { Container } from 'pixi.js';
import { SlotGrid } from "../components/slot-grid/slot-grid";
import { ControlPanel } from "../components/control-panel/control-panel";
import { SlotService } from "../../../slot-service/slot-service.ts";

export class MainScene extends Container {
    private grid: SlotGrid;
    private panel: ControlPanel;
    private slotService: SlotService;

    constructor() {
        super();

        this.grid = new SlotGrid();
        this.panel = new ControlPanel();
        this.slotService = new SlotService();

        this.grid.x = (1280 - this.grid.gridWidth) / 2;
        this.grid.y = 150;

        this.panel.x = (1280 / 2) - 100;
        this.panel.y = 620;

        this.addChild(this.grid, this.panel);
        this.bindEvents();
    }

    private bindEvents(): void {
        this.panel.on('spin_requested', async () => {
            this.panel.lockControls();
            this.grid.startSpin();

            const matrix = await this.slotService.spin();

            await this.grid.stopSpin(matrix);
            this.panel.unlockControls();
        });
    }
}