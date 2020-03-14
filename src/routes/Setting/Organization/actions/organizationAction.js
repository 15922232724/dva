export const NAME_SPACE = 'organization'
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
 * 获取组织
 * @param {*} payload 
 */
export const getOrganization = (payload) => {
  return { 
    type: `${NAME_SPACE}/getOrganization`,
    payload
  }
}
/**
 * 保存组织
 * @param {*} payload 
 */
export const saveOrganization = (payload) =>{
  return{
    type: `${NAME_SPACE}/saveOrganization`,
    payload
  }
}
/**
 * 更新组织
 * @param {*} payload 
 */
export const updateOrganization = (payload) =>{
  return{
    type: `${NAME_SPACE}/updateOrganization`,
    payload
  }
}
/**
 * 删除组织
 * @param {*} payload 
 */
export const removeOrganization = (payload) =>{
  return{
    type: `${NAME_SPACE}/removeOrganization`,
    payload
  }
}
// /**
//  * 清理用户
//  */
export const clearOrganization = () =>{
  return{
    type: `${NAME_SPACE}/clearOrganization`
  }
}