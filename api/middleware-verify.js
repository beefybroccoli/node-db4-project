function verifyString(input){
    if(input === null || input === undefined || typeof input !== "string" || input.trim()===""){
        return false;
    }else{
        return true;
    }
}

function verifyNumber(input){
    if(input === null || input === undefined || typeof input !== "number"){
        return false;
    }else{
        return true;
    }
}

module.exports = {verifyString, verifyNumber};