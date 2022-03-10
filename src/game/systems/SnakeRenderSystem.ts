import { Service } from 'typedi'
import { IntervalSystem, Family } from 'typed-ecstasy'
import * as Color from 'color'
import { PositionComponent } from '@components/PositionComponent'
import { DoubleLinkComponent } from '@components/DoubleLinkComponent'
import { SnakeHeadComponent } from '@components/SnakeHeadComponent'
import { IVec2 } from '@common/Vector'
import { PlayField } from '@common/PlayField'
import { GameGui } from '../common/GameGui'

//---------------------------------------------------------------------------------------------------------------------

@Service()
export class SnakeRenderSystem extends IntervalSystem {

    constructor( 
        private _gui: GameGui, 
        private _playField: PlayField ) {
        
        super( 0 )
    }

    updateInterval(): void {

        const entities = this.engine.entities.forFamily( Family.all( PositionComponent, SnakeHeadComponent, DoubleLinkComponent ).get() )

        const ctx = this._gui.ctx

        const w = ctx.canvas.width / this._playField.width

        const radius     = 0.40 * w
        const radius2    = 0.25 * w
        const startColor = Color( "#FFEF00" )
        const endColor   = Color( "#FF3F00" )

        ctx.lineWidth = 1.5

        // Draw all snakes

        for( const headEntity of entities ) {

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

                const segmentEntity = this.engine.entities.get( segId )!
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
        const x = ( pos.x + 0.5 ) / this._playField.width * this._gui.ctx.canvas.width
        const y = ( pos.y + 0.5 ) / this._playField.height * this._gui.ctx.canvas.height
        return { x: x, y: y }
    }
}
