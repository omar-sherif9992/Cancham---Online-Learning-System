import validationMiddleware from '@/Middlewares/validation.middleware';
import { Routes } from '@Common/Interfaces/routes.interface';
import { Router } from 'express';
import ReportController from './report.controller';
import { ReportDTO } from './report.dto';

class ReportRoute implements Routes {
  public path = '/report';
  public router = Router();
  public reportController = new ReportController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', validationMiddleware(ReportDTO, 'body'), this.reportController.reportProblemOrRequestCourse);
    this.router.get('/', this.reportController.getAllReports);
    this.router.get('/:reportId', this.reportController.getReportById);
    this.router.delete('/:reportId', this.reportController.deleteReport);
    this.router.patch('/:reportId', validationMiddleware(ReportDTO, 'body'), this.reportController.updateReport);

    this.router.post('/:reportId/user/:userId', this.reportController.addFollowUpMessage);
  }
}

export default ReportRoute;
