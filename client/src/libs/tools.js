
/**
 * 自定义数组的forEach方法
 * @param {一个数组} arr 
 * @param {一个方法} fn 
 */
export const forEach = (arr, fn) => {
    if (!arr.length || !fn) return;
    let i = -1;
    let len = arr.length;
    //循环数组
    while (++i < len) {
        let item = arr[i];
        fn(item, i, arr)
        // i++; 编程也是一种艺术...
    }
}

/**
 * 
 * @param {Array} targetarr 目标数组
 * @param {Array} arr  需要查询的数组
 */
export const hasOneOf = (targetarr, arr) => {
    return targetarr.some(_ => arr.indexOf(_) > -1);
}