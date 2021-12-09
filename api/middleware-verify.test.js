const {verifyString, verifyNumber, verifyStringLength, verifyEmptyArray, verifyUserType, verifyOrderStatus, verifyNull, verifyUndefined} = require("./middleware-verify");
const varString = "string";
const varNull = null;
const varNumber = 55;
const varArray = [{'key1':'value1'}];
const varObj = {'key1':'value1'};

test('test verifyUndefined', ()=>{
    expect(typeof unknown_variable === 'undefined').toBe(true);
    //??????????????????????????????????????????????????????????
    // expect(verifyUndefined(unknown_variable)).toBe(true); //
    //??????????????????????????????????????????????????????????
    expect(verifyUndefined(undefined)).toBe(true);
    expect(verifyUndefined(null)).toBe(false);
    expect(verifyUndefined(varString)).toBe(false);
    expect(verifyUndefined(varNull)).toBe(false);
    expect(verifyUndefined(varNumber)).toBe(false);
    expect(verifyUndefined(varArray)).toBe(false);
    
})

test('test verifyNull', ()=>{
    expect(verifyNull(null)).toBe(true);
    expect(verifyNull(varNull)).toBe(true);
})

test('test verifyString', ()=>{
    expect(verifyString(varString)).toBe(true);
    expect(verifyString(varNull)).toBe(false);
    expect(verifyString(varNumber)).toBe(false);
    expect(verifyString(varArray)).toBe(false);
    expect(verifyString(undefined)).toBe(false);
})

test('test verifyStringLength', ()=>{
    expect(verifyStringLength(2,10,varString)).toBe(true);
    expect(verifyStringLength(2,10,"a")).toBe(false);
    expect(verifyStringLength(2,10,"abcdefghijklmn")).toBe(false);
})

test('test verifyNumber', ()=>{
    expect(verifyNumber(varNumber)).toBe(true);
    expect(verifyNumber(varNull)).toBe(false);
    expect(verifyNumber(varArray)).toBe(false);
    expect(verifyNumber(undefined)).toBe(false);
    expect(verifyNumber(varString)).toBe(false);
})

test('test verifyEmptyArray', ()=>{
    expect(verifyEmptyArray([])).toBe(true);
    expect(verifyEmptyArray(varNumber)).toBe(false);
    expect(verifyEmptyArray(varNull)).toBe(false);
    expect(verifyEmptyArray(varArray)).toBe(false);
    expect(verifyEmptyArray(varObj)).toBe(false);
    expect(verifyEmptyArray(undefined)).toBe(false);
    expect(verifyEmptyArray(varString)).toBe(false);
})

test('test verifyUserType', ()=>{
    expect(verifyUserType("user")).toBe(true);
    expect(verifyUserType("admin")).toBe(true);
    expect(verifyUserType(varNumber)).toBe(false);
    expect(verifyUserType(varNull)).toBe(false);
    expect(verifyUserType(varArray)).toBe(false);
    expect(verifyUserType(undefined)).toBe(false);
    expect(verifyUserType(varString)).toBe(false);
})

test('test verifyOrderStatus', ()=>{
    expect(verifyOrderStatus("pending")).toBe(true);
    expect(verifyOrderStatus("shipped")).toBe(true);
    expect(verifyOrderStatus("delievered")).toBe(true);
    expect(verifyOrderStatus(varNumber)).toBe(false);
    expect(verifyOrderStatus(varNull)).toBe(false);
    expect(verifyOrderStatus(varArray)).toBe(false);
    expect(verifyOrderStatus(undefined)).toBe(false);
    expect(verifyOrderStatus(varString)).toBe(false);
})