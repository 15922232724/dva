export const NAME_SPACE = 'fileBucket'
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
 * 获取文件列表
 * @param {*} payload 
 */
export const getFileList = (payload) => {
  return { 
    type: `${NAME_SPACE}/getFileList`,
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
 * 获取
 * @param {*} payload 
 */
export const getFile = (payload) => {
  return { 
    type: `${NAME_SPACE}/getFile`,
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
 * 上传
 * @param {*} payload 
 */
export const uplodade = (payload) =>{
  return{
    type: `${NAME_SPACE}/uplodade`,
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
 * 删除文件
 * @param {*} payload 
 */
export const removeFile = (payload) =>{
  return{
    type: `${NAME_SPACE}/removeFile`,
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