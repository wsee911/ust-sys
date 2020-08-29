import { WorkloadDBResult } from "Workload";
import { Builder } from "builder-pattern";
import { WorkloadService } from "../WorkloadService";
import sequelize from "../../config/database";

jest.mock("sequelize");

describe("Workload Service", () => {
    const mockDBRes = [
        Builder<WorkloadDBResult>()
            .teacherId(1)
            .subjectId(1)
            .classCount(3)
            .subjectName("Mathematics")
            .subjectCode("MATH")
            .teacherName("teacher 1")
            .build(),
        Builder<WorkloadDBResult>()
            .teacherId(1)
            .subjectId(2)
            .classCount(3)
            .subjectName("English")
            .subjectCode("ENG")
            .teacherName("teacher 1")
            .build(),
        Builder<WorkloadDBResult>()
            .teacherId(2)
            .subjectId(2)
            .classCount(3)
            .subjectName("English")
            .subjectCode("ENG")
            .teacherName("teacher 2")
            .build(),
        Builder<WorkloadDBResult>()
            .teacherId(2)
            .subjectId(3)
            .classCount(3)
            .subjectName("Science")
            .subjectCode("SN")
            .teacherName("teacher 2")
            .build(),
        Builder<WorkloadDBResult>()
            .teacherId(3)
            .subjectId(3)
            .classCount(3)
            .subjectName("SAINS")
            .subjectCode("SN")
            .teacherName("teacher 3")
            .build(),
        Builder<WorkloadDBResult>()
            .teacherId(3)
            .subjectId(1)
            .classCount(3)
            .subjectName("Mathematics")
            .subjectCode("MATH")
            .teacherName("teacher 3")
            .build(),
        Builder<WorkloadDBResult>()
            .teacherId(3)
            .subjectId(2)
            .classCount(3)
            .subjectName("English")
            .subjectCode("ENG")
            .teacherName("teacher 3")
            .build(),
    ];
    it("should fetch workload from database", async () => {
        const expectedResult = {
            'teacher 1': [
                { classCount: 3, subjectName: 'Mathematics', subjectCode: 'MATH' },
                { classCount: 3, subjectName: 'English', subjectCode: 'ENG' }
            ],
            'teacher 2': [
                { classCount: 3, subjectName: 'English', subjectCode: 'ENG' },
                { classCount: 3, subjectName: 'Science', subjectCode: 'SN' }
            ],
            'teacher 3': [
                { classCount: 3, subjectName: 'SAINS', subjectCode: 'SN' },
                { classCount: 3, subjectName: 'Mathematics', subjectCode: 'MATH' },
                { classCount: 3, subjectName: 'English', subjectCode: 'ENG' }
            ]
        };

        const workloadService = new WorkloadService();
        sequelize.query = jest.fn().mockResolvedValue(mockDBRes);

        const output = await workloadService.fetchWorkload();
        expect(expectedResult).toEqual(output);
    })
})