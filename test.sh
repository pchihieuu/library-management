for i in {1..10000}; do
  curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/api/v1/authors &
done
wait
