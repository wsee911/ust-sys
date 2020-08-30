import Express, { RequestHandler } from 'express';
import { CREATED, NOT_FOUND } from 'http-status-codes';
import Logger from '../config/logger';
import { ClassService } from '../service';
import { isEmpty } from 'lodash';

const UpdateClassNameController = Express.Router();
const LOG = new Logger('UpdateClassNameController.js');

const updateClassNameHandler: RequestHandler = async (req, res, next) => {
    const classService = new ClassService();
    const {className, classCode} = req.body;
    if(isEmpty(className) || isEmpty(classCode)) {
        res.status(NOT_FOUND).send("invalid parameters");
    }
    const updatedRes = await classService.updateClass(className, classCode);
    if (updatedRes === 1) {
        res.sendStatus(CREATED);
    } else {
        res.status(NOT_FOUND).send("class not found or not updated");
    }
}

UpdateClassNameController.put('/class/:classCode', updateClassNameHandler);

export default UpdateClassNameController;