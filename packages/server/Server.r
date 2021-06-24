install.packages(c("plumber", "jsonlite", "httr", "magrittr", "dplyr", "tidyr"), repos = "http://cran.us.r-project.org")
library(plumber)

# Load server
server <- plumb("App.r")

# Set port number
env_port = strtoi(Sys.getenv("PORT"))
port <- ifelse(is.na(env_port), 8080, env_port)

# Run server
server$run(port=port, host='0.0.0.0', swagger=TRUE)