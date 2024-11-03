import json
import os
from iracingdataapi.client import irDataClient

idc = irDataClient(
    username=os.environ["IRACING_USERNAME"], password=os.environ["IRACING_PASSWORD"]
)

cars = idc.get_cars()
car_assets = idc.get_cars_assets()

for i in range(len(cars)):
    cars[i] = {**cars[i], **car_assets[str(cars[i]["car_id"])]}

json.dump(cars, open("cars.json", "w"), indent=2)
