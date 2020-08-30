import { Builder } from "builder-pattern";
import { Student } from "../../models/StudentModel";
import * as externalStudentList from "../../api/externalStudentList";
import { StudentService } from "../StudentService";

describe("Student Service", () => {
    const mockExternalStudents = {
        "count": 46,
        "students": [
            {
                "id": 23,
                "name": "Celie",
                "email": "celie@gmail.com"
            },
            {
                "id": 20,
                "name": "Celka",
                "email": "celka@gmail.com"
            },
            {
                "id": 44,
                "name": "Christen",
                "email": "christen@gmail.com"
            },
            {
                "id": 0,
                "name": "Christye",
                "email": "christye@gmail.com"
            },
            {
                "id": 43,
                "name": "Cindelyn",
                "email": "cindelyn@gmail.com"
            },
            {
                "id": 13,
                "name": "Claudetta",
                "email": "claudetta@gmail.com"
            },
            {
                "id": 22,
                "name": "Corrine",
                "email": "corrine@gmail.com"
            },
            {
                "id": 39,
                "name": "Cyndi",
                "email": "cyndi@gmail.com"
            },
            {
                "id": 1,
                "name": "Dode",
                "email": "dode@gmail.com"
            },
            {
                "id": 26,
                "name": "Dyanne",
                "email": "dyanne@gmail.com"
            }
        ]
    }
    describe("fetch student list", () => {
        it("should error student list", async () => {
            const mockInternalStudents = [
                Builder<Student>()
                    .get(() => ({
                        id: 1,
                        name: "Chua",
                        email: "bat@gmail.com",
                    }))
                    .build(),
                Builder<Student>()
                    .get(() => ({
                        id: 2,
                        name: "Siti",
                        email: "superman@gmail.com",
                    }))
                    .build(),
                Builder<Student>()
                    .get(() => ({
                        id: 3,
                        name: "Ahmad",
                        email: "wonder@gmail.com",
                    }))
                    .build(),
                Builder<Student>()
                    .get(() => ({
                        id: 4,
                        name: "Brad",
                        email: "man@gmail.com",
                    }))
                    .build(),
            ];

            const expectedOutput = {
                count: 14,
                students: [
                    { id: 23, name: 'Celie', email: 'celie@gmail.com' },
                    { id: 20, name: 'Celka', email: 'celka@gmail.com' },
                    { id: 44, name: 'Christen', email: 'christen@gmail.com' },
                    { id: 0, name: 'Christye', email: 'christye@gmail.com' },
                    { id: 1, name: 'Chua', email: 'bat@gmail.com' },
                    { id: 43, name: 'Cindelyn', email: 'cindelyn@gmail.com' },
                    { id: 13, name: 'Claudetta', email: 'claudetta@gmail.com' },
                    { id: 22, name: 'Corrine', email: 'corrine@gmail.com' }
                ]
            };

            jest.spyOn(externalStudentList, "fetchExternalStudentList").mockResolvedValue(mockExternalStudents);
            const studentService = new StudentService();

            Student.findAll = jest.fn().mockReturnValue(mockInternalStudents);

            const studentList = await studentService.fetchStudentList("P1-1", 2, 10);
            expect(studentList).toEqual(expectedOutput);
        });
    });
})