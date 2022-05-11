## Store Manager

Back-end project made while studying at Trybe, a web development school.

This was my first __RESTful__ _API_ made using the __MSC__ (model-service-controller) architecture.
This API is a sales management system which is possible to create, read, update and delete (_CRUD_) products and sales.
The databank used to manage data was _MySQL_.
The API also has all of its __MSC__ layers covered with 100% of unit tests using __Mocha__, __Chai__ and __Sinon__.

### How to run the project

#### With Docker
```bash

    # Run the container in the background
    $ docker-compose up -d

    # Get access to a interactive terminal of the container made by the compose
    $ docker exec -it store_manager bash

    # Install the dependencies
    $ npm install
    
    # Start the project
    $ npm start
```

#### Without Docker
```bash

    # Clone the repository
    $ git clone git@github.com:RafaelCunhaS/Project-Store-Manager.git

    # Go into the project's directory
    $ cd Project-Store-Manager

    # Install the dependencies
    $ npm install

    # Start the project
    $ npm start
```
