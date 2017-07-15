import React, { Component } from 'react'

import {
    Image,
    View,
	ScrollView
} from 'react-native';

import { 
    Container,
    Header,
    Content,
    Text,
    ListItem,
    InputGroup,
    Input,
    Icon,
    Button,
    Toast
} from 'native-base';

import Modal from 'react-native-modalbox';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';

class CardForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'list_id': props.list_id,
            'card_name': '',
			'image': null
        }
    }

    componentWillUnmount () {
        this.props.actions.getCards(this.state.list_id);
    }

    get_toast_message = (text) => {
        Toast.show({
            text: text,
            position: 'bottom',
            buttonText: '關閉'
        })       
    }

    set_card_name = (card_name) => {
        this.setState({
            'card_name': card_name
        })
    }

    add_card = () => {
        if(this.state.card_name == '') {
            this.get_toast_message('請輸入卡片名稱');
            return false;
        }
        this.props.actions.addCard(this.state);
        this.set_card_name('');
        Actions.pop(Actions.cards);
    }

    select_photo_tapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            title: '上傳附件',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '從圖片庫選擇',
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                let source = { uri: response.uri };
                //response.uri = response.uri.replace('file://', '')
                this.setState({
                    image: response
                });
            }
        });
    }

	render_image(image) {
		return <Image style={{width: null, height: 200, resizeMode: 'contain'}} source={image} />
	}

    render () {
        return (
            <Container>
                <Content>
                    <Header />
                    <InputGroup>
                        <Icon name="paper" style={{paddingRight: 10}} />
                        <Input placeholder='請輸入卡片名稱' value={this.state.card_name} onChangeText={this.set_card_name.bind(this)} />
                        <Icon name="ios-camera" style={{paddingRight: 10}} onPress={this.select_photo_tapped.bind(this)} />
                    </InputGroup>
                    <InputGroup>
                        <ScrollView>
                            {this.state.image ? this.render_image(this.state.image) : null}
                        </ScrollView>
                    </InputGroup>
                    <ListItem style={{justifyContent: 'center', borderBottomWidth: 0}}>
                        <Button onPress={() => this.add_card()} style={{marginRight: 10}}>
                            <Text>新增</Text>
                        </Button>
                    </ListItem>
                </Content>
            </Container>
        )
    }
}

export default CardForm