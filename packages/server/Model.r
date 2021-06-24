require(tidyr)
require(dplyr)
require(magrittr)
require(httr)
require(jsonlite)

executeModel = function(data){
  data_df = data.frame(data)
  print('Data frame received...');
  summary(data_df)
  print('Executing model...');
  model = load('./model.RData')
  pred = predict(tree.model.over, newdata=data_df)
  print('Executed model...');
  print(pred)
  list(result = pred)
}
