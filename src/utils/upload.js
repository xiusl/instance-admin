import SparkMD5 from 'spark-md5'

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
