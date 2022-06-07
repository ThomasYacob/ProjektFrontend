import { User } from "../user";

export class userAnswer{
    constructor(
        public answer : String,
        public typeOfQuestion: typeOfQuestion,
        public questionId: number,
        public dateString: String,
        corrected : String,
        public userAnswerid: number,
        public user : User,
    ){}
}

  enum typeOfQuestion {
  Daily = 1, Weekly = 2, Monthly = 3
}