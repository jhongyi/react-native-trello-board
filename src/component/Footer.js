import React, { Component } from 'react'

import { 
    Container, 
    Header, 
    Content, 
    Footer, 
    FooterTab, 
    Text, 
    Icon, 
    Button 
} from 'native-base';

import { Actions } from 'react-native-router-flux';

class FooterComponent extends Component {

    constructor(props) {
        super(props);
    }

    go_boards_view = () => {
        Actions.pop(Actions.boards);
    }

    go_setting_view = () => {
        Actions.setting_view();
    }

    render () {
        return (
            <Footer >
                <FooterTab>
                    <Button onPress={() => this.go_boards_view()}>
                        <Icon name={this.props.actions=="boards" ? "md-clipboard" : "md-list" } />
                        <Text>{this.props.actions=="boards" ? "看板" : "列表"}</Text>
                    </Button>
                    <Button onPress={() => this.go_setting_view()}>
                        <Icon name="ios-settings" />
                        <Text>設定</Text>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }
}

export default FooterComponent
