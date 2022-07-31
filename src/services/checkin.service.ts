import CheckinModel from "../models/checkin.model";

class CheckInService {
  async addCheckin (trackerId:number, dayNumber:number, isRepaired:boolean) {
    const isCheckedIn = true;

    // To Do: Check if the tracker belongs to the user trying to checkin 

    return CheckinModel.addCheckin(trackerId, dayNumber, isCheckedIn, isRepaired);

  }
}

export default new CheckInService();
