import * as p5 from 'p5'
import './ecs.ts'

const sketch = ( p: p5 ) => {
    let x = 100;
    let y = 100;
  
    p.setup = () => {
        p.createCanvas( p.windowWidth, p.windowHeight );
    };

    p.windowResized = () => {
        p.resizeCanvas( p.windowWidth, p.windowHeight );
    }
  
    p.draw = () => {
        p.background( 0 );
        p.fill( 220, 220, 0 );
        p.rect( x, y, 135, 100 );
    };
};

const myp5 = new p5( sketch ); //, document.getElementById('p5sketch') );