import { Request, Response, Router } from 'express';
import WorkDetailController from '../controllers/work.ts/controller';

const router = Router();

router.post(
  '/create-work-detail',
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { body } = req;

      const work_detail = await WorkDetailController.create_work_detail(body);
      return res.json({
        success: true,
        work_detail
      });
    } catch (err) {
      return res.json({
        success: false,
        message: err.errors[0].message
      });
    }
  }
);

export default router;
