//verify input is not null, not undefined and not empty
//verify input is a type of string
function verifyString(input){
    if(input === null || input === undefined || typeof input !== "string" || input.trim()===""){
        return false;
    }else{
        return true;
    }
}

//verify the input is not null, not undefined
//verify the input is a type of number
function verifyNumber(input){
    if(input === null || input === undefined || typeof input !== "number"){
        return false;
    }else{
        return true;
    }
}

module.exports = {verifyString, verifyNumber};