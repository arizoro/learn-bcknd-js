// import {mkdir} from 'node.fs';

const fs = require('fs')

const folderName = process.argv[2] || 'Project'



// fs.mkdir('project',{recrusive: true} , (err) => {
//     console.log('didalam project')
//     if(err) throw err;
// })

try {
    fs.mkdirSync(folderName)
    fs.writeFileSync(`${folderName}/index.html`, '')
    fs.writeFileSync(`${folderName}/app.js`, '')
    fs.writeFileSync(`${folderName}/app.css`, '')
    console.log('file berhasil di buat')
    
} catch (error) {
    console.log(error)
}



// node boiler.js
// node rmdir project/
// node rm -rf project/
// node boiler.js web
// ls -all web/
