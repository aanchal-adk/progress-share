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

  async fetchMyTrackersWCheckin (req: Request, res: Response) {
    try {
      const result = await TrackerService.fetchMyTrackersWCheckin(res.locals.userid as number);

      return res.status(200).json(result);

    } catch (err) {
      const message = err instanceof Error ? err.message : "Error fetching user's trackers.";
      res.status(500).json(message);
    }
  }

  async addNewTracker (req: Request, res: Response) {
    const { title, tracker_type_id, total_days, status_id } = req.body;

    try {
      const id = await TrackerService.addNewTracker(
        res.locals.userid as number,
        title,
        tracker_type_id,
        total_days,
        status_id);

      return res.status(200).json(id);

    } catch (err) {
      const message = err instanceof Error ? err.message : "Error creating progress tracker.";
      res.status(500).json(message);
    }
  }
}

export default new TrackerController();
