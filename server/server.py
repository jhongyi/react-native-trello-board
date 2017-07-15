#!flask/bin/python
from flask import Flask, request, json
from flask_restful import reqparse, abort, Api, Resource
from trello_helper import TrelloHelper
#from trello import TrelloApi, Actions, Boards, Cards
app = Flask(__name__)
api = Api(app)

@app.route('/')
def index():
    return "Trello API"

class Organizations(Resource):
    def get(self):
        action = TrelloHelper()
        organizations = action.get_organizations()
        return organizations, 200

class Teams(Resource):
    def get(self):
        action = TrelloHelper()
        teams = action.get_teams()
        return teams, 200

class Boards(Resource):
    def post(self):
        data = json.loads(request.data)
        action = TrelloHelper()
        action.add_board(data["board_name"], data['team_id'])
        return "ADD_BOARD_SUCCESS", 201

class Lists(Resource):
    def get(self, board_id):
        action = TrelloHelper()
        lists = action.get_lists(board_id)
        return lists, 200
    
    def post(self):
        data = json.loads(request.data)
        action = TrelloHelper()
        action.add_list(data["board_id"], data['list_name'])
        return "ADD_LIST_SUCCESS", 201

class ListInfo(Resource):
    def get(self, list_id):
        action = TrelloHelper()
        list_info = action.get_list_info(list_id)
        return list_info, 200

class Cards(Resource):
    def get(self, board_id):
        action = TrelloHelper()
        cards = action.get_card(board_id)
        return cards, 200

class CardInfo(Resource):
    def get(self, card_id, board_id):
        action = TrelloHelper()
        card_info = action.get_card_info(card_id, board_id)
        return card_info, 200

class Card(Resource):
    def post(self):
        data = json.loads(request.data)
        action = TrelloHelper()
        action.add_card(data["name"], data['list_id'], data['image'])
        return "ADD_CARD_SUCCESS", 201
    
    def delete(self, card_id):
        action = TrelloHelper()
        action.delete_card(card_id)
        return "DELETE_CARD_SUCCESS", 201

class CardAddAttachment(Resource):
    def post(self):
        data = json.loads(request.data)
        action = TrelloHelper()
        action.add_card_attachment(data["card_id"], data['url'], data['name'])
        return "ADD_CARD_ATTACHMENT_SUCCESS", 201

API_VERSION = '/api/v1.0'
api.add_resource(Teams, '{}/teams'.format(API_VERSION))
api.add_resource(Organizations, '{}/organizations'.format(API_VERSION))
api.add_resource(Boards, '{}/boards'.format(API_VERSION))
lists_routes = [
    '{}/lists/<board_id>'.format(API_VERSION),
    '{}/lists/add'.format(API_VERSION)
]
api.add_resource(Lists, *lists_routes)
api.add_resource(ListInfo, '{}/list/<list_id>'.format(API_VERSION))
api.add_resource(Cards, '{}/cards/<board_id>'.format(API_VERSION))
api.add_resource(CardInfo, '{}/card/<card_id>/<board_id>'.format(API_VERSION))
card_routes = [
    '{}/card/add'.format(API_VERSION),
    '{}/card/delete/<card_id>'.format(API_VERSION)
]
api.add_resource(Card, *card_routes)
api.add_resource(CardAddAttachment, '{}/card/attachment'.format(API_VERSION))

if __name__ == '__main__':
    #app.run(debug=True)
    from gevent.wsgi import WSGIServer
    http_server = WSGIServer(('', 5000), app)
    http_server.serve_forever()