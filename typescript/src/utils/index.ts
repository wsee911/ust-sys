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

export const isNewValue = (checkVal: string, attr: string, model: Teacher | Student | Subject | Class): boolean => {

  console.log(`${checkVal} --- ${model.get(attr)}`);
  return (checkVal !== model.get(attr));
}

export const dynamicSort = (property: string, order: string) => {
  var sort_order = 1;
  if (order === "desc") {
    sort_order = -1;
  }
  return (a: any, b: any) => {
    // a should come before b in the sorted order
    if (a[property] < b[property]) {
      return -1 * sort_order;
      // a should come after b in the sorted order
    } else if (a[property] > b[property]) {
      return 1 * sort_order;
      // a and b are the same
    } else {
      return 0 * sort_order;
    }
  }
}
