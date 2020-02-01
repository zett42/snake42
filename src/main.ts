import * as wutil from './utils/windowUtils'
import { startGame } from './game/start'
import { GameLayerId, switchHtmlLayer, GameGui } from './game/common/GameGui';

//-------------------------------------------------------------------------------------------------------------------

function main() {

    const gameCanvas = document.getElementById( 'gameCanvas' ) as HTMLCanvasElement
    const menuScreen = document.getElementById( 'menuScreen' ) as HTMLElement
    const gameOverScreen = document.getElementById( 'gameOverScreen' ) as HTMLElement

    const gui: GameGui = new Map([
        [ GameLayerId.Game, gameCanvas ],
        [ GameLayerId.Menu, menuScreen ],
        [ GameLayerId.GameOver, gameOverScreen ],
    ])

    wutil.resizeCanvasPixelBuffer( gameCanvas )
        
    wireUpEventListeners( gameCanvas, gui )
}

//-------------------------------------------------------------------------------------------------------------------

function wireUpEventListeners( gameCanvas : HTMLCanvasElement, gui: GameGui ) {
    
    // On window resize, resize the canvas to fill browser window dynamically.
    // Use debounce() to avoid costly calculations while the window size is in flux.
    window.addEventListener( "resize", () => wutil.resizeCanvasPixelBuffer( gameCanvas ) )

    // Toggle fullscreen by double-click on canvas.
    gameCanvas.addEventListener( "dblclick", wutil.toggleFullscreen )

    const switchToGameAndPlay = () => {

        if( switchHtmlLayer( gui, GameLayerId.Game ) ) {
            startGame( gameCanvas, gui )
        }
    }

    gui.get( GameLayerId.Menu )!.addEventListener( "click", switchToGameAndPlay );
    gui.get( GameLayerId.GameOver )!.addEventListener( "click", switchToGameAndPlay );       
}

//-------------------------------------------------------------------------------------------------------------------

main();