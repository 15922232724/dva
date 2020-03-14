import $$ from 'cmn-utils';
/**
 * 从file对象获取file信息
 * @param {*} fileData 
 */
const getFileInfo = (fileData)=>{
  let fileurl;
  if(fileData.fileBucket && fileData.fileBucket.storageLocation==='ALIYUN_OSS'){
    fileurl=`http://${fileData.fileBucket.tripleBucketUrl}/${fileData.fileId}`;
  }
  if(fileData.fileBucket && fileData.fileBucket.storageLocation==='DB'){
    fileurl=`/api/db-file/${fileData.fileId}`;
  }


  return{
    // 文件地址
    fileUrl:fileurl,
    // 文件地址含密钥
    fileUrlAuth: `${fileurl}?Authorization=${$$.getStore("token")}`,
    // 文件名称
    fileName:fileData.name,
  }

}

export {getFileInfo};