
/*
* configurations
*
* types:
*    Integer
*    Decimal
*    Number
*    Int&Alph (string value may only contain alphabetical letter and Integer)
*    Int|Alph (string value may only contain alphabetical letter or Integer) 
*    String
*
* string values(whose type is String only) can have a pattern(a RegExp instance)
*
* Number values(Integer|Decimal|Number) can have range and digitNum
*
* example: 
* [{
*    name: "ID",
*    type: "String",
*    pattern: /\w/
* },
* {
*     name: "x",
*     type: "Integer",
*     digitNum: [1, //floor limit of digits before decimal point
             1, //upper limit of digits before decimal point
             2, //floor limit of digits after decimal point
             2] //upper limit of digits after decimal point
*     range: [0, 10]
* },
* {
*     name: "y",
*     type: "Integer"
* },
* {
*     name: "z",
*     type: "Integer"
* }]
*/

//the record format of the first record
const FIRST_RECORD_FORMAT = [{
    name: "ID",
    type: "Int&Alph"
},
{
    name: "x",
    type: "Integer"
},
{
    name: "y",
    type: "Integer"
},
{
    name: "z",
    type: "Integer"
}]



// the record format of records other than the first
const RECORD_FROMAT = [{
    name: "ID",
    type: "Int&Alph"
},
{
    name: "x",
    type: "Integer"
},
{
    name: "y",
    type: "Integer"
},
{
    name: "z",
    type: "Integer"
},
{
    name: "ox",
    type: "Integer"
},
{
    name: "oy",
    type: "Integer"
},
{
    name: "oz",
    type: "Integer"
}]

function _calc (record) {
    record.x += record.ox
    record.y += record.oy
    record.z += record.oz
}

// the built-in check operations only check the format
//   of one record msg, additional check is applied by this function
function _check (record, last) {
    if (last) {
        // not first
        return last.x === record.x
            && last.y === record.y
            && last.z === record.z
    } else {
        // first
        return true
    }
}

module.exports.FIRST_RECORD_FORMAT = FIRST_RECORD_FORMAT
module.exports.RECORD_FROMAT = RECORD_FROMAT
module.exports._check = _check
module.exports._calc = _calc