import React, { Component } from 'react'

import { 
    Container, 
    Content,
    View,
    Text, 
    ListItem,
    Right,
    Radio,
    Spinner,
    Button
} from 'native-base';

import { Actions } from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';

class Boards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_fab: false
        }
    }
    
    componentWillMount () {
        this.props.actions.getOrganizations();
    }
    
    on_select_boards = (board_id, board_name) => {
        this.props.actions.setSelectBoard(board_id);
        board_info = {"board_id": board_id, "board_name": board_name}
        Actions.lists(board_info)
    }

    show_boards = () => {
        let organizations = this.props.organizations;
        let organization_item = [];
        if(organizations.length == undefined) {
            return <Spinner color='blue' />
        }
        for (let org_index in organizations) {
            organization_item.push(
                <ListItem key={organizations[org_index].org_id} itemDivider >
                    <Text>{organizations[org_index].org_name.toUpperCase()}</Text>
                </ListItem>
            );
            for(board_index in organizations[org_index].board_list) {
                let board_id = organizations[org_index].board_list[board_index].board_id;
                let board_name = organizations[org_index].board_list[board_index].board_name;
                let backgroundColor = organizations[org_index].board_list[board_index].backgroundColor;
                let selected = this.props.board_id == board_id ? true : false;
                organization_item.push(
                    <ListItem key={board_id} onPress={() => this.on_select_boards(board_id, board_name)} selected={selected}>
                        <View style={{width: 20, height: 20, marginRight: 5, borderRadius: 3, backgroundColor: backgroundColor}} />
                        <Text>{board_name}</Text>
                        <Right>
                            <Radio selected={selected} />
                        </Right>
                    </ListItem>
                )
            }
        }
        return organization_item;
    }

    reconnect = () => {
        this.props.actions.getOrganizations();
    }

    show_fail_message = () => {
        return (
            <View>
                <Text>{this.props.notification.msg.message}</Text>
                <Button onPress={() => this.reconnect()}><Text>重新連線</Text></Button>
            </View>
        );
    }

    render () {
        return (
            <Container>
                <Content>
                    {
                        (this.props.notification.status) ? this.show_boards() : this.show_fail_message()
                    }
                </Content>
            </Container>
        )
    }
}

export default Boards