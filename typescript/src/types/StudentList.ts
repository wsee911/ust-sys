export interface StudentListResponse {
    count: number;
    students: StudentResponse[];
}

export interface StudentResponse {
    id: number;
    name: string;
    email: string;
}