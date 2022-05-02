
export class Daily{
    constructor(
        public question : String,
        public alternative1 : String,
        public alternative2 : String,
        public alternative3 : String,
        public rightAlternative : number,
        public date : Date,
    ){}
}