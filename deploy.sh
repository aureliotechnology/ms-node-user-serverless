#!/bin/bash
[ $# -eq 0 ] && echo "Argumento de stage deve ser informado. Ex: dev, qa, prod" && exit

if [ "$1" == "dev" ]; then
  sls deploy --stage dev --config serverless.yml --region ${AWS_DEFAULT_REGION};
  exit;
fi

# Busca resources(endpoints) já existentes no API Gateway apontado
aws apigateway get-resources --rest-api-id $API_GATEWAY_ID \
| yq '.items[] | select(.pathPart != null) | [{.path : .id}]' \
| sed 's/\"//g; s/- /      /' >> api-gateway-resources.yml && \

# Pega endpoints que estão no deploy (serverless.yml)
cat serverless.yml | grep 'path: ' | grep -v '#' | sed 's/path: /\//;' > deploy-resources.yml
for i in {2..6}; do
  cat deploy-resources.yml | cut -d "/" -f1-$i >> endpoints.yml;
done
sort -u endpoints.yml -o endpoints.yml
sed -i '/^ *$/d' endpoints.yml

# Adiciona endpoints do deploy e id do resource na configuração do gateway
for ENDPOINT in $(cat endpoints.yml); do
  cat api-gateway-resources.yml | grep "\s$ENDPOINT:" >> api-gateway-config.yml;
done

# Faz merge da configuração do gateway com o arquivo de deploy do serverless
yq ea '. as $item ireduce ({}; . * $item )' serverless.yml api-gateway-config.yml > serverless-$1.yml && \

cat serverless-$1.yml;

# Deploy do serverless no stage informado
sls deploy --stage $1 --config serverless-$1.yml --region ${AWS_DEFAULT_REGION};
