let moment = require('moment')
export default function getCurrentTime() {
    let currentDate = moment().format().slice(0,19).split('T').join(' ')
    console.log(currentDate);
    return currentDate
}