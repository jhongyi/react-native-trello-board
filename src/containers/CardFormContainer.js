import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import CardForm from '../component/CardForm'
import * as TrelloActions from '../actions/TrelloActions'

const mapStateToProps = (state) => {
    return {
        list_id: state.trello.list_id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(TrelloActions, dispatch)
    }
}

const CardFormContainer = connect(
    mapStateToProps, 
    mapDispatchToProps
) (CardForm)

export default CardFormContainer;