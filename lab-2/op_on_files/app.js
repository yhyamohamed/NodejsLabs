var fs = require('fs');


fs.rename('./test.txt', './info.txt', function(err) {
    if ( err ) console.log('ERROR: ' + err);
});

// write line 
fs.appendFile('./info.txt', 'hello ITI \n', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
  console.log('that was async')

fs.appendFileSync('./info.txt', 'hello ITI again \n');
console.log('that was sync')

//remove cpecific lines 

const removeLines = (data, lines = []) => {
    // data.split('\n') ==> [ '', 'hello ITI again ', 'hello ITI ' ]
    return data
        .split('\n')
        .filter((val, idx) => lines.indexOf(idx) === -1)
        .join('\n');
}

fs.readFile('./info.txt', 'utf8', (err, data) => {
    if (err) throw err;

    fs.writeFile('./info.txt', removeLines(data, [0, 1, 3]), 'utf8', function(err) {
        if (err) throw err;
        console.log("the lines have been removed.");
    });
})

//read json data 
    fs.readFile('./data.json', (err, data) => {
        if (err) throw err;
        let obj = JSON.parse(data);
        console.log('from read sync',obj);
    });
    console.log('that was sync ')

    let obj = fs.readFileSync('./data.json', (err, data) => {
        if (err) throw err;
        
    });
    obj = JSON.parse(obj);
    console.log('from read async',obj);
    console.log('that was async ')

//create dir 
const folderName = './test'

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName)
  }
} catch (err) {
  console.error(err)
}