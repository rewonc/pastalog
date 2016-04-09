'''
The pastalog Log class, which simply sends a POST request to a the server.
'''
import requests
from urlparse import urljoin
from pkg_resources import resource_filename


class Log(object):
    def __init__(self, url, model_name):
        self.url = urljoin(url, 'data')
        self.model_name = model_name

    def post(self, series_name, value, step):
        payload = {"modelName": self.model_name,
                   "pointType": series_name,
                   "pointValue": value,
                   "globalStep": step}

        r = requests.post(self.url, json=payload)

        return r.raise_for_status()


def get_package_path():
    'Return the path of the package.json for npm script'
    return resource_filename(__name__, "package.json")
