import React, { Component } from 'react'

import { 
    Container,
    Header,
    Content,
    Right,
    Radio,
    Text,
    ListItem,
    Spinner
} from 'native-base';

import { Actions } from 'react-native-router-flux';
import Footer from './Footer';

class Lists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'isOpen': false,
            'board_id': props.board_id,
            'list_name': ''
        }
        this.spinner = true;
    }
    
    componentWillMount () {
        this.props.actions.getLists(this.state.board_id);
    }
    
    show_add_list_modal = (isOpen) => {
        this.setState({
            'isOpen': isOpen
        })
    }

    show_lists = () => {
        let list_id = this.props.list_id;
        let lists = this.props.lists;
        let list_item = [];
        for (let index in lists) {
            let selected = this.props.list_id == lists[index].list_id ? true : false;
            list_item.push(
                <ListItem key={lists[index].list_id} onPress={() => this.on_select_list(lists[index].list_id, lists[index].list_name)} selected={selected}>
                    <Text>{lists[index].list_name}</Text>
                    <Right>
                        <Radio selected={selected} />
                    </Right>
                </ListItem>
            )
        }
        return list_item;
    }

    set_list_name = (list_name) => {
        this.setState({
            'list_name': list_name
        })
    }

    on_select_list = (list_id, list_name) => {
        this.props.actions.setSelectList(list_id);
        list_info = {"list_id": list_id, "list_name": list_name}
        Actions.cards(list_info);
    }
    
    show_spinner = () => {
        this.spinner = false;
        return (
            <Spinner color='blue' />
        )
    }

    render () {
        return (
            <Container>
                <Content>
                    <Header />
                    {this.spinner ? this.show_spinner() : this.show_lists()}
                </Content>
                <Footer actions={'boards'} />
            </Container>
        )
    }
}
export default Lists