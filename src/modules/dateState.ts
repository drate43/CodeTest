import { start } from "repl";

export interface IDateState {
  startYear: string;
  startMonth: string;
  startDate: string;
  startHour: string;
  startMin: string;
  endYear: string;
  endMonth: string;
  endDate: string;
  endHour: string;
  endMin: string;
}

export const CREATE = "dates/ADD_DATES" as const;
export const REMOVE = "dates/REMOVE_DATES" as const;

const initialState: IDateState = {
  startYear: "",
  startMonth: "",
  startDate: "",
  startHour: "",
  startMin: "",
  endYear: "",
  endMonth: "",
  endDate: "",
  endHour: "",
  endMin: "",
};

interface CreateAction {
  type: typeof CREATE;
  payload: IDateState;
}

interface RemoveAction {
  type: typeof REMOVE;
  payload: IDateState;
}

export const addDate = (saveDate: IDateState) => ({
  type: CREATE,
  payload: saveDate,
});

export type DateActionTypes = CreateAction | RemoveAction;

//reducer
const manageDate = (
  state: IDateState = initialState,
  action: DateActionTypes
): IDateState => {
  switch (action.type) {
    case CREATE:
      state = action.payload;
      return state;
    default:
      return state;
  }
};

export default manageDate;
