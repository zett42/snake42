import { Component } from 'typed-ecstasy'

// Nutrition value of snake food. Positive value makes snake grow, negative value shortens it.
export class NutritionComponent extends Component {

    constructor( public value: number = 1 ) {
        super()
    }
}
