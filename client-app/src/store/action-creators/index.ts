import * as UIActionCreators from "../../components/comon/UISettings/actions"
import * as AuthActionCreators from "../../components/comon/AuthDialog/actions"
const actions = {
    ...UIActionCreators,
    ...AuthActionCreators
}

export default actions;