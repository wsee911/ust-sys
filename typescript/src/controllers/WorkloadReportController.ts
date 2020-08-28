import Express, { RequestHandler } from 'express';
import Logger from '../config/logger';
import { WorkloadService } from '../service/WorkloadService';

const WorkloadReportController = Express.Router();
const LOG = new Logger('WorkloadReportController.js');

const getWorkloadReportHandler: RequestHandler = async (req, res, next) => {
    const workloadService = new WorkloadService();
    const workload = await workloadService.fetchWorkload();
    res.send(workload);
}

WorkloadReportController.get('/reports/workload', getWorkloadReportHandler);

export default WorkloadReportController;