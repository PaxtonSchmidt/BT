export function consumeRowDataPacket(result: any): boolean {
    let numericalBoolResultArray: any = Object.values(result[0]);

    console.log(`numerical bool result = ${numericalBoolResultArray}`);

    if(numericalBoolResultArray[0] === 0) {
        return false
    }else {
        return true
    }
}