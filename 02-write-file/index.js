const fs = require('fs');
const path = require('path');
    fs.writeFile(
      path.join(__dirname, 'text.txt'),
        ' ',
        (err) => {
        if (err) throw err;
        console.log('Hi!');
        }
    );
    process.stdin.on('data', data => {
        fs.appendFile(
          path.join(__dirname, 'text.txt'),
            data,
            (err) => {
              if (err) throw err;
              console.log('ещё');
            }
            
          );
          if (String(data).trim() == 'exit') {
            console.log('See ya!');
            process.exit();
          }
    }); 
    process.on('SIGINT', function () {
        console.log('See ya!');
        process.exit();
      });
