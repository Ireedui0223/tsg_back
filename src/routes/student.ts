import { Router, Request, Response } from 'express';
import StudentController from '../controllers/student/controller';

const router = Router();

router.post(
  '/create-student',
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { body } = req;
      const user = await StudentController.create_student(body);
      return res.json({
        success: true,
        user
      });
    } catch (err) {
      return res.json({
        success: false,
        message: err.errors[0].message
      });
    }
  }
);

router.post(
  '/login-student',
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { body } = req;
      const student = await StudentController.student_login(body);
      return res.json({
        success: true,
        ...student
      });
    } catch (err) {
      return res.json({
        success: false,
        message: err.message
      });
    }
  }
);

router.get(
  '/get-student-works',
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { body } = req;
      const student_work = await StudentController.get_student_works(body);
      return res.json({
        success: true,
        student_work
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
