import db from '../db/db';
import { CheckinInterface } from '../interfaces/checkin.interface';

class CheckinModel {
  tableName = 'checkin';

  async fetchCheckins(trackerid: number): Promise<CheckinInterface[]> {
    
    try {
      const result: CheckinInterface[] = await db(this.tableName)
      .select("*")
      .where({tracker_id: trackerid});

      return result;

    } catch (err) {
      console.log("TRACKER ERR: ", err)
      throw new Error("Error finding trackers.");
    }
  }

  async addCheckin(tracker_id: number, day_num: number, is_checked_in: boolean, is_repaired:boolean) {
    let result: number[];

    try {
      result = await db(this.tableName)
      .insert({
        tracker_id,
        day_num,
        is_checked_in,
        is_repaired
      });
      console.log("RESULT: ", result)
      
      return result[0];
      
    } catch (err: any) {
      throw new Error("Error adding checkin for tracker id: " + tracker_id);
    }
  }

}

export default new CheckinModel();
