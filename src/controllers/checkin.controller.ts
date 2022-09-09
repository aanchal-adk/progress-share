import { Request, Response } from 'express';
import CheckInService from '../services/checkin.service';

class CheckInController {
  async addCheckin (req: Request, res: Response) {
    const { trackerId, dayNumber, isRepaired } = req.body;
    
    try {
      const id = await CheckInService.addCheckin(trackerId, dayNumber, isRepaired);

      return res.status(200).json(id);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error adding checkin for tracker id: " + trackerId;
      res.status(500).json(message);
    }
  }
}

export default new CheckInController();
