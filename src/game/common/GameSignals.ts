import { Service } from 'typedi'
import { Signal } from 'typed-signals'

@Service()
export class GameSignals {
    readonly start = new Signal< () => void >();
    readonly gameOver = new Signal< () => void >();
}