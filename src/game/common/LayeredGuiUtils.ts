
export type LayeredHtmlElements<IdType> = Map<IdType, HTMLElement>

export function switchHtmlLayer<IdType>( layers: LayeredHtmlElements<IdType>, layerToActivate: IdType ): boolean {

    let isMadeVisible = false

    for( const [ key, layer ] of layers.entries() ) {

        if( key === layerToActivate ) {
            if( layer.classList.contains( 'hiddenLayer' ) ) {
                layer.classList.remove( 'hiddenLayer' )
                isMadeVisible = true
            }
        }
        else {
            if( !layer.classList.contains( 'hiddenLayer' ) ) {
                layer.classList.add( 'hiddenLayer' )
            }
        }
    }

    return isMadeVisible
}