import db from '../db/db';
import { TrackerInterface } from '../interfaces/tracker.interface';

class TrackerModel {
  tableName = 'trackers';

  async fetchMyTrackers(userid: number): Promise<TrackerInterface[]> {
    console.log("USERID: ", userid);
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

}

export default new TrackerModel();
