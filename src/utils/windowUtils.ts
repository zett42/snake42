
export function resizeCanvasPixelBufferToWindowSize( canvas: HTMLCanvasElement ){

	canvas.width  = Math.round( window.innerWidth  * window.devicePixelRatio );
	canvas.height = Math.round( window.innerHeight * window.devicePixelRatio );
}

//···················································································································

export function toggleFullscreen(){

    if( document.documentElement.requestFullscreen ){
		if( document.fullscreenElement )
			document.exitFullscreen();
		else
			document.documentElement.requestFullscreen();
	}
}
