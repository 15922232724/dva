export const NAME_SPACE = 'user'
/**
 * 初始化分页
 */
export const initList = () => {
  return { 
    type: `${NAME_SPACE}/initList`
  }
}
/**
 * 获取分页
 * @param {*} payload 
 */
export const getList = (payload) => {
  return { 
    type: `${NAME_SPACE}/getList`,
    payload
  }
}
/**
 * 获取用户
 * @param {*} payload 
 */
export const getUser = (payload) => {
  return { 
    type: `${NAME_SPACE}/getUser`,
    payload
  }
}
/**
 * 保存用户
 * @param {*} payload 
 */
export const saveUser = (payload) =>{
  return{
    type: `${NAME_SPACE}/saveUser`,
    payload
  }
}
/**
 * 更新用户
 * @param {*} payload 
 */
export const updateUser = (payload) =>{
  return{
    type: `${NAME_SPACE}/updateUser`,
    payload
  }
}
/**
 * 删除用户
 * @param {*} payload 
 */
export const removeUser = (payload) =>{
  return{
    type: `${NAME_SPACE}/removeUser`,
    payload
  }
}
/**
 * 清理用户
 */
export const clearUser = () =>{
  return{
    type: `${NAME_SPACE}/clearUser`
  }
}