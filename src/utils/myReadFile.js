const fs = require("fs/promises");
const path = require("path");

const myReadFile = async (filename) => {
    const data = await fs.readFile(path.join(process.cwd(),"db",filename),"utf-8")
    return JSON.parse(data)
};

module.exports = myReadFile;