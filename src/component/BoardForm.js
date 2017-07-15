import React, { Component } from 'react'

import { 
    Container, 
    Content,
    Header,
    Text, 
    ListItem,
    Item,
    Button,
    InputGroup,
    Input,
    Toast,
    Icon,
    Picker
} from 'native-base';

import { Actions } from 'react-native-router-flux';

class BoardForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'board_name': '',
            'select_team': ''
        }
    }

    componentWillMount () {
        this.props.actions.getTeams();
    }
    
    get_toast_message = (text) => {
        Toast.show({
            text: text,
            position: 'bottom',
            buttonText: '關閉'
        })       
    }

    set_teams = () => {
        let teams = this.props.teams;
        let team_item = [];
        team_item.push(
            <Item key={-1} label={'無'} value={'None'} />
        )
        for(index in teams) {
            team_item.push(
                <Item key={index} label={teams[index].org_displayName} value={teams[index].org_id} />
            )
        }
        return team_item;
    }

    set_board_name = (board_name) => {
        this.setState({
            'board_name': board_name
        })
    }

    on_select_teams_change = (value) => {
        this.setState({
            "select_team": value
        })
    }
    
    add_board = () => {
        if (this.state.board_name == '') {
            this.get_toast_message('請輸入看板名稱');
            return false;
        } else if (this.state.select_team === '') {
            this.get_toast_message('請選擇團隊');
            return false;
        }
        this.props.actions.addBoard(this.state);
        this.set_board_name('');
        Actions.pop(Actions.boards);
    }

    render () {
        return (
            <Container>
                <Content>
                    <Header />
                    <InputGroup>
                        <Icon name="paper" style={{paddingRight: 10}} />
                        <Input placeholder='請輸入看板名稱' value={this.state.board_name} onChangeText={this.set_board_name.bind(this)} />
                    </InputGroup>
                    <InputGroup>
                        <Icon name="archive" style={{paddingRight: 10}} />
                        {
                            this.props.teams.length > 0 ?
                                <Picker
                                    iosHeader="團隊選單"
                                    mode="dropdown"
                                    selectedValue={this.state.select_team}
                                    onValueChange={this.on_select_teams_change.bind(this)}
                                >
                                    {this.set_teams()}
                                </Picker>
                                : 
                                <Text></Text>
                        }
                    </InputGroup>
                    <ListItem style={{justifyContent: 'center', borderBottomWidth: 0}}>
                        <Button onPress={() => this.add_board()} style={{marginRight: 10}}>
                            <Text>新增</Text>
                        </Button>
                    </ListItem>
                </Content>
            </Container>
        )
    }
}

export default BoardForm