import { Service } from 'typedi'
import { IntervalSystem } from 'typed-ecstasy'
import { GameGui } from '@common/GameGui'

//---------------------------------------------------------------------------------------------------------------------

@Service()
export class ClearRenderSystem extends IntervalSystem {

    constructor( private _gui: GameGui ) {
        super( 0 )
    }
    protected updateInterval(): void {

        const ctx = this._gui.ctx

        ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height )
    }
}
