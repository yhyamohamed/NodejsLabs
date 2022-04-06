import { sum, multi } from './mathModule.js';
import {greeting} from './greetings.js';
import util from 'util';


let res  = util.format('adding (a,5) : %s', sum('a',5));
console.log(res)

res  = util.format('adding (5,"A") : %s', sum(5,'A'));
console.log(res)

res  = util.format('adding (10,5) : %s', sum(10,5));
console.log(res)

// multi
console.log(multi('a',5))
console.log(multi(5,'A'))
console.log(multi(10,5))

// greeting


res  = util.format('greeting for yaya : %s', greeting('yaya',1991));
res  = util.format('greeting for yaya : %s', greeting('yaya',2022));
console.log(res)
