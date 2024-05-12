import Dexie from 'dexie';
import { Record } from './interfaces/Record';

class RecordDatabase extends Dexie {
  public records: Dexie.Table<Record, string>; 

  constructor() {
    super("RecordsDatabase");
    this.version(1).stores({
      records: '++id, title, upvotes, date' 
    });
    this.records = this.table("records");
  }
}
const db = new RecordDatabase();

export default db;
