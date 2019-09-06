import SparkMD5 from 'spark-md5'
import axios from 'axios'

export function getFileMD5(file, callBack) {
  var fileReader = new FileReader(),
    chunkSize = 2097152,
    chunks = Math.ceil(file.size / chunkSize),
    currentChunk = 0,
    spark = new SparkMD5()

  fileReader.onload = function(e) {
    spark.appendBinary(e.target.result)
    currentChunk++
    if (currentChunk < chunks) {
      loadNext()
    } else {
      callBack(spark.end())
    }
  }

  function loadNext() {
    var start = currentChunk * chunkSize,
      end = start + chunkSize >= file.size ? file.size : start + chunkSize
    
    fileReader.readAsBinaryString(file.slice(start, end))
  }
  loadNext()
}

export function uploadImage(file, token, callback) {
  let type = file.type
  getFileMD5(file, hash => {
    let url = 'http://shilin-1255431184.cos.ap-beijing.myqcloud.com'
    let config = {
      headers: {'Authorization':token}
    }
    var fd = new FormData()
    fd.append('key', "img/"+hash)
    fd.append('Content-Type', type)
    fd.append('file', file)
    axios.post(url, fd, config).then( res => {
      var imgurl = url + "/img/" + hash
      callback(imgurl)
    })

  })
}
