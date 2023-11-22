from fastapi import FastAPI
import requests
# from finalDefense2Algo import Drone, Environment, Package, Coordinate, Delivery
from final2 import Drone, Environment, Package, Coordinate, Delivery
import database
import random
import utils

app = FastAPI()
is_debug = True
home_lat = 33.642362142043844
home_lon = 72.99006168363474


@app.get("/")
def index():
    return {"message": "Welcome To FastAPI World"}


@app.get('/users')
async def get_users():
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ2NDI1MmE1MjE1NGU2OWRjYTRhMDBiIiwiaWF0IjoxNjg0Mjg0ODYxLCJleHAiOjE2ODY4NzY4NjF9.uoDlyqKtqlR2G7wuT7_ChPsgwTHUjif50tS5StryOHc'
    url = 'https://drab-erin-springbok-toga.cyclic.app/api/admin/users'
    headers = {'Authorization': f'Bearer {token}'}

    drones_data = requests.get(
        'https://drab-erin-springbok-toga.cyclic.app/api/admin/drones', headers=headers).json()
    deliveries = requests.get(
        'https://drab-erin-springbok-toga.cyclic.app/api/admin/orders', headers=headers).json()

    packages = []
    for i, delivery in enumerate(deliveries):
        package_data = requests.get(
            f'https://drab-erin-springbok-toga.cyclic.app/api/package/{delivery["package_id"]}', headers=headers).json()
        # print(package_data)
        packages.append(Package(ID=delivery['_id'], location=Coordinate((i+1)*2, (i+1)*3), weight=5 if package_data['weight']
                        == 0 else package_data['weight'], quantity=1, priority=delivery['priority'] if delivery['priority'] != 0 else 1))

        # print(
        #     delivery['_id'], delivery['package_id'], package_data['weight'], delivery['priority']
        # )
    # print(drones, deliveries)
    # for i in deliveries:
    #     print(i)

    drones = []
    for i in drones_data['drones']:
        drones.append(Drone(
            name=i['name'],
            capacity=i['weightCapacity'],
            speed=i['speed'],
            battery=i['totalBatteryCapacity'],
            bcr=i['bcr'],
            charge_rate=i['chargeRate'],
            drain_rate=i['drainRate']

        ))

        # print('drone', i)

    # # response = requests.get(url, headers=headers)

    # # if response.status_code == 200:
    # #     data = response.json()
    # #     return data
    # # else:
    # #     return {'error': f'Request failed with status code {response.status_code}: {response.reason}'}

    # p1 = Package(ID=1, location=Coordinate(5, 10),
    #              weight=10, quantity=1, priority=7)
    # p2 = Package(ID=2, location=Coordinate(-2, -20),
    #              weight=11, quantity=1, priority=7)
    # p3 = Package(ID=3, location=Coordinate(25, 45),
    #              weight=12, quantity=1, priority=7)
    # p4 = Package(ID=4, location=Coordinate(-25, 45),
    #              weight=13, quantity=1, priority=7)
    # packages = [p1, p2, p3, p4]

    # d1 = Drone(name="D1", capacity=40, speed=25, battery=2000,
    #            bcr=1.5, charge_rate=1.5, drain_rate=2.5)
    environ = Environment(35, 45)
    deliv = Delivery(drones[0], packages, environ, True)
    return deliv

    # delivery_data = deliv.deliver()

    # dataToSend = []
    # for i in len(delivery_data[0]):
    #     path = delivery_data[0][2]
    #     if path[0] == "HOME":
    #         dataToSend.append({
    #             'location': [0, 0],
    #         })
    #     else:
    #         dataToSend.append({
    #             "delivery_id": path[0]["ID"],
    #             'location': [path[0]["location"].x, path[0]["location"].y],
    #             'weight': path[0]["weight"],
    #             'quantity': path[0]["quantity"],
    #             'priority': path[0]["priority"],

    #         })

    # return dataToSend

@app.get("/path")
async def get_path():
    # Fetch data from Node server
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ2NDI1MmE1MjE1NGU2OWRjYTRhMDBiIiwiaWF0IjoxNjg0Mjg2NzAwLCJleHAiOjE2ODY4Nzg3MDB9.lncjTfczRDWTRjMsMuWVDxlVntCnI-vlWselfrm0cgQ'
    # DRONE_SERVER = 'https://drab-erin-springbok-toga.cyclic.app/api/admin'
    DRONE_SERVER = 'http://localhost:5000/api/admin'
    headers = {'Authorization': f'Bearer {token}'}
    response_drone = requests.get(f"{DRONE_SERVER}/drones/", headers=headers)
    response_delivery = requests.get(f"{DRONE_SERVER}/orders/", headers=headers)
    
    # Check if both requests were successful
    if response_drone.status_code != 200 or response_delivery.status_code != 200:
        return {"message": "Error: Could not fetch drone and delivery data from Node server."}
    

    drone_data = response_drone.json()
    delivery_data = response_delivery.json()
    
    drones = []
    packages = []

    # check if drone is available
    for drone in drone_data['drones']:
        if drone['status'] == 'available':
            drones.append(Drone(
                name=drone['name'],
                capacity=drone['weightCapacity'],
                speed=drone['speed'],
                battery=drone['totalBatteryCapacity'],
                bcr=drone['bcr'],
                charge_rate=drone['chargeRate'],
                drain_rate=drone['drainRate']
            ))
            # print(drones[-1].name, drones[-1].capacity, drones[-1].speed, drones[-1].battery)
    
    # check if package is pending
    no_of_packages = 10
    for delivery in delivery_data:
        if delivery['status'] == 'assigned':
            print('\n'*5, "Delivery already assigned", '\n'*5)
        # if delivery['status'] == 'pending':
            # package_data = requests.get(f"{DRONE_SERVER}/package/{delivery['package_id']['_id']}", headers=headers).json()
            package_data = delivery['package_id']
            coordinates = utils.get_relative_coordinates(
                home_lat,
                home_lon,
                delivery['drop_location'][0],
                delivery['drop_location'][1],
                100,
                False
                )
            print(coordinates[0], coordinates[1])
            packages.append(Package(
                ID=delivery['_id'],
                location= Coordinate(
                    coordinates[0],
                    coordinates[1]
                ),
                weight=5 if package_data['weight'] == 0 else package_data['weight'],
                quantity=1,
                priority=delivery['priority'] if delivery['priority'] != 0 else 1
                # priority=4
            ))
            # print(packages[-1].ID, packages[-1].location, packages[-1].weight, packages[-1].priority)
            no_of_packages -= 1

    # Create environment
    environment = Environment(35, 45)

    # Create delivery
    delivery = Delivery(drones[0], packages, environment, True)

    # Get delivery data
    delivery_data = delivery.deliver()

    # Create data to send
    data_to_send = utils.map_data_to_pathModel(delivery_data)

    # Send data to Node server
    print(data_to_send)
    response = requests.post(f"{DRONE_SERVER}/path", json=data_to_send, headers=headers)
    print(response.json())
    return response.json()
    # return data_to_send
    # print(data_to_send)
    # return delivery_data

    
