import TrackerModel from '../models/tracker.model';
import { TrackerInterface } from '../interfaces/tracker.interface';

class Trackerservice {
  async fetchMyTrackers (userid: number): Promise<TrackerInterface[]> {
    return TrackerModel.fetchMyTrackers(userid);
  }

  async addNewTracker (userid:number, title:string, tracker_type_id:number, total_days:number, status_id:number) {
    return TrackerModel.addNewTracker(userid, title, tracker_type_id, total_days, status_id);
  }
}

export default new Trackerservice();
