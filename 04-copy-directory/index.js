const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, 'files-copy');
const fileOutPath = path.join(__dirname, 'files');

if (fs.existsSync(filePath)){
    fs.readdir(filePath, (err,files) => {
        if(err){throw err}
              files.forEach(file => {
                    fs.unlink(path.join(filePath, file), ()=>{})              
                    })
            });
     fs.rmdir(filePath, ()=>{})
};
path.join(fileOutPath, 'test-text.txt');

fs.mkdir(filePath, {options: false}, () => {})//create folder

fs.readdir(fileOutPath, (error, files) => {
      files.forEach(file => {
            fs.copyFile(path.join(fileOutPath, file),path.join(filePath, file),() => {})
      
            })
    });
