import _ from 'lodash';

import TrackerModel from '../models/tracker.model';
import { TrackerInterface, TrackerWCheckinInterface, CompiledTrackerInterface } from '../interfaces/tracker.interface';

class Trackerservice {
  async fetchMyTrackers (userid: number): Promise<TrackerInterface[]> {
    return TrackerModel.fetchMyTrackers(userid);
  }

  async fetchMyTrackersWCheckin (userid: number): Promise<CompiledTrackerInterface[]> {
    const result = await TrackerModel.fetchMyTrackerWithCheckin(userid);

    let compiledResult:CompiledTrackerInterface[] = [];

    result.map(item => {
      const matchingResultIndex = compiledResult.findIndex(e => e.id === item.id);
      const checkinInfo = item.day_num ? {
        day_num: item.day_num,
        is_checked_in: item.is_checked_in,
        is_repaired: item.is_repaired
      }: null;

      if (matchingResultIndex >= 0 && checkinInfo) {
        compiledResult[matchingResultIndex].checkins.push(checkinInfo);
      } else {
        compiledResult.push({
          id: item.id,
          userid: item.userid,
          title: item.title,
          tracker_type_id: item.tracker_type_id,
          total_days: item.total_days,
          status_id: item.status_id,
          created_at: item.created_at,
          checkins: checkinInfo? [checkinInfo]: [],
        });
      }
    });

    return compiledResult;
  }

  async addNewTracker (userid:number, title:string, tracker_type_id:number, total_days:number, status_id:number) {
    return TrackerModel.addNewTracker(userid, title, tracker_type_id, total_days, status_id);
  }
}

export default new Trackerservice();
