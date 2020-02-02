/**
 * Resize canvas pixel buffer to fit the CSS size of the element.
 * @param canvas 
 */
export function resizeCanvasPixelBuffer( canvas: HTMLCanvasElement ) {

	canvas.width = Math.round( canvas.clientWidth * window.devicePixelRatio )
	canvas.height = Math.round( canvas.clientHeight * window.devicePixelRatio )
}

//···················································································································

export function toggleFullscreen() {

	if( document.documentElement.requestFullscreen ) {
		if( document.fullscreenElement )
			document.exitFullscreen()
		else
			document.documentElement.requestFullscreen()
	}
}
