# Software Containerization

## Docker + REST API setup

# Give the right permissions to docker to set up
```sudo setfacl --modify user:<your_username>:rw /var/run/docker.sock```

# Build the docker
```docker build -t software_containerization_docker .```

# Run the docker, which starts with 5000 as default port which is hardcoded in Dockerfile and server.js
```docker run -p 5000:5000 -d software_containerization_docker```

# Run the docker with a custom <port> of choice 
docker run -e PORT=<port> -p <port>:<port> -d software_containerization_docker

GET call

```curl -i http://localhost:/```

GET with ID call 

```curl -i http://localhost:<5000>/<id_number>```

POST call

```curl -i -X POST http://localhost:<5000>```

PUT call

```curl -i -X PUT http://localhost:<5000>```

DELETE call

```curl -i -X DELETE http://localhost:<5000>```

# To update the docker settings or server.js code do:

```docker ps```

find the container id you want to stop

```docker stop <container_id>```

or if you want to stop all docker containers

```docker stop $(docker ps -a -q)```
