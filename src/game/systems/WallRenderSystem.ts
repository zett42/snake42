import { Service } from 'typedi'
import { Family, Entity, IntervalIteratingSystem } from 'typed-ecstasy'
import { PositionComponent } from '@components/PositionComponent'
import { WallComponent } from '@components/WallComponent'
import { IVec2 } from '@common/Vector'
import { PlayField } from '@common/PlayField'
import { GameGui } from '../common/GameGui'

//---------------------------------------------------------------------------------------------------------------------

@Service()
export class WallRenderSystem extends IntervalIteratingSystem {

    constructor( 
        private _gui: GameGui, 
        private _playField: PlayField ) {
        
        super( Family.all( PositionComponent, WallComponent ).get(), 0 )
    }

    protected processEntity( entity: Entity ): void {

        const ctx = this._gui.ctx

        const w = ctx.canvas.width / this._playField.width

        const obstacleSize = 0.9 * w

        const pos = entity.get( PositionComponent )!
        const { x, y } = this.entityToCanvasPos( pos )

        ctx.fillStyle = "#666666"
        ctx.fillRect( x - obstacleSize / 2, y - obstacleSize / 2, obstacleSize, obstacleSize )
    }

    entityToCanvasPos( pos: IVec2 ): IVec2 {

        const ctx = this._gui.ctx

        const x = ( pos.x + 0.5 ) / this._playField.width * ctx.canvas.width
        const y = ( pos.y + 0.5 ) / this._playField.height * ctx.canvas.height

        return { x: x, y: y }
    }
}
