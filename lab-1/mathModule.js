function sumMethod(num1,num2){
    if(isNaN(num1) )
        return(`${num1} is not a number`)
    else if(isNaN(num2) )
        return(`${num2} is not a number`)
    else
    return num2+num2;
}

function multiMethod(num1,num2){
    if(isNaN(num1) )
    return(`${num1} is not a number`)
else if(isNaN(num2) )
    return(`${num2} is not a number`)
else
return num2*num2;
}

export const sum=sumMethod ;
export const  multi =multiMethod ;