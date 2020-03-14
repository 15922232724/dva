export const NAME_SPACE = 'role'
/**
 * 初始化角色分页
 */
export const initRoleList = () => {
  return { 
    type: `${NAME_SPACE}/initRoleList`
  }
}
/**
 * 初始化角色用户
 */
export const initRoleUserList = (payload) => {
  return { 
    type: `${NAME_SPACE}/initRoleUserList`,
    payload
  }
}
/**
 * 获取角色分页
 * @param {*} payload 
 */
export const getRoleList = (payload) => {
  return { 
    type: `${NAME_SPACE}/getRoleList`,
    payload
  }
}
/**
 * 获取角色用户分页
 * @param {*} payload 
 */
export const getRoleUserList = (payload) => {
  return { 
    type: `${NAME_SPACE}/getRoleUserList`,
    payload
  }
}
/**
 * 设置角色用户分页
 * @param {*} payload 
 */
export const putRoleUserList = (payload) => {
  return { 
    type: `${NAME_SPACE}/putRoleUserList`,
    payload
  }
}
/**
 * 移除角色用户
 * @param {*} payload 
 */
export const deleteRoleUserList = (payload) => {
  return { 
    type: `${NAME_SPACE}/deleteRoleUserList`,
    payload
  }
}

/**
 * 获取角色
 * @param {*} payload 
 */
export const getRole = (payload) => {
  return { 
    type: `${NAME_SPACE}/getRole`,
    payload
  }
}
/**
 * 保存角色
 * @param {*} payload 
 */
export const saveRole = (payload) =>{
  return{
    type: `${NAME_SPACE}/saveRole`,
    payload
  }
}
/**
 * 更新角色
 * @param {*} payload 
 */
export const updateRole = (payload) =>{
  return{
    type: `${NAME_SPACE}/updateRole`,
    payload
  }
}
export const hidenallocationModalIsShow = () =>{
  return{
    type: `${NAME_SPACE}/hidenallocationModalIsShow`
  }
}
export const showAllocationModalIsShow = () =>{
  return{
    type: `${NAME_SPACE}/showAllocationModalIsShow`
  }
}
/**
 * 删除角色
 * @param {*} payload 
 */
export const removeRole = (payload) =>{
  return{
    type: `${NAME_SPACE}/removeRole`,
    payload
  }
}
/**
 * 清理角色
 */
export const clearRole = () =>{
  return{
    type: `${NAME_SPACE}/clearRole`
  }
}