const fs = require('fs');
const path = require('path');
    fs.writeFile(
        'text.txt',
        ' ',
        (err) => {
        if (err) throw err;
        console.log('Hi!');
        }
    );
    process.stdin.on('data', data => {
        fs.appendFile(
            'text.txt',
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
