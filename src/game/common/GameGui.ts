import { LayeredHtmlElements, switchHtmlLayer } from './LayeredGui';

export enum GameLayerId {
    Menu,
    Game,
    GameOver
}

export type GameGui = LayeredHtmlElements< GameLayerId >

export { 
    switchHtmlLayer 
}