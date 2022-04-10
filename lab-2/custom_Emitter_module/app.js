const Emitter = require('./emitter');

let emObj = new Emitter();

emObj.on('talk',(name)=>{
    console.log(`${name} is saying some stuff`)
})

emObj.on('leave',()=>{
    console.log(`is leaving`)
})

emObj.emit('talk','yaya')
//test sending no args
emObj.emit('leave')