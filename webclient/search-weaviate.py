import json
import weaviate

OPENAI_API_KEY = "OPENAI_API_KEY"
WEAVIATE_API_KEY = "WEAVIATE_API_KEY"
WEAVIATE_ENDPOINT_URL = "WEAVIATE_ENDPOINT_URL"

auth_config = weaviate.AuthApiKey(api_key=WEAVIATE_API_KEY)

client = weaviate.Client(
    url=WEAVIATE_ENDPOINT_URL,
    auth_client_secret=auth_config,
            additional_headers = {
        "X-OpenAI-Api-Key": OPENAI_API_KEY 
    }
)

response = (
    client.query
    .get("Hotel", ["topAmenity", "topAmenityImage"])
    # .with_limit(2)
    .with_additional(["id"])
    .with_where({
        "path": ["address"],
        "operator": "Equal",
        "valueText": "123 Castro Street, San Francisco, CA 94114"
    })
    .do()
)

print(json.dumps(response, indent=2))