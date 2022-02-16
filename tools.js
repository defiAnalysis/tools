// 将科学计数法数值转为字符串
function scientificNotationToString(param) {
    let strParam = String(param)
    let flag = /e/.test(strParam)
    if (!flag) return param
    // 指数符号 true: 正，false: 负
    let sysbol = true
    if (/e-/.test(strParam)) {
      sysbol = false
    }
    // 指数
    let index = Number(strParam.match(/\d+$/)[0])
    // 基数
    let basis = strParam.match(/^[\d\.]+/)[0].replace(/\./, '')
    if (sysbol) {
      return basis.padEnd(index + 1, 0)
    } else {
      return basis.padStart(index + basis.length, 0).replace(/^0/, '0.')
    }
  }

//判断是否为0
  export function isStringEmpty(param){
    if(typeof param == "undefined" || param == null || param == ""){
        return true;
    }else{
        return false;
    }
  }

