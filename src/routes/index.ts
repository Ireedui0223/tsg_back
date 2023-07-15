import { Router, Request, Response } from 'express';
import studentRouter from './student';
import workDetailRouter from './workDetail';
import companyRouter from './company';

const route = Router();

route.post(
  '/api/health-check',
  async (_: Request, res: Response): Promise<Response> => {
    return res.json({
      success: true
    });
  }
);

route.use('/api', studentRouter);
route.use('/api', workDetailRouter);
route.use('/api', companyRouter);
export default route;
