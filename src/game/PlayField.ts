export interface PlayFieldCell {
    entityIds: number[];
}

export class PlayField {

    constructor( public width: number, public height: number ) {

        let size = width * height;
        this._data = new Array< PlayFieldCell >( size );
        while( size-- ) {
            this._data[ size ] = { entityIds: [] };
        }
    }

    getCell( x: number, y: number ): PlayFieldCell {

        return this._data[ this.width * y + x ];
    }

    insertEntity( x: number, y: number, id: number ) {

        const cell = this.getCell( x, y );

        if( ! cell.entityIds.includes( id ) ) {
            cell.entityIds.push( id );
        }
    }

    removeEntity( x: number, y: number, id: number ) {

        const cell = this.getCell( x, y );

        const index = cell.entityIds.indexOf( id );
        if( index >= 0 ) {
            cell.entityIds.splice( index, 1 );
        }
    }

    private _data: PlayFieldCell[];
}