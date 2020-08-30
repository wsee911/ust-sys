import Express, { RequestHandler } from 'express';
import Logger from '../config/logger';
import { WorkloadService } from '../service/WorkloadService';
import { NO_CONTENT } from 'http-status-codes';
import { isEmpty } from 'lodash';

const WorkloadReportController = Express.Router();
const LOG = new Logger('WorkloadReportController.js');

const getWorkloadReportHandler: RequestHandler = async (req, res, next) => {
    const workloadService = new WorkloadService();
    const workload = await workloadService.fetchWorkload();
    if (!isEmpty(workload)) {
        res.send(workload);
        return;
    }
    res.sendStatus(NO_CONTENT);
}

WorkloadReportController.get('/reports/workload', getWorkloadReportHandler);

export default WorkloadReportController;