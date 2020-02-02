import { Engine, EntitySystem, Family, Entity } from 'typed-ecstasy'
import { PositionComponent } from '../components/PositionComponent'
import { DoubleLinkComponent } from '../components/DoubleLinkComponent'
import { SnakeHeadComponent } from '../components/SnakeHeadComponent'
import { ISize, IVec2 } from '../common/Vector'
import { DirectionComponent, Direction } from '../components/DirectionComponent'

//---------------------------------------------------------------------------------------------------------------------

export class SnakeRenderSystem extends EntitySystem {

    private _entities: Entity[] = [];

    constructor( private _ctx: CanvasRenderingContext2D, private _playField: ISize ) {
        super( 0 )
    }

    protected addedToEngine( engine: Engine ): void {

        super.addedToEngine( engine )

        this._entities = engine.getEntitiesFor( Family.all( PositionComponent, DoubleLinkComponent ).get() )
    }

    update( deltaTime: number ): void {

        const ecs = this.getEngine()!
        const ctx = this._ctx

        const w = ctx.canvas.width / this._playField.width
        const h = ctx.canvas.height / this._playField.height

        const headSize = 0.5 * w
        const borderWidth = 0.1 * w
        const entitySize = 0.4 * w
        const linkSize = 0.3 * w
        const eyeSize = 0.12 * w
        const eyeDist1 = 0.25 * w
        const eyeDist2 = 0.20 * w

        const borderStyle = "#7F6C00"
        const fillStyle = "#F2CF00"
        const linkStyle = "#7F6C00"
        const eyeStyle = "#003FFF"

        // Draw links

        for( const entity of this._entities ) {

            const pos = entity.get( PositionComponent )!
            const { x, y } = this.entityToCanvasPos( pos )

            const link = entity.get( DoubleLinkComponent )!
            if( link.prevId !== null ) {

                const prevEntity = ecs.getEntity( link.prevId )!
                const prevEntityPos = prevEntity.get( PositionComponent )!

                let p: IVec2 = { x: x, y: y }

                if( prevEntityPos.x < pos.x ) {
                    p.x = x - w / 2
                }
                else if( prevEntityPos.x > pos.x ) {
                    p.x = x + w / 2
                }
                else if( prevEntityPos.y < pos.y ) {
                    p.y = y - h / 2
                }
                else {
                    p.y = y + h / 2
                }

                ctx.beginPath()
                ctx.ellipse( p.x, p.y, linkSize, linkSize, 0, 0, Math.PI * 2 )
                ctx.fillStyle = linkStyle
                ctx.fill()
            }
        }

        // Draw entities

        for( const entity of this._entities ) {

            const pos = entity.get( PositionComponent )!
            const { x, y } = this.entityToCanvasPos( pos )

            const headComp = entity.get( SnakeHeadComponent )
            if( headComp ) {

                const direction = entity.get( DirectionComponent )!

                // Head

                ctx.beginPath()
                ctx.ellipse( x, y, headSize, headSize, 0, 0, Math.PI * 2 )
                ctx.fillStyle = fillStyle
                ctx.fill()

                ctx.lineWidth = borderWidth
                ctx.strokeStyle = borderStyle
                ctx.stroke()

                // Eyes

                if( direction.value != Direction.none ) {

                    let p1: IVec2 = { x: 0, y: 0 }, p2: IVec2 = { x: 0, y: 0 }
                    switch( direction.value ) {
                        case Direction.down: p1.x = -eyeDist2; p2.x = eyeDist2; p1.y = p2.y = eyeDist1; break
                        case Direction.up: p1.x = -eyeDist2; p2.x = eyeDist2; p1.y = p2.y = -eyeDist1; break
                        case Direction.right: p1.x = p2.x = eyeDist1; p1.y = -eyeDist2; p2.y = eyeDist2; break
                        case Direction.left: p1.x = p2.x = -eyeDist1; p1.y = -eyeDist2; p2.y = eyeDist2; break
                    }

                    ctx.beginPath()
                    ctx.ellipse( x + p1.x, y + p1.y, eyeSize, eyeSize, 0, 0, Math.PI * 2 )
                    ctx.ellipse( x + p2.x, y + p2.y, eyeSize, eyeSize, 0, 0, Math.PI * 2 )
                    ctx.fillStyle = eyeStyle
                    ctx.fill()
                }
            }
            else {
                // Segment

                ctx.beginPath()
                ctx.ellipse( x, y, entitySize, entitySize, 0, 0, Math.PI * 2 )
                ctx.fillStyle = fillStyle
                ctx.fill()

                ctx.lineWidth = borderWidth
                ctx.strokeStyle = borderStyle
                ctx.stroke()
            }
        }
    }

    entityToCanvasPos( pos: IVec2 ): IVec2 {
        const x = ( pos.x + 0.5 ) / this._playField.width * this._ctx.canvas.width
        const y = ( pos.y + 0.5 ) / this._playField.height * this._ctx.canvas.height
        return { x: x, y: y }
    }
}
