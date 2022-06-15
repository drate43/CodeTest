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

export const CREATE = "dates/ADD_DATES" as const;

interface CreateAction {
  type: typeof CREATE;
  payload: IDateState;
}

export const addDate = (saveDate: IDateState) => ({
  type: CREATE,
  payload: saveDate,
});

export type DateActionTypes = CreateAction;

const savedDate = (state = initialState, action: any) => {};
