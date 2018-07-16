export class Record {
    constructor(
        public id: number,
        public date?: Date,
        public saved?: boolean
    ) {
        this.date = date || new Date();
        this.saved = saved || false;
    }
}
