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
    if(input === null || input === undefined || isNaN(input) === true){
        return false;
    }else{
        return true;
    }
}

//verify the length of a string between min and max
function verifyStringLength(min, max, inputStr){
    if(inputStr.length < min || inputStr.length > max){
        return false;
    }else{
        return true;
    }
}

function verifyEmptyArray (array){
    return  array.length === 0;
}

function verifyUserType(user_type){
    return (user_type === "admin" || user_type === "user");
}



module.exports = {verifyString, verifyNumber, verifyStringLength, verifyEmptyArray, verifyUserType};