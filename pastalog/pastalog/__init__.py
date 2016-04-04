'''
The pastalog Log class, which simply sends a POST request to a the server.
'''
import requests


class Log(object):
    def __init__(self, url, model_name):
        self.url = url
        self.model_name = model_name

    def post(self, series_name, value, step):
        payload = {"modelName": self.model_name,
                   "pointType": series_name,
                   "pointValue": value,
                   "globalStep": step}

        r = requests.post(self.url, json=payload)

        return r.raise_for_status()
