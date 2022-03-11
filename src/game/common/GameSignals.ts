import { Service } from 'typedi'
import { Signal } from 'typed-signals'

@Service()
export class GameSignals {
    startSignal = new Signal< () => void >();
    gameOverSignal = new Signal< () => void >();
}