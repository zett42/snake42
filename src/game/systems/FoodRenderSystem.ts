import { Service } from 'typedi'
import { IntervalIteratingSystem, Family, Entity } from 'typed-ecstasy'
import { PositionComponent } from '@components/PositionComponent'
import { NutritionComponent } from '@components/FoodComponents'
import { PlayField } from '@common/PlayField'
import { GameGui } from '../common/GameGui'

//---------------------------------------------------------------------------------------------------------------------

@Service()
export class FoodRenderSystem extends IntervalIteratingSystem {

    constructor( 
        private _gui: GameGui, 
        private _playField: PlayField ) {
        
        super( Family.all( PositionComponent, NutritionComponent ).get(), 0 )
    }

    protected processEntity( entity: Entity ): void {

        const pos = entity.get( PositionComponent )!
        const nutrition = entity.get( NutritionComponent )!

        const ctx = this._gui.ctx

        const x = ( pos.x + 0.5 ) / this._playField.width * ctx.canvas.width
        const y = ( pos.y + 0.5 ) / this._playField.height * ctx.canvas.height
        const w = ctx.canvas.width / this._playField.width
        const h = ctx.canvas.height / this._playField.height

        const scale = 0.075 + 0.15 * nutrition.value / 5

        ctx.beginPath()
        ctx.moveTo( x - w * scale, y )
        ctx.lineTo( x + w * scale, y )
        ctx.moveTo( x, y - h * scale )
        ctx.lineTo( x, y + h * scale )
        ctx.strokeStyle = "#3fe03f"
        ctx.stroke()
    }
}
