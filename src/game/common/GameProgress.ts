import { Service } from "typedi"
import { GameSignals } from "@common/GameSignals"

@Service()
export class GameProgress {
    public score = 0

    constructor( private _gameSignals: GameSignals ) {
        _gameSignals.startSignal.connect( () => this.score = 0 )
    }
}