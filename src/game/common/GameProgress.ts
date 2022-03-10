import { Service } from "typedi"

@Service()
export class GameProgress {
    public score = 0

    public reset(): void { this.score = 0 }
}