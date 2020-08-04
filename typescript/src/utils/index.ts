import fs from 'fs';
import csv from 'csv-parser';
import { CsvItem } from 'CsvItem';
import { Teacher, Student, Subject, Class } from '../models';


export const convertCsvToJson = (filePath: string): Promise<CsvItem[]> => {
  const results: CsvItem[] = [];
  const stream = fs.createReadStream(filePath).pipe(csv());

  return new Promise((resolve, reject) => {
    stream.on('data', (data: CsvItem) => results.push(data));
    stream.on('end', () => resolve(results));
    stream.on('error', (err) => reject(err));
  });
}

export const isNewValue = (checkVal: string, model: Teacher | Student | Subject | Class): boolean => {
  return (checkVal !== model.get('name'));
}
