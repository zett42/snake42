import { Service } from 'typedi'
import { LayeredHtmlElements, switchHtmlLayer } from '@app/game/common/LayeredGuiUtils'
import * as wutil from '@app/utils/windowUtils'
import { GameProgress } from '@common/GameProgress'
import { GameSignals } from '@common/GameSignals'

export enum GameLayerId {
    Menu,
    Game,
    GameOver
}

export type OnGameStartCallback = () => void;

@Service()
export class GameGui {

    private _canvas = document.getElementById( 'gameCanvas' ) as HTMLCanvasElement
    private _menuScreen = document.getElementById( 'menuScreen' ) as HTMLElement
    private _gameOverScreen = document.getElementById( 'gameOverScreen' ) as HTMLElement

    get canvas(): HTMLCanvasElement { return this._canvas }

    get ctx(): CanvasRenderingContext2D { return this._canvas.getContext( '2d' ) as CanvasRenderingContext2D }

    private _layerMap: LayeredHtmlElements<GameLayerId> = new Map([
        [ GameLayerId.Game, this._canvas ],
        [ GameLayerId.Menu, this._menuScreen ],
        [ GameLayerId.GameOver, this._gameOverScreen ],
    ])

    constructor( 
            private _progress: GameProgress,
            private _gameSignals: GameSignals
        ) {

        wutil.resizeCanvasPixelBuffer( this._canvas )

        // On window resize, resize the canvas to fill browser window dynamically.
        // Use debounce() to avoid costly calculations while the window size is in flux.
        window.addEventListener( "resize", () => wutil.resizeCanvasPixelBuffer( this._canvas ) )

        // Toggle fullscreen by double-click on canvas.
        this._canvas.addEventListener( "dblclick", wutil.toggleFullscreen )

        const startGame = () => {
            if( switchHtmlLayer( this._layerMap, GameLayerId.Game ) ) {
                this._gameSignals.startSignal.emit()
            }
        }

        this._menuScreen.addEventListener( "click", startGame )
        this._gameOverScreen.addEventListener( "click", startGame )

        this._gameSignals.gameOverSignal.connect( () => {
            this.switchToLayer( GameLayerId.GameOver )
            this.showGameResult()
        })
    }

    public switchToLayer( id: GameLayerId ): void {
        switchHtmlLayer( this._layerMap, id )
    }

    public showGameResult(): void {
        document.getElementById( 'score' )!.innerText = this._progress.score.toString()
    }
}