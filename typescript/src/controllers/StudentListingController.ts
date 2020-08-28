import Express, { RequestHandler } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import Logger from '../config/logger';
import { StudentService } from '../service';

const StudentListingController = Express.Router();
const LOG = new Logger('StudentListingController.js');

const studentListingHandler: RequestHandler = async (req, res, next) => {
    const studentService = new StudentService();
    const offset = parseInt(req.query.offset as string) - 1;
    const limit = parseInt(req.query.limit as string) + offset

    try {
        const studentRes = await studentService.fetchStudentList(req.params.classCode, offset, limit);

        return res.send(studentRes);
    } catch (err) {
        console.log(err);
        res.status(INTERNAL_SERVER_ERROR).send("Opps something went wrong");
    }
}

StudentListingController.get('/class/:classCode/students', studentListingHandler);

export default StudentListingController;