export const NAME_SPACE = 'dict'
/**
 * 初始化字典分页
 */
export const initDictList = () => {
  return { 
    type: `${NAME_SPACE}/initDictList`
  }
}
/**
 * 获取字典分页
 * @param {*} payload 
 */
export const getDictList = (payload) => {
  return { 
    type: `${NAME_SPACE}/getDictList`,
    payload
  }
}
/**
 * 获取字典
 * @param {*} payload 
 */
export const getDict = (payload) => {
  return { 
    type: `${NAME_SPACE}/getDict`,
    payload
  }
}
/**
 * 获取字典值
 * @param {*} payload 
 */
export const getDictValue = (payload) => {
  return { 
    type: `${NAME_SPACE}/getDictValue`,
    payload
  }
}
/**
 * 保存字典类型
 * @param {*} payload 
 */
export const saveDict = (payload) => {
  return { 
    type: `${NAME_SPACE}/saveDict`,
    payload
  }
}
/**
 * 保存字典值
 * @param {*} payload 
 */
export const saveDictValue = (payload) => {
  return { 
    type: `${NAME_SPACE}/saveDictValue`,
    payload
  }
}
/**
 * 更新字典类型
 * @param {*} payload 
 */
export const updateDict = (payload) => {
  return { 
    type: `${NAME_SPACE}/updateDict`,
    payload
  }
}
/**
 * 更新字典值
 * @param {*} payload 
 */
export const updateDictValue = (payload) => {
  return { 
    type: `${NAME_SPACE}/updateDictValue`,
    payload
  }
}
/**
 * 删除字典类型
 * @param {*} payload 
 */
export const removeDict = (payload) => {
  return { 
    type: `${NAME_SPACE}/removeDict`,
    payload
  }
}
/**
 * 删除字典值
 * @param {*} payload 
 */
export const removeDictValue = (payload) => {
  return { 
    type: `${NAME_SPACE}/removeDictValue`,
    payload
  }
}
/**
 * 清除字典
 * @param {*} payload 
 */
export const clearDict = () => {
  return { 
    type: `${NAME_SPACE}/clearDict`
  }
}
