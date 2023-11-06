import { NextRequest, NextResponse } from 'next/server'
// import weaviate, { EmbeddedOptions } from 'weaviate-ts-embedded';
import weaviate, { WeaviateClient, ApiKey } from 'weaviate-ts-client';

export async function GET(request: NextRequest) {

  const WEAVIATE_API_KEY = "INSERT_API_KEY_HERE"
  const WEAVIATE_ENDPOINT_URL = "INSERT_WEAVIATE_ENDPOINT_URL"
  const OPENAI_API_KEY = "INSERT_OPENAI_API_KEY"

    const client: WeaviateClient = weaviate.client({
      scheme: 'https',
      host: WEAVIATE_ENDPOINT_URL,
      apiKey: new ApiKey(WEAVIATE_API_KEY),
      headers: {
        'X-OpenAI-Api-Key': OPENAI_API_KEY 
      }
    });

    const result = await client.graphql
      .get()
      .withClassName('Hotel')
      .withGenerate({
        singlePrompt: "Write a marketing email for this hotel named: {name}, on the following amenity: {poolAndSpa}. Keep the output down to 2 sentences.",
      })
      .withNearText({
        concepts: ['Hotel with infinity pool'],
      })
      .withLimit(2)
      .withFields('name, address, poolAndSpa')
      .do();
  
    console.log(JSON.stringify(result, null, 2));
    
    // client.embedded.stop();
    return new NextResponse(JSON.stringify({ answer: "John Doe" }), {
      status: 200,
    });
  }
  