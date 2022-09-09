import db from '../db/db';
import { TrackerInterface, TrackerWCheckinInterface } from '../interfaces/tracker.interface';

class TrackerModel {
  tableName = 'trackers';

  async fetchMyTrackers(userid: number, status_id: number | null): Promise<TrackerInterface[]> {
    
    try {
      const result: TrackerInterface[] = await db(this.tableName)
      .select("*")
      .where({
        userid: userid
      })
      .modify(function(query) {
        if (status_id) {
          query.andWhere({
            status_id: status_id
          });
        }
      });

      return result;

    } catch (err) {
      console.log("TRACKER ERR: ", err)
      throw new Error("Error finding trackers.");
    }
  }

  async fetchTrackerByID(tracker_id: number): Promise<TrackerInterface> {
    
    try {
      const result: TrackerInterface[] = await db(this.tableName)
      .select("*")
      .where({id: tracker_id});

      return result[0];

    } catch (err) {
      console.log("TRACKER ERR: ", err);
      throw new Error("Error finding the tracker.");
    }
  }

  async fetchMyTrackerWithCheckin(userid: number, status_id: number|null): Promise<TrackerWCheckinInterface[]> {
    
    try {
      if (status_id) {
        const result = await db.raw(
          `select
              t.id as id,
              t.userid as userid,
              u.username as username,
              t.title as title,
              t.total_days as total_days,
              t.tracker_type_id as tracker_type_id,
              t.status_id as status_id,
              t.created_at as created_at,
              c.day_num as day_num,
              c.is_checked_in as is_checked_in,
              c.is_repaired  as is_repaired
          from trackers t
          left join users u on u.id = t.userid
          left join checkin c on c.tracker_id = t.id
          where userid=?
          and status_id=?`,
          [userid, status_id],
        );

        return result[0];

      } else {

        const result = await db.raw(
          `select
              t.id as id,
              t.userid as userid,
              u.username as username,
              t.title as title,
              t.total_days as total_days,
              t.tracker_type_id as tracker_type_id,
              t.status_id as status_id,
              t.created_at as created_at,
              c.day_num as day_num,
              c.is_checked_in as is_checked_in,
              c.is_repaired  as is_repaired
          from trackers t
          left join users u on u.id = t.userid
          left join checkin c on c.tracker_id = t.id
          where userid=?`,
          userid
        );

        return result[0];
      }


    } catch (err) {
      console.log("TRACKER ERR: ", err);
      throw new Error("Error finding trackers.");
    }
  }

  async fetchPublicTrackersWCheckin(exceptuserid: number): Promise<TrackerWCheckinInterface[]> {
    try {
        const result = await db.raw(
          `select
              t.id as id,
              t.userid as userid,
              u.username as username,
              t.title as title,
              t.total_days as total_days,
              t.tracker_type_id as tracker_type_id,
              t.status_id as status_id,
              t.created_at as created_at,
              c.day_num as day_num,
              c.is_checked_in as is_checked_in,
              c.is_repaired  as is_repaired
          from trackers t
          left join users u on u.id = t.userid
          left join checkin c on c.tracker_id = t.id
          
          where userid!=?`,
          exceptuserid
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

  async updateTrackerStatus(trackerId: number, tracker_status_id: number) {
    try {
      await db(this.tableName)
      .where({id: trackerId})
      .update({
        status_id: tracker_status_id
      });


    } catch (err) {
      console.log("Error creating updating status of progress tracker.");
      throw new Error("Error creating updating status of progress tracker.");
    }
  }



}

export default new TrackerModel();
