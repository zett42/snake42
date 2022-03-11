import { Service } from 'typedi'
import { IVec2 } from '@common/Vector'

export interface PlayFieldCell {
    entityIds: number[]
}

@Service()
export class PlayField {

    private _data: PlayFieldCell[] = []
    private _width = 0
    private _height = 0
    private _usedCellCount = 0;

    get width(): number { return this._width }

    get height(): number { return this._height }

    get usedCellCount(): number { return this._usedCellCount }

    constructor() {
        console.log("PlayField constructor")
    }

    resize( width: number, height: number ): void {

        this._width = Math.trunc( width )
        this._height = Math.trunc( height )

        let size = this._width * this._height
        this._data = new Array<PlayFieldCell>( size )
        while( size-- ) {
            this._data[ size ] = { entityIds: [] }
        }
    }

    getCell( pos: IVec2 ): PlayFieldCell {

        return this._data[ this._width * pos.y + pos.x ]
    }

    insertEntity( pos: IVec2, id: number ): void {

        const cell = this.getCell( pos )

        if( !cell.entityIds.includes( id ) ) {

            if( cell.entityIds.length == 0 ) {
                ++this._usedCellCount
            }

            cell.entityIds.push( id )
        }
    }

    removeEntity( pos: IVec2, id: number ): void {

        const cell = this.getCell( pos )

        const index = cell.entityIds.indexOf( id )
        if( index >= 0 ) {

            cell.entityIds.splice( index, 1 )

            if( cell.entityIds.length == 0 ) {
                --this._usedCellCount
            }
        }
    }
}