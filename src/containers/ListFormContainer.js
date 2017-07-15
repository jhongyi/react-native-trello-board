import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import ListForm from '../component/ListForm'
import * as TrelloActions from '../actions/TrelloActions'

const mapStateToProps = (state) => {
    return {
        board_id: state.trello.board_id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(TrelloActions, dispatch)
    }
}

const ListFormContainer = connect(
    mapStateToProps, 
    mapDispatchToProps
) (ListForm)

export default ListFormContainer;