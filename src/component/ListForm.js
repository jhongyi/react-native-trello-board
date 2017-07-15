import React, { Component } from 'react'

import { 
    Container,
    Header,
    Content,
    Right,
    Radio,
    Text,
    ListItem,
    InputGroup,
    Input,
    Icon,
    Button,
    Toast
} from 'native-base';

import { Actions } from 'react-native-router-flux';

class ListForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'list_name': ''
        }
    }

    get_toast_message = (text) => {
        Toast.show({
            text: text,
            position: 'bottom',
            buttonText: '關閉'
        })       
    }

    set_list_name = (list_name) => {
        this.setState({
            'list_name': list_name
        })
    }
    
    add_list = () => {
        if (this.state.list_name == '') {
            this.get_toast_message('請輸入列表名稱');
            return false;
        }
        let list_item = {
            'board_id': this.props.board_id,
            'list_name': this.state.list_name
        }
        this.props.actions.addList(list_item);
        this.set_list_name('');
        this.props.actions.getLists(this.props.board_id)
        Actions.pop(Actions.lists);
    }
    
    render () {
        return (
            <Container>
                <Content>
                    <Header />
                    <InputGroup>
                        <Icon name="paper" style={{paddingRight: 10}} />
                        <Input placeholder='請輸入列表名稱' value={this.state.list_name} onChangeText={this.set_list_name.bind(this)} />
                    </InputGroup>
                    <ListItem style={{justifyContent: 'center', borderBottomWidth: 0}}>
                        <Button onPress={() => this.add_list()} style={{marginRight: 10}}>
                            <Text>新增</Text>
                        </Button>
                    </ListItem>
                </Content>
            </Container>
        )
    }
}

export default ListForm