import React, { Component } from 'react'

import { 
    Container, 
    Content,
    Header,
    Text, 
    Label,
    ListItem,
    Item,
    Button,
    InputGroup,
    Input,
    Toast,
    Picker,
    Icon
} from 'native-base';

//import Icon from 'react-native-vector-icons/Entypo';

import { Actions } from 'react-native-router-flux';

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: props.address,
            port: props.port
        }
    }
    
    get_toast_message = (text) => {
        Toast.show({
            text: text,
            position: 'bottom',
            buttonText: '關閉'
        })       
    }

    set_address = (address) => {
        this.setState({
            'address':  address
        })
    }
    
    set_port = (port) => {
        this.setState({
            'port': port
        })
    }

    save_setting = (save_setting) => {
        this.props.actions.addSetting(this.state);
        Actions.pop(Actions.boards);
    }

    render () {
        return (
            <Container>
                <Content>
                    <Header />
                    <InputGroup>
                        <Item stackLabel>
                            <Label>IP 位址</Label>
                            <Input placeholder='請輸入 IP 位址' value={this.state.address} onChangeText={this.set_address.bind(this)} />
                        </Item>
                    </InputGroup>
                    <InputGroup>
                        <Item stackLabel>
                            <Label>Port</Label>
                            <Input placeholder='請輸入 Port' value={this.state.port} onChangeText={this.set_port.bind(this)} />
                        </Item>
                    </InputGroup>
                    <ListItem style={{justifyContent: 'center', borderBottomWidth: 0}}>
                        <Button onPress={() => this.save_setting()} style={{marginRight: 10}}>
                            <Text>設定</Text>
                        </Button>
                    </ListItem>
                </Content>
            </Container>
        )
    }
}

export default Setting