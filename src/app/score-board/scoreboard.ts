import { User } from "../register/user";
import { UserUserName } from "../register/userUserName";

export class Scoreboard {
    constructor(
        public scoreid?: number,
        public dailyScore?: number,
        public weeklyScore?: number,
        public monthlyScore?: number,
        public user?: User,
    ){}
}