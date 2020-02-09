import { Engine, EntitySystem, Family, Entity } from 'typed-ecstasy'
import { PositionComponent } from '../components/PositionComponent'
import { DoubleLinkComponent } from '../components/DoubleLinkComponent'
import { SnakeHeadComponent } from '../components/SnakeHeadComponent'
import { ISize, IVec2 } from '../common/Vector'
import * as Color from 'color'

//---------------------------------------------------------------------------------------------------------------------

export class SnakeRenderSystem extends EntitySystem {

    private _entities: Entity[] = [];

    constructor( private _ctx: CanvasRenderingContext2D, private _playField: ISize ) {
        super( 0 )
    }

    protected addedToEngine( engine: Engine ): void {

        super.addedToEngine( engine )

        this._entities = engine.getEntitiesFor( Family.all( PositionComponent, SnakeHeadComponent, DoubleLinkComponent ).get() )
    }

    update( deltaTime: number ): void {

        const ecs = this.getEngine()!
        const ctx = this._ctx

        const w = ctx.canvas.width / this._playField.width
        const h = ctx.canvas.height / this._playField.height

        const radius     = 0.40 * w
        const radius2    = 0.25 * w
        const startColor = Color( "#FFEF00" )
        const endColor   = Color( "#FF3F00" )

        ctx.lineWidth = 1.5

        // Draw all snakes

        for( const headEntity of this._entities ) {

            // Draw headEntity

            const headPos  = headEntity.get( PositionComponent )!
            const headComp = headEntity.get( SnakeHeadComponent )!
            const headLink = headEntity.get( DoubleLinkComponent )!

            const { x, y } = this.entityToCanvasPos( headPos )

            ctx.strokeStyle = startColor.hsl().string()
            ctx.beginPath()
            ctx.ellipse( x, y, radius, radius, 0, 0, Math.PI * 2 )
            ctx.stroke()
            ctx.beginPath()
            ctx.ellipse( x, y, radius2, radius2, 0, 0, Math.PI * 2 )
            ctx.stroke()

            // Draw remaining segments

            let iSeg = 1
            let segId = headLink.prevId

            while( segId !== null ) {

                const segmentEntity = ecs.getEntity( segId )!
                const segPos = segmentEntity.get( PositionComponent )!
                const segLink = segmentEntity.get( DoubleLinkComponent )!

                const { x, y } = this.entityToCanvasPos( segPos )

                const color = startColor.mix( endColor, iSeg / headComp.length )
                ctx.strokeStyle = color.hsl().string()

                ctx.beginPath()
                ctx.ellipse( x, y, radius, radius, 0, 0, Math.PI * 2 )
                ctx.stroke()

                segId = segLink.prevId
                ++iSeg
            }
        }
    }

    entityToCanvasPos( pos: IVec2 ): IVec2 {
        const x = ( pos.x + 0.5 ) / this._playField.width * this._ctx.canvas.width
        const y = ( pos.y + 0.5 ) / this._playField.height * this._ctx.canvas.height
        return { x: x, y: y }
    }
}
