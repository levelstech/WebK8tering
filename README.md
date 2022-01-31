kubectl apply -f database/*.yaml
kubectl apply -f k8s-api/api-*.yaml


helm install ./helm3 --generate-name