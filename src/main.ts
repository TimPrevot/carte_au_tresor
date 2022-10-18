import * as fs from "fs";

const fileName: string = "entry_files/testfile1.txt";
let fileContent = fs.readFileSync(fileName, 'utf-8');
console.log(fileContent);
