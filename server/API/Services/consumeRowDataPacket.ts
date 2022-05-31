export function consumeRowDataPacket(result: any): boolean {
    let numericalBoolResultArray: any = Object.values(result[0]);
    if(numericalBoolResultArray[0] === 0) {
        return false
    }else {
        return true
    }
}