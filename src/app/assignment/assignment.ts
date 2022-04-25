import { FormGroup } from "@angular/forms";

export class assignment<T>{
    constructor(
    details: T
    ){}
}

export class monthly{
    constructor(
        public question: string,
        public answer: string,
        public hint1: string,
        public hint2: string,
        public hint3: string,
        public dateToPublish: Date
    ){}
}

export class weekly{
    constructor(
        public question: string,
        public answer: string,
        public dateToPublish: Date
    ){}
}


export class daily{
    constructor(
        public question: string,
        public answer: string,
        public dateToPublish: Date
    ){}
}

export type assignmentUnion = assignment<monthly>|
                              assignment<weekly>|
                              assignment<daily>;

