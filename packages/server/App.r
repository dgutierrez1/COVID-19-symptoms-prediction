source('./Model.r')

#' @filter cors
cors <- function(req, res) {
  
  res$setHeader("Access-Control-Allow-Origin", "*")
  
  if (req$REQUEST_METHOD == "OPTIONS") {
    res$setHeader("Access-Control-Allow-Methods","*")
    res$setHeader("Access-Control-Allow-Headers", req$HTTP_ACCESS_CONTROL_REQUEST_HEADERS)
    res$status <- 200 
    return(list())
  } else {
    plumber::forward()
  }
  
}

#' @param data data
#' @post /api/v1/ml
#' @serializer unboxedJSON
function(req){
    body = jsonlite::fromJSON(req$postBody)
    print('Data received...')
    print(body)
    executeModel(body)
}

print('Server running')