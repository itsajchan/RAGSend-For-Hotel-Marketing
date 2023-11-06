import os
import json
import random
import openai
import replicate
import requests
import weaviate

OPENAI_API_KEY = "OPENAI_API_KEY"
WEAVIATE_API_KEY = "WEAVIATE_API_KEY"
WEAVIATE_ENDPOINT_URL = "WEAVIATE_ENDPOINT_URL"
BYTESCALE_ENDPOINT_URL = "BYTESCALE_ENDPOINT_URL"
BYTESCALE_API_HEADER = "BYTESCALE_API_HEADER"
openai.api_key = OPENAI_API_KEY
from dagster import asset # import the `dagster` library

@asset
def delete_all_schema() -> None:

    all_hotels = os.listdir('data/hotel_details')

    auth_config = weaviate.AuthApiKey(api_key=WEAVIATE_API_KEY)

    client = weaviate.Client(
        url=WEAVIATE_ENDPOINT_URL,
        auth_client_secret=auth_config,
                additional_headers = {
            "X-OpenAI-Api-Key": OPENAI_API_KEY 
        }
    )

    # client = weaviate.Client(
    #     embedded_options=EmbeddedOptions(),
    #     additional_headers = {
    #         "X-OpenAI-Api-Key": OPENAI_API_KEY 
    #     }
    # )

    for hotel in all_hotels:
        with open(f"./data/hotel_details/{hotel}", 'r') as file:
            hotel_data = json.load(file)
    
        if hotel_data.get("weaviate_obj") != None:
            print("DNE in Weaviate: Adding to Weaviate.") 

            with open(f"data/hotel_details/{hotel}",'w') as f:
                del hotel_data["weaviate_obj"]
                json.dump(hotel_data, f, indent=4)

    client.schema.delete_all()



@asset(deps=[delete_all_schema])
def create_weaviate_schema() -> None:
    # client = weaviate.Client(
    #     embedded_options=EmbeddedOptions(),
    #         additional_headers = {
    #         "X-OpenAI-Api-Key": OPENAI_API_KEY
    #     }
    # )

    auth_config = weaviate.AuthApiKey(api_key=WEAVIATE_API_KEY)

    client = weaviate.Client(
        url=WEAVIATE_ENDPOINT_URL,
        auth_client_secret=auth_config,
                additional_headers = {
            "X-OpenAI-Api-Key": OPENAI_API_KEY 
        }
    )
    schema = {
        "vectorizer": "text2vec-openai",
        "class": "Hotel",
        "moduleConfig": {
            "text2vec-openai": {},
            "generative-openai": {
                "model": "gpt-4"  
            }
        },
    }

    client.schema.create_class(schema)



@asset 
def get_hotel() -> None:
    for i in range(2):
        luxury_amenities = [
            "Personalized Butler Service",
            "Spa and Wellness Centers",
            "Private Infinity Pools",
            "Helipad or Private Jet Access",
            "Michelin Starred Restaurants",
            "Luxury Car Service",
            "Rooftop Bars or Lounges",
            "Private Beach Access",
            "Custom Bedding and Pillow Menus",
            "State-of-the-art Technology",
            "Personal Chefs",
            "24/7 Room Service",
            "Exclusive Experiences",
            "Personal Shopping Concierge",
            "Private Cinema",
            "Temperature-controlled Wine Fridges",
            "Fully-equipped Gyms and Personal Trainers",
            "Yoga and Meditation Classes",
            "Pet Services",
            "Cultural Immersion Activities"
        ]

        sf_landmarks = [
            "Golden Gate Bridge",
            "Alcatraz Island",
            "Fisherman's Wharf",
            "Cable Cars",
            "Lombard Street",
            "Union Square",
            "Coit Tower",
            "Palace of Fine Arts",
            "Golden Gate Park",
            "The Painted Ladies",
            "Ghirardelli Square",
            "Chinatown",
            "San Francisco Museum of Modern Art (SFMOMA)",
            "Ferry Building",
            "The Castro",
            "Twin Peaks",
            "Pier 39",
            "Haight-Ashbury",
            "The Mission District",
            "Transamerica Pyramid"
        ]

        amenity = luxury_amenities[random.randint(0, len(luxury_amenities)-1)]
        randomLandmark = sf_landmarks[random.randint(0, len(sf_landmarks)-1)]
        print(f"Selected Amenity: {amenity}")

        completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{"role": "user", "content": f"Generate a fictitious hotel in the form of the JSON object below. Ensure these fictitious hotels are placed throughout San Francisco with several landmarks from the city referenced in the JSON object. Name the hotel something related to the following San Francisco landmark: {randomLandmark}.  Additionally include this amenity: {amenity} in the topAmenity object referenced in the JSON Object. Here's the JSON Object template you'll populate" + ''':
                                                                            
        {
            "name": "<string>",
            "address": "<string>",
            "proximityToAttractions": "<string>",
            "neighborhoodSafety": "<string>",
            "accessibility": "<string>",
            "nightlyRate": "<string>",
            "hiddenFees": "<string>"
            "type": "<string>",
            "size": "<string>",
            "wifi": "<string>",
            "breakfast": "<string>",
            "poolAndSpa": "<string>",
            "climateControl": "<string>",
            "topAmenity": "<string>",
            "overallRating": "<string>",
            "recentReview": "<string>",
            "serviceAndStaff": "<string>",
            "cancellation": "<string>",
            "checkIn": "<string>",
            "checkOut": "<string>",
            "restaurant": "<string>",
            "roomService": "<string>",
            "familyFriendly": "<string>",
            "petPolicy": "<string>",
            "shuttleService": "<string>",
            "parking": "<string>",
            "safetyAndSecurity": "<string>",
            "specialOffers": "<string>",
            "ambianceAndDecor": "<string>",
            "environmentalInitiatives": "<string>",
            "businessAmenities": "<string>",
            "viewAndSurroundings": "<string>",
            "noiseLevel": "<string>"
        }
    '''}])
        print(completion.choices[0].message.content)
        data = json.loads(completion.choices[0].message.content)

        os.makedirs("data", exist_ok=True)
        with open(f"data/hotel_details/{data['address'].replace(' ', '-').replace(',', '')}.json", "w") as f:
            json.dump(data, f, indent=4)  # using indent for pretty printing

@asset(deps=[get_hotel])  # this asset is dependent on topstory_ids
def get_hotel_description() -> None:
    # List all entries in the directory

    all_hotels = os.listdir('data/hotel_details')
    all_descriptions = os.listdir('data/hotel_descriptions')
    
    for hotel in all_hotels:
        if hotel.replace('.json', '.txt') not in all_descriptions:

            with open(f'data/hotel_details/{hotel}', 'r') as file:
                hotel_string_data = file.read()
            print(hotel)

            completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{"role": "user", "content": f'''In 20 words or less describe the the following JSON in an artistic expression: {hotel_string_data}'''}])

            print(completion.choices[0].message.content)
            with open(f"data/hotel_descriptions/{hotel.replace('.json', '.txt')}", "w") as f:
                f.write(completion.choices[0].message.content)

@asset(deps=[get_hotel_description])
def get_hotel_image() -> None:

    all_details = os.listdir('data/hotel_details')
    all_images = os.listdir('data/hotel_images')

    for detail in all_details:
        if detail.replace('.json', '.png') not in all_images:
            
            with open(f"./data/hotel_details/{detail}", 'r') as file:
                hotel_data = json.load(file)

            image_url = replicate.run(
                "stability-ai/sdxl:8beff3369e81422112d93b89ca01426147de542cd4684c244b673b105188fe5f",
                input={"prompt": f"a sleek, modern, luxury hotel in San Francisco with a {hotel_data['topAmenity']} and {hotel_data['proximityToAttractions']}"}
            )

            # Save image to disk
            img_data = requests.get(image_url[0]).content
            with open(f"data/hotel_images/{detail.replace('.json', '.png')}", 'wb') as handler:
                handler.write(img_data)

            # Upload image to Bytescale
            res = requests.post(
                BYTESCALE_ENDPOINT_URL, 
                headers={"Authorization": BYTESCALE_API_HEADER, "Content-Type":"application/json"},
                data=json.dumps({
                    "url": image_url[0]
            }))

            # Update the JSON file

            with open(f"data/hotel_details/{detail}",'w') as f:
                hotel_data["topAmenityImage"] = res.json().get('fileUrl')
                json.dump(hotel_data, f, indent=4)

# @asset(deps=[get_hotel_image])
# def store_image_in_s3() -> None:
#     pass

@asset(deps=[get_hotel_image])
def store_in_weaviate() -> None:

    all_hotels = os.listdir('data/hotel_details')
    
    # client = weaviate.Client(
    #     embedded_options=EmbeddedOptions(),
    #         additional_headers = {
    #         "X-OpenAI-Api-Key": OPENAI_API_KEY 
    #     }
    # )
        
    auth_config = weaviate.AuthApiKey(api_key=WEAVIATE_API_KEY)
    client = weaviate.Client(
        url=WEAVIATE_ENDPOINT_URL,
        auth_client_secret=auth_config,
                additional_headers = {
            "X-OpenAI-Api-Key": OPENAI_API_KEY 
        }
    )

    for hotel in all_hotels:
        with open(f"./data/hotel_details/{hotel}", 'r') as file:
            hotel_data = json.load(file)
        if hotel_data.get("weaviate_obj") == None:
            print("DNE in Weaviate: Adding to Weaviate.") 
            weaviate_objId = client.data_object.create(hotel_data, "Hotel")
            with open(f"data/hotel_details/{hotel}",'w') as f:
                print('4')
                hotel_data["weaviate_obj"] = weaviate_objId
                json.dump(hotel_data, f, indent=4)