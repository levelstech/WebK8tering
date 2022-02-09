docker_name=react-ui
version=$(docker images | grep $docker_name | awk '{print $2}' | head -n 1)
v_num=${version:1:1}
new_num=$(($v_num+1))

docker build -t $docker_name:v$new_num .
docker tag $docker_name:v$new_num localhost:32000/$docker_name:v$new_num
docker push localhost:32000/$docker_name:v$new_num

