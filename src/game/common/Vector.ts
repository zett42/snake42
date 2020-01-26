export interface IVec2 {
    x: number;
    y: number;
}

export interface ISize {
    width: number;
    height: number;
}

export function vec2add( v1: IVec2, v2: IVec2 ) : IVec2 {
    return { x: v1.x + v2.x, y: v1.y + v2.y }
}

export function vec2sub( v1: IVec2, v2: IVec2 ) : IVec2 {
    return { x: v1.x - v2.x, y: v1.y - v2.y }
}