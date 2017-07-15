# -*- coding: utf-8 -*-
import secret
import json
from trolly import client
from trello import TrelloApi, Actions, Boards, Cards
from upload_file import upload_file_to_trello_card

class TrelloHelper():
    def __init__(self):
        self.api_key = secret.API_KEY
        self.token_key = secret.TOKEN_KEY
        self.client = client.Client(self.api_key, self.token_key)
        self.trello_api = TrelloApi(self.api_key, self.token_key)
    
    def get_teams(self):
        teams = []
        team_info = self.client.get_organisations()
        for team in team_info:
            teams.append({
                "org_id": team.id,
                "org_name": team.name,
                "org_displayName": team.displayName
            })
        return teams

    def get_organizations(self):
        organisations = []
        user_info = self.trello_api.tokens.get_member(self.token_key)

        organisations.append({
            "org_id": 0,
            "org_name": "個人看板",
            'user_id': user_info['id'],
            "board_list": self.get_none_organization_board()
        })
        for organisation in self.client.get_organisations():
            organisations.append({
                "org_id": organisation.id,
                "org_name": organisation.displayName,
                "user_id": user_info['id'],
                "board_list": self.get_boards(organisation.id)
            })
        return organisations
    
    def get_none_organization_board(self):
        none_organization_boards = []
        for board in self.client.get_boards():
            if board.idOrganization == None:
                none_organization_boards.append({
                    'board_id': board.id, 
                    'board_name': board.name,
                    'backgroundColor': board.prefs['backgroundColor']
                })
        return none_organization_boards
    
    def get_boards(self, org_id):
        boards = []
        for board in self.trello_api.organizations.get_board(org_id):
            if board['closed'] == False:
                boards.append({
                    'board_id': board['id'], 
                    'board_name': board['name'],
                    'backgroundColor': board['prefs']['backgroundColor']
                })
        return boards
        '''
        boards = []
        for board in self.client.get_boards():
            boards.append({
                'board_id': board.id, 
                'board_name': board.name
            })
        return boards
        '''

    def get_lists(self, board_id):
        lists = []
        list_info = self.trello_api.boards.get_list(board_id)
        for list_item in list_info:
            lists.append({
                'list_id': list_item['id'],
                'list_name': list_item['name']
            })
        return lists

    def get_list_info(self, list_id):
        lists = []
        list_info = self.trello_api.lists.get_card(list_id)
        for list_item in list_info:
            attachment_info = self.trello_api.cards.get_attachment(list_item['id'])
            lists.append({
                'card_id': list_item['id'],
                'card_name': list_item['name'],
                'description': list_item['badges']['description'],
                'attachment': attachment_info
            })
        return lists

    def get_card(self, board_id):
        cards = []
        card_info = self.trello_api.boards.get_card(board_id)
        for card in card_info:
            cards.append({
                'card_id': card['id'],
                'board_id': card['idBoard'],
                'list_id': card['idList'],
                'card_name': card['name'],
                'desc': card['desc'],
                'url': card['url']
            })
        return cards

    def get_card_info(self, card_id, board_id):
        cards = []
        card_info = self.trello_api.boards.get_card_idCard(card_id, board_id)
        return card_info
    
    def add_list(self, board_id, list_name):
        self.trello_api.lists.new(list_name, board_id)

    def add_board(self, board_name, team_id):
        if team_id == 'None':
            self.trello_api.boards.new(board_name)
        else:
            self.trello_api.boards.new(board_name, '', team_id)
            
    def add_card(self, name, list_id, image):
        new_card = self.trello_api.cards.new(name, list_id)
        if image is not None:
            self.add_card_attachment(new_card['id'], 'upload_pic', image['data'])
    
    def add_card_attachment(self, card_id, name, img_data):
        upload_file_to_trello_card(self.api_key, self.token_key, card_id, name, img_data)
    
    def delete_card(self, card_id):
        self.trello_api.cards.delete(card_id)

if __name__ == '__main__':
    action = TrelloHelper()