alias k-olama="kubectl -n ollama"

k-olama delete ns ollama
helm uninstall ollama -n ollama

helm install ollama . -n ollama --create-namespace
kubectl get all -n ollama

kubectl get pods -n ollama -w
kubectl exec -it deploy/ollama -n ollama -- ollama pull llama3:8b