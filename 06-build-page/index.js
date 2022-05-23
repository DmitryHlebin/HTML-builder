const path = require('path');
const fs = require('fs');
const fsPromise = require('fs/promises');

const { readdir, mkdir, readFile } = require('fs/promises');
const folderPath = path.join(__dirname, 'project-dist');
const newIndexPath = path.join(__dirname, 'project-dist/index.html');
const styleInPath = path.join(folderPath, 'style.css');
const styleOutPath = path.join(__dirname, 'styles');
const newAssetsPath = path.join(__dirname, 'project-dist', 'assets');
const oldAssetsPath = path.join(__dirname, 'assets');
const templatePath = path.join(__dirname, 'template.html');
const componentsPath = path.join(__dirname, 'components');

deleteFolder(folderPath);
	
function deleteFolder(folderPath) {
  
  
     


//create folder
fs.mkdir(folderPath, {options: false}, () => {});

//copy file template
fs.writeFile(newIndexPath, "", ()=>{
    fs.copyFile(path.join(__dirname, 'template.html'), newIndexPath,(err) => {
        if(err){throw err}
    });
});
//create style css
fs.writeFile(styleInPath, "", (err)=>{
        if(err){throw err}
 
});

//copy in style css
fs.readdir(styleOutPath, (err,files) => {
    if(err){throw err}
          files.forEach(file => {
               if(path.extname(file) == '.css'){
                    fs.readFile(path.join(styleOutPath, file), 'utf-8', (err, data) => {
                    let result = [];
                    if(err){throw err}
                    result.push(data);
                    fs.appendFile(styleInPath, result.toString(), ()=>{})
                   
                })
                  }  
                    })
                     });

// copy assets

const copyFiles = async function(oldAssetsPath, newAssetsPath) {
    await fsPromise.mkdir(newAssetsPath, {recursive: true});
    await fsPromise.rm(newAssetsPath, { recursive: true });
    await fsPromise.mkdir(newAssetsPath, {recursive: true});
        const dirents = await fsPromise.readdir(oldAssetsPath,{encoding: 'utf8', withFileTypes: true});
    for (const dirent of dirents) {
        if (dirent.isFile()) {
        await fsPromise.copyFile(path.join(oldAssetsPath, dirent.name), path.join(newAssetsPath, dirent.name));
        } else if (dirent.isDirectory()) {
        await copyFiles(path.join(oldAssetsPath, dirent.name), path.join(newAssetsPath, dirent.name));
        }
    }
    };
copyFiles(oldAssetsPath, newAssetsPath)

// fill in index html 
fs.writeFile(newIndexPath, '', () => insertComponents(templatePath, componentsPath, newIndexPath));
function insertComponents(tPath, cPath, hPath) {
  let htmlContent = '';

  readFile(tPath, 'utf-8')
    .then((data, e) => {
      if (e) throw e;
      htmlContent += data;
    })
    .then(() => {
      fs.readdir(cPath, (e, files) => {
        if (e) throw e;

        files.forEach(file => {
          const filePath = path.join(cPath, file);
    
          fs.stat(filePath, (e, stats) => {
            if (e) throw e;
            
            if (stats.isFile() && path.extname(filePath) === '.html') {
              const fileName = file.substr(0, file.lastIndexOf('.'));
              const templateRE = new RegExp(`{{${fileName}}}`, 'g');
              let componentContent = '';
              
              readFile(filePath, 'utf-8')
                .then((data, e) => {
                  if (e) throw e;
                  componentContent += data;
                })
                .then(() => {
                  htmlContent = htmlContent.replace(templateRE, componentContent);
                  fs.writeFile(hPath, htmlContent, e => { if (e) throw e; });
                });
            }
          });
        });
      });
    });
}

