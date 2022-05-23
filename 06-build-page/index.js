const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, 'project-dist');
const fileOutPath = path.join(__dirname, 'styles');

//create folder
fs.mkdir(filePath, {options: false}, () => {})
