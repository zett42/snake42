import { makeComponent, Component } from './perform-ecs'

// Nutrition value of snake food. Positive value makes snake grow, negative value shortens it.
@makeComponent
export class NutritionComp extends Component {

    nutrition!: number;

    reset( obj: this, nutrition: number = 1 ): void {
        obj.nutrition = nutrition;
    } 
}
