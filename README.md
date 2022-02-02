# How to run the application

# First the docker images of ui and api have to be pushed to the (local) docker repo

# In k8s-services/react-ui
docker build -t react-ui:v1 .
docker tag react-ui:v1 localhost:32000/react-ui:v1
docker push localhost:32000/react-ui:v1

# In k8s-services/api
docker build -t node_api:v1 .
docker tag node_api:v1 localhost:32000/node_api:v1
docker push localhost:32000/node_api:v1

helm3 install ./helm --generate-name
