import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Cards from '../component/Cards'
import * as TrelloActions from '../actions/TrelloActions'

const mapStateToProps = (state) => {
    return {
        cards: state.trello.cards,
        card_id: state.trello.card_id,
        list_id: state.trello.list_id,
        img_path: state.trello.img_path
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(TrelloActions, dispatch)
    }
}

const CardsContainer = connect(
    mapStateToProps, 
    mapDispatchToProps
) (Cards)

export default CardsContainer;