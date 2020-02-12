import { IntervalSystem } from 'typed-ecstasy'

//---------------------------------------------------------------------------------------------------------------------

export class ClearRenderSystem extends IntervalSystem {

    constructor( private _ctx: CanvasRenderingContext2D, interval: number ) {
        super( interval )
    }

    protected updateInterval(): void {

        this._ctx.clearRect( 0, 0, this._ctx.canvas.width, this._ctx.canvas.height )
    }
}
