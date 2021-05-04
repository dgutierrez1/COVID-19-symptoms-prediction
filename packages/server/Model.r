
executeModel = function(data){
      require(tidyr)
  require(dplyr)
  require(magrittr)
  require(httr)
  require(jsonlite)
    class(data)
    str(data)
    summary(data)
    data = data.frame(data)
    class(data)
    str(data)
    summary(data)
  print('Executing model...');
  model = load('./model.RData')
    print('Executed model...');
    pred = predict(logit.CV.rose.sampling, newdata=data)
    list(result = pred)
}
