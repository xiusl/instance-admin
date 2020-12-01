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

/*
export function uploadToQingCloud(file, filename, token, headers, callback) {
    const config = new Config().loadConfig({
        'host': 'qingstor.com',
        'port': '443',
        'protocol': 'https',
        'log_level': 'debug',
    });
    console.log(config)
    const qsService = new QingStor(config);
    const bucket = qsService.Bucket('likebit', 'pek3b');
    
    const putObjectRequest = bucket.putObjectRequest(file.name, file);
    putObjectRequest.applySignature(token)
    req.send((error, response) => {
                if (error) {
                    console.log(req.url + " request failed", error);
                    return
                }
                console.log(req.url + ' finished request.');
                console.log(response);
            });

}
*/
export function uploadToQingCloud(file, token, date, filename, callback) {
    let url = 'https://likebit.pek3b.qingstor.com/' + filename
    let config = {
        headers: {
            'Content-Type': file.type == "" ? "application/octet-stream" : file.type,
            'Authorization': token,
            'x-qs-date': date
        }
    } 
    axios.put(url, file, config).then(res => {
        callback(res)
    })
}
