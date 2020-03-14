export const NAME_SPACE = 'parameter'
/**
 * 初始化list
 */
export const initList = () => {
  return { 
    type: `${NAME_SPACE}/initList`
  }
}
/**
 * 获取列表
 * @param {*} payload 
 */
export const getList = (payload) => {
  return { 
    type: `${NAME_SPACE}/getList`,
    payload
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
 * 删除
 * @param {*} payload 
 */
export const remove = (payload) =>{
  return{
    type: `${NAME_SPACE}/remove`,
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