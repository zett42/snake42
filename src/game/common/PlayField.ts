import { IVec2 } from './Vector';

export interface PlayFieldCell {
    entityIds: number[];
}

export class PlayField {

    public readonly width: number;
    public readonly height: number;

    constructor( width: number, height: number ) {

        this.width  = Math.trunc( width );
        this.height = Math.trunc( height );

        let size = this.width * this.height;
        this._data = new Array< PlayFieldCell >( size );
        while( size-- ) {
            this._data[ size ] = { entityIds: [] };
        }
    }

    getCell( pos: IVec2 ): PlayFieldCell {

        return this._data[ this.width * pos.y + pos.x ];
    }

    insertEntity( pos: IVec2, id: number ) {

        const cell = this.getCell( pos );  

        if( ! cell.entityIds.includes( id ) ) {

            if( cell.entityIds.length == 0 ) {
                ++this._usedCellCount;
            }

            cell.entityIds.push( id );
        }
    }

    removeEntity( pos: IVec2, id: number ) {

        const cell = this.getCell( pos );

        const index = cell.entityIds.indexOf( id );
        if( index >= 0 ) {

            cell.entityIds.splice( index, 1 );

            if( cell.entityIds.length == 0 ) {
                --this._usedCellCount;
            }
        }
    }

    get usedCellCount() { return this._usedCellCount }

    private _data: PlayFieldCell[];
    private _usedCellCount: number = 0;
}