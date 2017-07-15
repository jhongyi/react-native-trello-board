import React, { Component } from 'react'
import { Image } from 'react-native';
import { 
    Container, 
    Content,
    Header,
    Text, 
    ListItem,
    Radio,
    Right,
    Button,
    Toast,
    Icon,
    Fab,
    Spinner,
    Card,
    CardItem,
    Body,
    Left
} from 'native-base';

import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Actions } from 'react-native-router-flux';
import Footer from './Footer';

class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'list_id': props.list_id,
            'card_name': '',
            'active_fab': false
        }
        this.spinner = true;
    }

    componentWillMount () {
        this.props.actions.getCards(this.state.list_id);    
    }

    show_cards = () => {
        let card_id = this.props.card_id;
        let cards = this.props.cards;
        let card_item = [];
        if(cards.length == undefined) {
            return <Spinner color='blue' />
        }
        for (let index in cards) {
            let selected = card_id == cards[index].card_id ? true : false;
            let show_attachment_icon = cards[index].attachment.length > 0 ? true : false;
            let show_image = show_attachment_icon && cards[index].attachment[0].previews.length > 0 ? true : false;
            card_item.push(
                <Card key={cards[index].card_id} onPress={() => this.on_select_card(cards[index].card_id, cards[index].card_name)}>
                    <CardItem content>
                        <MaterialIcons name="cards-outline" size={18} style={{marginRight: 5}} />
                        <Text style={styles.card_name}>{cards[index].card_name}</Text>
                    </CardItem>
                    {
                        show_image &&
                        <CardItem cardBody>
                            <Image style={{ resizeMode: 'cover', width: null, flex: 1, height: 200 }} source={{uri: cards[index].attachment[0].url}} />
                        </CardItem>
                    }
                    {
                        // 若有描述說明或是附件檔案
                        (cards[index].description || show_attachment_icon) &&
                        <CardItem>
                        {
                            cards[index].description &&
                            <Icon name="ios-text-outline" />
                        }
                        {
                            show_attachment_icon &&
                            <Icon name="ios-attach" />
                        }
                        </CardItem>
                    }
                </Card>
                //onPress={this.get_boards_detail.bind(this, boards[index].board_id)}
                /*<ListItem key={cards[index].card_id} onPress={() => this.on_select_card(cards[index].card_id, cards[index].card_name)} selected={selected}>
                    <Text>{cards[index].card_name}</Text>
                    <Right>
                        <Radio selected={selected} />
                    </Right>
                </ListItem>*/
            )
        }
        return card_item;
    }

    show_delete_card = () => {
        alert('show_delete_card')
    }

    get_toast_message = (text) => {
        Toast.show({
            text: text,
            position: 'bottom',
            buttonText: '關閉'
        })       
    }

    on_select_card = (card_id, card_name) => {
        this.props.actions.setSelectCard(card_id);
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
                    {this.spinner ? this.show_spinner() : this.show_cards()}
                </Content>
                {/*
                <Fab
                    active={this.state.active_fab}
                    direction="up"
                    style={styles.fab}
                    containerStyle={{bottom: 65}}
                    position="bottomRight"
                    onPress={() => this.setState({ active_fab: !this.state.active_fab })}
                >
                    <Icon name="ios-add" />
                    <Button style={{ backgroundColor: '#DD5144' }} onPress={() => this.show_delete_card()}>
                        <Icon name="trash" />
                    </Button>
                </Fab>
                */}
                <Footer actions={'lists'} />
            </Container>
        )
    }
}

const styles = {
    fab: {
        backgroundColor: '#5067FF',
        borderRadius: 30,
        position: 'absolute'
    },
    card_name: {
        fontSize: 18
    }
}

export default Cards