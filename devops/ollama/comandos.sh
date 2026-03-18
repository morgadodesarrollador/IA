alias k-olama="kubectl -n ollama"

k-olama delete ns ollama
helm uninstall ollama -n ollama

helm install ollama . -n ollama --create-namespace
helm upgrade ollama . -n ollama --create-namespace
kubectl get all -n ollama

kubectl get pods -n ollama -w
kubectl exec -it deploy/ollama -n ollama -- ollama pull llama3:8b
kubectl exec -it deploy/ollama -n ollama -- ollama pull deepseek-coder

curl -N http://ollama.jamorgado.es/api/generate   -d '{"model":"llama3:8b","prompt":"hola","stream":true}'

kubectl exec -it $(kubectl get pod -l app=ollama -n ollama -o jsonpath='{.items[0].metadata.name}') -n ollama -- cat /proc/meminfo | head -5