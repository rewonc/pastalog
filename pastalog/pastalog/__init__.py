'''
The pastalog Log class, which simply sends a POST request to a the server.
'''


class Log(object):
    def __init__(self, url, model_name):
        self.url = url
        self.model_name = model_name

    def post(self, series_name, value):
        pass
