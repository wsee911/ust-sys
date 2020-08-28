export interface WorkloadDBResult {
    teacherId: number;
    subjectId: number;
    classCount: number;
    subjectName: string;
    subjectCode: string;
    teacherName: string;
}

export interface WorkloadReports {
    [key: string]: WorkloadReport[];
}

export interface WorkloadReport {
    classCount: number;
    subjectName: string;
    subjectCode: string;
}