import { readFile, appendFile, writeFile } from "fs/promises"
import path from "path"

const getFilePath = (filename:string):string => path.join(__dirname, "../db/", filename);

export const readingFile = async (filename: string): Promise<string> => {
    try{
        const fileContent = await readFile(getFilePath(filename), { encoding: 'utf8' });
        return fileContent.toString();
    } catch (err) {
        throw err;
    }
}

export const appendingToFile = async (filename: string, content: string) => {
    try{
        await appendFile(filename, content, {flag: 'a'});
        // const fileContent = await readFile(getFilePath(filename));
    } catch (err) {
        throw err;
    }
}

export const writingToFile = async (filename: string, content: string) => {
    try{
        await writeFile(getFilePath(filename), content);
        // const fileContent = await readFile(getFilePath(filename));
        // console.log("Overwritten File Content is this: ", fileContent.toString());
    } catch (err) {
        throw err;
    }
}


// const start = async () => {    
//     await readingFile("./sample.txt");
//     await appendingToFile("./sample.txt", "\n Now Be Happy");
//     await writingToFile("./sample.txt", "Only Be Happy");
// }

// start();