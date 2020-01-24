import * as wutil from './utils/windowUtils'
import { startGame } from './game/start'

//-------------------------------------------------------------------------------------------------------------------

function main() {

    const gameCanvas = document.getElementById( 'gameCanvas' ) as HTMLCanvasElement;

    wireUpEventListeners( gameCanvas );

    startGame( gameCanvas );
}

//-------------------------------------------------------------------------------------------------------------------

function wireUpEventListeners( gameCanvas : HTMLCanvasElement ) {
    
    // On window resize, resize the canvas to fill browser window dynamically.
    // Use debounce() to avoid costly calculations while the window size is in flux.
    window.addEventListener( "resize", () => wutil.resizeCanvasPixelBufferToWindowSize( gameCanvas ) );

    // Handle keyboard
    //document.addEventListener( "keydown", onKeyDown );

    // Toggle fullscreen by double-click on canvas.
    gameCanvas.addEventListener( "dblclick", wutil.toggleFullscreen );
}

//-------------------------------------------------------------------------------------------------------------------

main();