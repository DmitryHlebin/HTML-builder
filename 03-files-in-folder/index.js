const path = require('path');
const fs = require('fs');
const { dirname } = require('path');
const filePath = path.join(__dirname, 'secret-folder');

fs.readdir(filePath, {withFileTypes: true}, (error, files) => {

    files.forEach(file => {
            if(file.isFile()){
                 console.log(file.name.split('.').slice(0, -1).join('.')+'  '+path.extname(file.name)+'  '+fs.statSync('03-files-in-folder/secret-folder/'+file.name).size+'b');
    
            }

    });

  });