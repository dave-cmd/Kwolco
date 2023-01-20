# Jumia Web Scrape & Data Visualization

## Getting Started

These instructions will give you a copy of the project up and running on
your local machine for development and testing purposes. See deployment
for notes on deploying the project on a live system.

### Prerequisites

    docker runtime
    python3
    node

### Installing

Clone the repository:
`    git clone "https://github.com/dave-cmd/Kwolco"`

Navigate into the working directory:

contents -> Directories = [ApolloServer, Client]
-> Files [requirements.txt, scrapper.py, pipeline.py, JumiaPipeline.ipynb]

Python3 - Create a virtual environment and run [ pipenv shell ] or [ python3 -m venv venv ] - Install python dependancies [ pip install -r requirements.txt ]
`$ pip install -r requirements.txt`
Docker - Install docker container runtime

Node - Install node

## Execution steps

1. Run the web scapper by runnning [python3 scrapper.py], a scrapped_data.py will be generated in the current directory.
   `$ python3 scrapper.py`

2. Create a postgres docker container by running :
   `$docker run -it \
-e POSTGRES_USER="root" \
-e POSTGRES_PASSWORD="root" \
-e POSTGRES_DB="jumia" \
-v $(pwd)/jumia_postgres_data:/var/lib/postgresql/data \
-p 5432:5432 \
postgres:13
`
3. Run [ A postgresql container running on port 5432 ]
   `$docker ps `
4. Run the ApolloServer:
   `$ cd ApolloServer`
   ` $ npm install`
   `$ npm start
`
   This creates a table in the postgres database "jumia" and a table named "product"

5. Run the pipeline.py file -
   `$ python3 pipeline.py
 `
   OR - run
   `jupyter notebook
`
   select the JumiaPipeline.ipynb file and run the cells
   The pipeline cleans and writes the scrapped data in postgres database "jumia" in a table name "product"

6. Run the react Client -
   `$ cd Clinet
`
   `$ npm install
`
   `$ npm start
`

## Author

- **David Kanjuru**
