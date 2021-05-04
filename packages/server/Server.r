# server.R
#install.packages("devtools", repos = "http://cran.us.r-project.org")
install.packages(c("plumber", "jsonlite", "httr", "magrittr", "dplyr", "tidyr"), repos = "http://cran.us.r-project.org")
#install_github("rstudio/plumber")
library(plumber)

# 'app.R' is the location of the file containing your endpoint functions
server <- plumb("App.r")

# get port number from environment variable
env_port = strtoi(Sys.getenv("PORT"))
port <- ifelse(is.na(env_port), 8080, env_port)
print(port)
server$run(port=port, host='0.0.0.0', swagger=TRUE)