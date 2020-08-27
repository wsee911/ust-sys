import Express, { RequestHandler } from 'express';
import { CREATED, NOT_FOUND } from 'http-status-codes';
import Logger from '../config/logger';
import { ClassService } from '../service';

const UpdateClassNameController = Express.Router();
const LOG = new Logger('UpdateClassNameController.js');

const updateClassNameHandler: RequestHandler = async (req, res, next) => {
    const classService = new ClassService();
    const updatedRes = await classService.updateClass(req.body.className, req.params.classCode);
    if (updatedRes === 1) {
        res.sendStatus(CREATED);
    }
    res.status(NOT_FOUND).send("class not found or not updated");
}

UpdateClassNameController.put('/class/:classCode', updateClassNameHandler);

export default UpdateClassNameController;