import './style.css';
import './styles/main.scss';
import { Game } from '../core/Game';

const initGame = async () => {
    const container = document.getElementById('app');
    if (!container) throw new Error('Root element not found');

    const game = new Game();
    await game.bootstrap(container);
};

initGame().catch(console.error);