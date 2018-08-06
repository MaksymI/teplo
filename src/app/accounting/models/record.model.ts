export class Record {
    constructor(
        public _id?: string,
        public value?: number,
        public date?: Date,
        public saved?: boolean
    ) {
        this.date = date || new Date();
        this.saved = saved || false;
    }
}
