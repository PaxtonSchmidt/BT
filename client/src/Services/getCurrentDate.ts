let moment = require('moment')
export default function getCurrentDate() {
    let currentDate = moment().format().slice(0,19).split('T').join(' ')
    return currentDate
}