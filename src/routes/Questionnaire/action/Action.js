export const NAME_SPACE = 'home'
/**
 * 初始化list
 */
export const initList = () => {
  return { 
    type: `${NAME_SPACE}/initList`
  }
}
/**
 * 获取
 * @param {*} payload 
 */
export const get = (payload) => {
  return { 
    type: `${NAME_SPACE}/get`,
    payload
  }
}
/**
 * 保存
 * @param {*} payload 
 */
export const save = (payload) =>{
  return{
    type: `${NAME_SPACE}/save`,
    payload
  }
}

/**
 * 清理
 */
export const clear = () =>{
  return{
    type: `${NAME_SPACE}/clear`
  }
}