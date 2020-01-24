import { ECS } from './ecs/ECS'
import { PositionComp } from './components'
import { PositionSystem } from './systems'

//-------------------------------------------------------------------------------------------------------------------

export function startGame( gameCanvas : HTMLCanvasElement ) {

    const ecs = new ECS();

    const positionSystem = new PositionSystem();
    ecs.registerSystem( positionSystem );

    // create entity
    const entity = ecs.createEntity([
        { component: PositionComp }
    ]);
    
    //console.log( `entity.id: ${entity.id}`);
    
    // create entity with arguments    
    /*
    const entity2 = ecs.createEntity([ 
        { component: PositionComp, args: [ 2 ] }
    ]);
    */
    //console.log( `entity2.id: ${entity2.id}`);

    //processAnimationFrame( ecs );
}

//-------------------------------------------------------------------------------------------------------------------

function processAnimationFrame( ecs: ECS, lastTime: number = 0 ) {

    const time = performance.now() / 1000;

    if( lastTime > 0 ) {

        const deltaTime = time - lastTime;

        // System 'update' methods will be called
        ecs.update( deltaTime );
    }

	requestAnimationFrame( () => processAnimationFrame( ecs, time ) );
}