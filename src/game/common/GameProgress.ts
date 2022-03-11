import { Service } from "typedi"
import { GameSignals } from "@common/GameSignals"

@Service()
export class GameProgress {
    public score = 0

    constructor( gameSignals: GameSignals ) {
        gameSignals.start.connect( () => this.score = 0 )
    }
}