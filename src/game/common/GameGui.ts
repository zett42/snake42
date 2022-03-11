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

@Service()
export class GameGui {

    public readonly canvas = document.getElementById( 'gameCanvas' ) as HTMLCanvasElement
    private readonly _menuScreen = document.getElementById( 'menuScreen' ) as HTMLElement
    private readonly _gameOverScreen = document.getElementById( 'gameOverScreen' ) as HTMLElement

    get ctx(): CanvasRenderingContext2D { return this.canvas.getContext( '2d' ) as CanvasRenderingContext2D }

    private _layerMap: LayeredHtmlElements<GameLayerId> = new Map([
        [ GameLayerId.Game, this.canvas ],
        [ GameLayerId.Menu, this._menuScreen ],
        [ GameLayerId.GameOver, this._gameOverScreen ],
    ])

    constructor( 
            private _progress: GameProgress,
            private _gameSignals: GameSignals
        ) {

        wutil.resizeCanvasPixelBuffer( this.canvas )

        // On window resize, resize the canvas to fill browser window dynamically.
        // Use debounce() to avoid costly calculations while the window size is in flux.
        window.addEventListener( "resize", () => wutil.resizeCanvasPixelBuffer( this.canvas ) )

        // Toggle fullscreen by double-click on canvas.
        this.canvas.addEventListener( "dblclick", wutil.toggleFullscreen )

        const startGame = () => {
            if( this.switchToLayer( GameLayerId.Game ) ) {
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

    private switchToLayer( id: GameLayerId ): boolean {
        return switchHtmlLayer( this._layerMap, id )
    }

    private showGameResult(): void {
        document.getElementById( 'score' )!.innerText = this._progress.score.toString()
    }
}