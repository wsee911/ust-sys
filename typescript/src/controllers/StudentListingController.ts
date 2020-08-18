import Express, { RequestHandler } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { fetchExternalStudentList } from '../api/externalStudentList';
import Logger from '../config/logger';
import { StudentService } from '../service';
import { dynamicSort } from '../utils';

const StudentListingController = Express.Router();
const LOG = new Logger('StudentListingController.js');

const studentListingHandler: RequestHandler = async (req, res, next) => {
    const studentService = new StudentService();
    const offset = parseInt(req.query.offset as string) - 1;
    const limit = parseInt(req.query.limit as string) + offset

    try {
        const { count, students } = await fetchExternalStudentList(req.params.classCode);
        const internalStudents = await studentService.fetchStudentList(req.params.classCode);
        const mergeStudentList = students.concat(internalStudents.map(s => (s.get())))
        const sortedStudentList = mergeStudentList.sort(dynamicSort("name", "asc"))
            .slice(offset, limit);

        return res.send({
            count: mergeStudentList.length,
            students: sortedStudentList
        });
    } catch (err) {
        console.log(err);
        res.status(INTERNAL_SERVER_ERROR).send("Opps something went wrong");
    }
}

StudentListingController.get('/class/:classCode/students', studentListingHandler);

export default StudentListingController;