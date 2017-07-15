import React, { Component } from 'react'
import {Actions, Scene, Router, Route} from 'react-native-router-flux';
import {
    View, 
    Image
} from 'react-native';

import {
    Container,
    Icon, 
    Button, 
    Text,
    InputGroup,
    Input,
    ListItem
} from 'native-base';

import Trello from './Trello';
import ListsContainer from '../containers/ListsContainer';
import CardsContainer from '../containers/CardsContainer';
import BoardFormContainer from '../containers/BoardFormContainer';
import ListFormContainer from '../containers/ListFormContainer';
import CardFormContainer from '../containers/CardFormContainer';
import SettingContainer from '../containers/SettingContainer';

class App extends Component {
    constructor(props) {
        super(props);
    }

    get_add_button = () => {
        return (
            <Text>
                <Icon name="ios-add" style={{color: "#FFFFFF", fontSize: 28}} />
            </Text>
        );
    }

    render () {
        const scenes = Actions.create(
            <Scene key="root" renderTitle={() => { return <AppLogo />; }} >
                <Scene key="boards" component={Trello} title="Trello" onRight={() => { Actions.board_form() }} rightTitle={this.get_add_button()} />
                <Scene key="lists" component={ListsContainer} title="列表選單" onRight={() => { Actions.list_form()}} rightTitle={this.get_add_button()} />
                <Scene key="cards" component={CardsContainer} title="卡片選單" onRight={() => { Actions.card_form()}} rightTitle={this.get_add_button()} />
                <Scene key="board_form" component={BoardFormContainer} title="新增看板"/>
                <Scene key="list_form" component={ListFormContainer} title="新增列表"/>
                <Scene key="card_form" component={CardFormContainer} title="新增卡片"/>
                <Scene key="setting_view" component={SettingContainer} title="設定畫面"/>
            </Scene>
        );

        const AppLogo = () => {
            return (
                <View style={{ alignItems: 'center', marginTop: 26 }} >
                    <Image source={require('../assets/trello-logo.png')} style={{ width: 84, height: 27 }} />
                </View>
            );
        };

        return (
            <Router scenes={scenes} navigationBarStyle={{backgroundColor: '#026AA7'}} />
        )
    }
}

export default App