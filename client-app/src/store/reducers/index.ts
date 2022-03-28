import { combineReducers } from "redux";
import { uiReducer } from "../../components/comon/UISettings/reducer";
import { authReducer } from "../../components/comon/AuthDialog/reducer";

export const rootReducer = combineReducers({
    ui: uiReducer,
    auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;