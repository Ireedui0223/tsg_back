import { Request, Response, Router } from 'express';
import CompanyController from '../controllers/company/controller';

const router = Router();

router.post('/create-company', async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const company = await CompanyController.create_company(body);
    return res.json({
      success: true,
      company
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err.errors[0].message
    });
  }
});

router.get('/get-companies', async (__: Request, res: Response) => {
  try {
    const companies = await CompanyController.get_companies();
    return res.json({
      success: true,
      companies
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err.errors[0].message
    });
  }
});

router.post('/login-company', async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const company = await CompanyController.login_company(body);
    return res.json({
      success: true,
      ...company
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.errors[0].message
    });
  }
});

export default router;
