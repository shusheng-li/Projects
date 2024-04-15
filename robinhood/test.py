import requests

BASE = "http://127.0.0.1:5000/"

# response = requests.get(BASE + "query/MSFT")
# print(response.json())

# input()

response = requests.put(BASE + "buy/AAPL/-5")
print(response)

input()

response = requests.get(BASE + "portfolio")
print(response.json())
