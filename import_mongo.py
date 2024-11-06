import os
from iracingdataapi.client import irDataClient
from dotenv import load_dotenv
from pymongo import MongoClient


load_dotenv()


class bcolors:
    HEADER = "\033[95m"
    OKBLUE = "\033[94m"
    OKCYAN = "\033[96m"
    OKGREEN = "\033[92m"
    WARNING = "\033[93m"
    FAIL = "\033[91m"
    ENDC = "\033[0m"
    BOLD = "\033[1m"
    UNDERLINE = "\033[4m"


mongo_client = MongoClient(os.environ["MONGO_URL"])["test"]

idc = irDataClient(
    username=os.environ["IRACING_USERNAME"], password=os.environ["IRACING_PASSWORD"]
)

print("Fetching data from iRacing API...")
cars = idc.cars
tracks = idc.tracks
series_stats = idc.series_stats()
car_classes = idc.get_carclasses()
print(f"{bcolors.OKGREEN}Data fetched successfully!{bcolors.ENDC}")

print("Deleting and recreating cars...")
mongo_client.cars.delete_many({"car_id": {"$in": [car["car_id"] for car in cars]}})
mongo_client.cars.insert_many(cars)
mongo_client.cars.create_index("car_id", unique=True)
print(f"{bcolors.OKGREEN}Cars updated successfully!{bcolors.ENDC}")

print("Deleting and recreating series...")
mongo_client.series.delete_many(
    {"series_id": {"$in": [series["series_id"] for series in series_stats]}}
)
mongo_client.series.insert_many(series_stats)
mongo_client.series.create_index("series_id", unique=True)
print(f"{bcolors.OKGREEN}Series updated successfully!{bcolors.ENDC}")

print("Deleting and recreating car classes...")
mongo_client.car_classes.delete_many(
    {"car_class_id": {"$in": [car_class["car_class_id"] for car_class in car_classes]}}
)
mongo_client.car_classes.insert_many(car_classes)
mongo_client.car_classes.create_index("car_class_id", unique=True)
print(f"{bcolors.OKGREEN}Car classes updated successfully!{bcolors.ENDC}")

print("Deleting and recreating tracks...")
mongo_client.tracks.delete_many(
    {"track_id": {"$in": [track["track_id"] for track in tracks]}}
)
mongo_client.tracks.insert_many(tracks)
mongo_client.tracks.create_index("track_id", unique=True)
print(f"{bcolors.OKGREEN}Tracks updated successfully!{bcolors.ENDC}")
