export const NAME_SPACE = 'accountsetting'
/**
 * 初始化list
 */
export const init = () => {
  return { 
    type: `${NAME_SPACE}/init`
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
 * 更新
 * @param {*} payload 
 */
export const update = (payload) =>{
  return{
    type: `${NAME_SPACE}/update`,
    payload
  }
}
/**
 * 更新
 * @param {*} payload 
 */
export const changePassword = (payload) =>{
  return{
    type: `${NAME_SPACE}/changePassword`,
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