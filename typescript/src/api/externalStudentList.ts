import axios from "axios";
import { StudentListResponse } from "StudentList";

export const fetchExternalStudentList = async (classCode: string, offset: number = 0, limit: number = 100): Promise<StudentListResponse> => {
    const url = `http://localhost:5000/students?class=${classCode}&offset=${offset}&limit=${limit}`;
    const response = await axios.get(url);
    return response.data;
}