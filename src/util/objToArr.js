export const objToArray = obj => {
    let data_array = []
    if (obj instanceof Object) {
        Object.keys(obj).map(item => {
            let stashObj = {}
            stashObj[item] = obj[item]
            data_array.push(stashObj)
        })
    }
    return data_array
}
