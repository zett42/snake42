import { Family, Entity, IteratingSystem } from 'typed-ecstasy'
import { PositionComponent } from '../components/PositionComponent'
import { WallComponent } from '../components/WallComponent'
import { ISize, IVec2 } from '../common/Vector'

//---------------------------------------------------------------------------------------------------------------------

export class WallRenderSystem extends IteratingSystem {

    constructor( private _ctx: CanvasRenderingContext2D, private _playField: ISize ) {
        super( Family.all( PositionComponent, WallComponent ).get() /*, priority*/ )
    }

    protected processEntity( entity: Entity, deltaTime: number ): void {

        const ecs = this.getEngine()!
        const ctx = this._ctx

        const w = ctx.canvas.width / this._playField.width
        const h = ctx.canvas.height / this._playField.height

        const obstacleSize = 0.9 * w

        const pos = entity.get( PositionComponent )!
        const { x, y } = this.entityToCanvasPos( pos )

        ctx.fillStyle = "#777777"
        ctx.fillRect( x - obstacleSize / 2, y - obstacleSize / 2, obstacleSize, obstacleSize )
    }

    entityToCanvasPos( pos: IVec2 ): IVec2 {
        const x = ( pos.x + 0.5 ) / this._playField.width * this._ctx.canvas.width
        const y = ( pos.y + 0.5 ) / this._playField.height * this._ctx.canvas.height
        return { x: x, y: y }
    }
}