import { Component } from 'typed-ecstasy'

// Nutrition value of snake food. Positive value makes snake grow, negative value shortens it.
export class NutritionComp extends Component {

    constructor( public nutrition: number = 1 ) {
        super();
    }
}