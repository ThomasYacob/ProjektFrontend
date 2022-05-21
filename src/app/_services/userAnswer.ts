export class userAnswer{
    constructor(
        public answer : String,
        public typeOfQuestion: typeOfQuestion,
        questionId: number,
        dateString: String,
    ){}
}

  enum typeOfQuestion {
  Daily = 1 ,Weekly = 2,Monthly = 3
}