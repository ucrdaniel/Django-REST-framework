import requests
from requests.auth import HTTPBasicAuth

# auth = HTTPBasicAuth(username='nikolay',password='1')
# response = requests.get('http://127.0.0.1:8010/api/books/',auth=auth)
# print(response.json())
# data = {'username':'nikolay','password':'1'}
# response = requests.post('http://127.0.0.1:8010/api-token-auth/',data=data)
# token = response.json().get('token')
# response_bokk = requests.get('http://127.0.0.1:8010/api/books/',headers={'Authorization':f'Token {token}'})
# print(response_bokk.json())

headers = {'Accept':'application/json; version=v2'}

response = requests.get('http://127.0.0.1:8010/api/authors/',headers=headers)
print(response.json())