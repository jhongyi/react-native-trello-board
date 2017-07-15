import React, { Component } from 'react'

import { 
    Container, 
    Header, 
    Content, 
    Text, 
    Icon, 
    Button 
} from 'native-base';
import Footer from './Footer';

import BoardsContainer from '../containers/BoardsContainer';
import { Actions } from 'react-native-router-flux';

class Trello extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Container>
                <Header />
                <Content>
                    <BoardsContainer />
                </Content>
                <Footer actions={'boards'} />
            </Container>
        )
    }
}

export default Trello