import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Setting from '../component/Setting'
import * as TrelloActions from '../actions/TrelloActions'

const mapStateToProps = (state) => {
    return {
        address: state.settings.address,
        port: state.settings.port
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(TrelloActions, dispatch)
    }
}

const SettingContainer = connect(
    mapStateToProps, 
    mapDispatchToProps
) (Setting)

export default SettingContainer;