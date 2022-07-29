import TrackerModel from '../models/tracker.model';
import { TrackerInterface } from '../interfaces/tracker.interface';

class Trackerservice {
  async fetchMyTrackers (userid: number): Promise<TrackerInterface[]> {
    return TrackerModel.fetchMyTrackers(userid);
  }
}

export default new Trackerservice();
