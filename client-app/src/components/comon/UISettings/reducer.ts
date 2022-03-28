import { UIAction, UIActionTypes, UIState } from "./types";

const initialState: UIState = {
    darkTheme: false,
}

export const uiReducer = (state = initialState, action: UIAction): UIState => {
    switch (action.type) {
        case UIActionTypes.SET_THEME:
            return {
                ...state,
                darkTheme: action.payload,
            }
        default:
            return state;
    }
}