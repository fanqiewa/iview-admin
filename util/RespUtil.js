let writeResult = (status, msg, data) => {
    return JSON.stringify({code: status, msg: msg, data: data});
}
module.exports.writeResult = writeResult;