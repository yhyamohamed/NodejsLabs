export const greeting = (na,bd)=>{
if(+bd > 2020)
    return `sry ${bd} is not accepted`;
let currentYear =new Date().getFullYear()
    return `Hello ${na} your age now is ${currentYear - bd}`;
}