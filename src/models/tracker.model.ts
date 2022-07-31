import db from '../db/db';
import { TrackerInterface, TrackerWCheckinInterface } from '../interfaces/tracker.interface';

class TrackerModel {
  tableName = 'trackers';

  async fetchMyTrackers(userid: number): Promise<TrackerInterface[]> {
    
    try {
      const result: TrackerInterface[] = await db(this.tableName)
      .select("*")
      .where({userid: userid});

      return result;

    } catch (err) {
      console.log("TRACKER ERR: ", err)
      throw new Error("Error finding trackers.");
    }
  }

  async fetchMyTrackerWithCheckin(userid: number): Promise<TrackerWCheckinInterface[]> {
    
    try {
      const result = await db.raw(
        `select
            t.id as id,
            t.userid as userid,
            t.title as title,
            t.total_days as total_days,
            t.tracker_type_id as tracker_type_id,
            t.status_id as status_id,
            t.created_at as created_at,
            c.day_num as day_num,
            c.is_checked_in as is_checked_in,
            c.is_repaired  as is_repaired
        from trackers t
        left join checkin c on c.tracker_id = t.id
        where userid=?`,
        userid
      );

      return result[0];

    } catch (err) {
      console.log("TRACKER ERR: ", err);
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
