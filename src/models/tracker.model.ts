import db from '../db/db';
import { TrackerInterface } from '../interfaces/tracker.interface';

class TrackerModel {
  tableName = 'trackers';

  async fetchMyTrackers(userid: number): Promise<TrackerInterface[]> {
    
    try {
      const result: TrackerInterface[] = await db(this.tableName)
      .select("*")
      .where({userid: userid});

      if (result.length === 0) {
        throw new Error("No trackers found.");
      }


      return result;

    } catch (err) {
      console.log("TRACKER ERR: ", err)
      throw new Error("Error finding trackers.");
    }
  }

  async addNewTracker(userid: number, title: string, tracker_type_id: number, total_days:number, status_id:number) {
    let result: number[];

    try {
      result = await db(this.tableName)
      .insert({
        userid,
        title,
        tracker_type_id,
        total_days,
        status_id,
      });
      
      return result[0];
      
    } catch (err: any) {
      throw new Error("Error creating progress tracker.");
    }
  }

}

export default new TrackerModel();
