import { Engine, Component, Entity } from 'typed-ecstasy'

//--------------------------------------------------------------------------------------------------------
/**
 * Component that defines connection between snake segments.
 */
export class DoubleLinkComponent extends Component {

    constructor(
        public prevId: number | null = null,  // previous entity (towards tail)
        public nextId: number | null = null  // next entity (towards head)
    ) {
        super()
    }
}

//--------------------------------------------------------------------------------------------------------
/**
 * Append entity to list.
 */

export function appendEntityToDoubleLinkedList( current: Entity, toAppend: Entity ) {

    const currentLink = current.get( DoubleLinkComponent )!
    const toAppendLink = toAppend.get( DoubleLinkComponent )!

    currentLink.nextId = toAppend.getId()
    toAppendLink.prevId = current.getId()
}

//--------------------------------------------------------------------------------------------------------
/**
 * Insert entity before given entity.
 */

export function insertEntityInDoubleLinkedList( ecs: Engine, toInsert: Entity, insertBefore: Entity ) {

    const toInsertLink = toInsert.get( DoubleLinkComponent )!

    const insertBeforeLink = insertBefore.get( DoubleLinkComponent )!

    if( insertBeforeLink.prevId ) {
        const insertAfter = ecs.getEntity( insertBeforeLink.prevId )!
        const insertAfterLink = insertAfter.get( DoubleLinkComponent )!
        insertAfterLink.nextId = toInsert.getId()

        toInsertLink.prevId = insertAfter.getId()
    }

    insertBeforeLink.prevId = toInsert.getId()

    toInsertLink.nextId = insertBefore.getId()
}

//--------------------------------------------------------------------------------------------------------
/**
 * Remove last entity from list and return new last entity.
 */

export function removeLastEntityFromDoubleLinkedList( ecs: Engine, lastEntity: Entity ): Entity | null {

    const lastEntityLink = lastEntity.get( DoubleLinkComponent )!

    if( lastEntityLink.nextId ) {
        const newLastEntity = ecs.getEntity( lastEntityLink.nextId )!
        const newLastEntityLink = newLastEntity.get( DoubleLinkComponent )!
        newLastEntityLink.prevId = null

        lastEntityLink.nextId = null

        return newLastEntity
    }

    return null
}