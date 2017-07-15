import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Lists from '../component/Lists'
import * as TrelloActions from '../actions/TrelloActions'

const mapStateToProps = (state) => {
    return {
        lists: state.trello.lists,
        list_id: state.trello.list_id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(TrelloActions, dispatch)
    }
}

const ListsContainer = connect(
    mapStateToProps, 
    mapDispatchToProps
) (Lists)

export default ListsContainer;