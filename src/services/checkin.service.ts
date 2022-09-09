import * as constants from '../constants';
import CheckinModel from "../models/checkin.model";
import TrackerModel from "../models/tracker.model";
import trackerModel from "../models/tracker.model";

class CheckInService {
  async addCheckin (trackerId:number, dayNumber:number, isRepaired:boolean) {
    const isCheckedIn = true;

    // To Do: Check if the tracker belongs to the user trying to checkin 

    const trackerInfo = await TrackerModel.fetchTrackerByID(trackerId);

    const checkinId = await CheckinModel.addCheckin(trackerId, dayNumber, isCheckedIn, isRepaired);

    if (trackerInfo.total_days === dayNumber) {
      await trackerModel.updateTrackerStatus(trackerId, constants.TRACKER_COMPLETE);
    }

    return checkinId;

  }
}

export default new CheckInService();
