import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Boards from '../component/Boards'
import * as TrelloActions from '../actions/TrelloActions'

const mapStateToProps = (state) => {
    return {
        organizations: state.trello.organizations,
        board_id: state.trello.board_id,
        notification: state.notification
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(TrelloActions, dispatch)
    }
}

const BoardsContainer = connect(
    mapStateToProps, 
    mapDispatchToProps
) (Boards)

export default BoardsContainer;