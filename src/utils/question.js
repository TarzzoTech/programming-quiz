const genArrayOfNumS = (num) => Array.from(Array(num).keys());

const getArrayOfUniqueNumS = (num, len) => {
    var arr = [];
    while(arr.length < num){
        var r = Math.floor(Math.random() * len);
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}

module.exports = {
    genArrayOfNumS,
    getArrayOfUniqueNumS
}
