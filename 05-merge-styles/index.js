const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, 'project-dist/bundle.css');
const fileOutPath = path.join(__dirname, 'styles');
// clear bundle
if (fs.existsSync(filePath)){
    fs.readdir(filePath, (err,files) => {})      
};
//create bundle.css
fs.writeFile(filePath, "", ()=>{})

//read folder styles
fs.readdir(fileOutPath, (err,files) => {
    if(err){throw err}
          files.forEach(file => {
               if(path.extname(file) == '.css'){
                
                    fs.readFile(path.join(fileOutPath, file), 'utf-8', (err, data) => {
                    let result = [];
                    if(err){throw err}
                    result.push(data);
                    fs.appendFile(filePath, result.toString(), ()=>{})
                   
                })

            
               }  
                })
        });

        