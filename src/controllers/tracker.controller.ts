import { Request, Response } from 'express';
import TrackerService from '../services/tracker.service';

class TrackerController {
  async fetchMyTrackers (req: Request, res: Response) {

    try {
      const result = await TrackerService.fetchMyTrackers(res.locals.userid as number);

      return res.status(200).json(result);

    } catch (err) {
      const message = err instanceof Error ? err.message : "Error fetching user's trackers.";
      res.status(500).json(message);
    }
  }
}

export default new TrackerController();
