import argparse
import requests

ATTACHMENTS_URL = 'https://api.trello.com/1/cards/%s/attachments'


def upload_file_to_trello_card(key, token, card_id, file_name, img_data):
    fh = open("temp/temp.png", "wb")
    fh.write(img_data.decode('base64'))
    fh.close()

    params = {'key': key, 'token': token, 'name': file_name}
    files = {'file': open("temp/temp.png", 'rb')}
    url = ATTACHMENTS_URL % card_id
    return requests.post(url, params=params, files=files)