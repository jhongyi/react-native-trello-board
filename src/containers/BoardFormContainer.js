import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import BoardForm from '../component/BoardForm'
import * as TrelloActions from '../actions/TrelloActions'

const mapStateToProps = (state) => {
    return {
        teams: state.trello.teams
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(TrelloActions, dispatch)
    }
}

const BoardFormContainer = connect(
    mapStateToProps, 
    mapDispatchToProps
) (BoardForm)

export default BoardFormContainer;