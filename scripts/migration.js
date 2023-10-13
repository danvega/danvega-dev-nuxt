import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'

const CONTENT_DIR= "blog"
const BASE_DIR = process.argv[2] || `../content/${CONTENT_DIR}/`;
const DRY_RUN = false;

function getFilesFromDir(baseDir) {
    const files = fs.readdirSync(baseDir);
    let filesFound = [];

    files.forEach(file => {
        const filePath = path.join(baseDir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            filesFound = filesFound.concat(getFilesFromDir(filePath));
        } else if (path.extname(file) === '.md') {
            filesFound.push(filePath);
        }
    });

    return filesFound;
}

function extractDateFromFrontMatter(content) {
    const result = matter(content);
    return result.data.date
}

function extractDateParts(file,isoDate) {
    try {
        const match = isoDate.match(/^(\d{4})-(\d{2})-(\d{2})T/);
        if (match) {
            return {
                year: parseInt(match[1], 10),
                month: parseInt(match[2], 10),
                day: parseInt(match[3], 10)
            };
        }
    } catch (error) {
        console.log(error);
    }

    return null;
}

function processMdFiles() {
    const mdFiles = getFilesFromDir(BASE_DIR);

    mdFiles.forEach(file => {
        let content = fs.readFileSync(file, 'utf-8');
        const date = extractDateFromFrontMatter(content);
        const dateParts = extractDateParts(file,date);

        if(dateParts) {
            // update relative image paths
            content = updateImagePath(file,content,dateParts);
        }

        // update youtube links
        content = transformYouTubeLinks(content);

        if(!DRY_RUN) {
            fs.writeFileSync(file, content, 'utf-8');
        }
    });

    console.log("Migration Completed!");
}

function updateImagePath(file,content,dateParts) {
    const newImagePath = `/images/${CONTENT_DIR}/${dateParts.year}/${zeroPad(dateParts.month)}/${zeroPad(dateParts.day)}/`;
    return content.replace(/!\[([^\]]*)\]\(\.\//g, `![\$1](${newImagePath}`);
}

function zeroPad(number) {
    return number.toString().padStart(2, '0');
}

/*
`youtube:https://youtu.be/rUbjV3VY1DI`
:YouTube{id=rUbjV3VY1DI}
 */
function transformYouTubeLinks(content) {
    return content.replace(/`youtube:https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)`/g, (match, id) => {
        return `:YouTube{id=${id}}`;
    });
}

if(DRY_RUN) {
    console.log("START DRY RUN -----------------------------------------")
}

processMdFiles();


if(DRY_RUN) {
    console.log("END DRY RUN -----------------------------------------")
}