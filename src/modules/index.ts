/** root reducer */
import { combineReducers } from "redux";
import dateState from "./dateState";

const rootReducer = combineReducers({
  dateState,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
