import React, { useEffect, useState } from "react";
import Calendar, { ICalDate } from "./component/Calendar";
import DropDownMenu, { IDropDownValue } from "./component/DropDownMenu";

import { useSelector, useDispatch } from "react-redux";
import { addDate, IDateState } from "./modules/dateState";
import { RootState } from "./modules";
import Modal from "./component/Modal";

const hours = (): IDropDownValue[] => {
  const arr: IDropDownValue[] = [];
  for (let i = 0; i < 24; i++) {
    const element: IDropDownValue = {
      value: i,
      header: i < 12 ? "오전 " + i + "시" : "오후 " + (i - 12) + "시",
    };
    arr.push(element);
  }
  return arr;
};

const minutes: IDropDownValue[] = [
  {
    value: 0,
    header: "0분",
  },
  {
    value: 10,
    header: "10분",
  },
  {
    value: 20,
    header: "20분",
  },
  {
    value: 30,
    header: "30분",
  },
  {
    value: 40,
    header: "40분",
  },
  {
    value: 50,
    header: "50분",
  },
];

const convertHourText = (date: number) => {
  const ret = date < 12 ? "오전 " + date + "시" : "오후 " + (date - 12) + "시";
  return ret;
};

const convertMinText = (min: number): string => {
  let ret = 0;
  if (min <= 10) ret = 10;
  else if (min <= 20) ret = 20;
  else if (min <= 30) ret = 30;
  else if (min <= 40) ret = 40;
  else if (min <= 50) ret = 50;
  return ret + "분";
};

const today = new Date();

const MyDateModal = (props: { open: boolean; onClose: Function }) => {
  const { open, onClose } = props;

  const dispatch = useDispatch(); // 디스패치 함수를 가져옵니다
  const storeState = useSelector((state: RootState) => state);

  const [hourList, setHourList] = useState<IDropDownValue[]>([]);
  const [minList, setMinList] = useState<IDropDownValue[]>([]);

  const [startDate, setStartDate] = useState<ICalDate>({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
  });
  const [startHour, setStartHour] = useState<IDropDownValue>({
    value: today.getHours(),
    header: convertHourText(today.getHours()),
  });
  const [startMin, setStartMin] = useState<IDropDownValue>({
    value: today.getMinutes() % 10,
    header: convertMinText(today.getMinutes()) + "분",
  });

  const [endDate, setEndDate] = useState<ICalDate>({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
  });
  const [endHour, setEndHour] = useState<IDropDownValue>({
    value: today.getHours(),
    header:
      today.getHours() < 12
        ? "오전 " + today.getHours() + "시"
        : "오후 " + (today.getHours() - 12) + "시",
  });
  const [endMin, setEndMin] = useState<IDropDownValue>({
    value: 0,
    header: convertMinText(today.getMinutes()) + "분",
  });

  ///////////////////////////handle modal///////////////////////
  const handleModalOnOk = () => {
    //redux 저장

    const tempDateState: IDateState = {
      startYear: String(startDate.year),
      startMonth: String(startDate.month),
      startDate: String(startDate.date),
      startHour: String(startHour.value),
      startMin: String(startMin.value),
      endYear: String(endDate.year),
      endMonth: String(endDate.month),
      endDate: String(endDate.date),
      endHour: String(endHour.value),
      endMin: String(endMin.value),
    };
    dispatch(addDate(tempDateState));

    onClose();
  };

  const handleModalOnClose = () => {
    onClose();
  };
  ////////////////////    handle start date       ///////////////////////
  const handleSelectedStartDateOnChange = (selected: ICalDate) => {
    setStartDate(selected);
  };

  const handleSelctedStartHourOnChange = (selected: IDropDownValue) => {
    setStartHour(selected);
  };

  const handleSelctedStartMinOnChange = (selected: IDropDownValue) => {
    setStartMin(selected);
  };
  //////////////////////////////////////////////////////////////////////

  ////////////////////    handle end date       ///////////////////////
  const handleSelctedEndDateOnChange = (selected: ICalDate) => {
    setEndDate(selected);
  };

  const handleSelctedEndHourOnChange = (selected: IDropDownValue) => {
    setEndHour(selected);
  };

  const handleSelctedEndMinOnChange = (selected: IDropDownValue) => {
    setEndMin(selected);
  };
  //////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setHourList(hours());
    setMinList(minutes);
  }, []);

  useEffect(() => {
    if (open) {
      const storeds = storeState.dateState;
      const dateState: IDateState = {
        startYear:
          storeds.startYear !== ""
            ? storeds.startYear
            : String(today.getFullYear()),
        startMonth:
          storeds.startMonth !== ""
            ? storeds.startMonth
            : String(today.getMonth() + 1),
        startDate:
          storeds.startDate !== ""
            ? storeds.startDate
            : String(today.getDate()),
        startHour:
          storeds.startDate !== ""
            ? storeds.startDate
            : String(today.getHours()),
        startMin:
          storeds.startMin !== ""
            ? storeds.startMin
            : String(today.getMinutes()),
        endYear:
          storeds.endYear !== ""
            ? storeds.endYear
            : String(today.getFullYear()),
        endMonth:
          storeds.endMonth !== ""
            ? storeds.endMonth
            : String(today.getMonth() + 1),
        endDate:
          storeds.endDate !== "" ? storeds.endDate : String(today.getDate()),
        endHour:
          storeds.endHour !== "" ? storeds.endHour : String(today.getHours()),
        endMin:
          storeds.endMin !== "" ? storeds.endMin : String(today.getMinutes()),
      };

      setStartDate({
        year: Number(dateState.startYear),
        month: Number(dateState.startMonth),
        date: Number(dateState.startDate),
      });
      setStartHour({
        value: dateState.startHour,
        header: convertHourText(Number(dateState.startHour)),
      });

      setStartMin({
        value: dateState.startMin,
        header: convertMinText(Number(dateState.startMin)),
      });

      setEndDate({
        year: Number(dateState.endYear),
        month: Number(dateState.endMonth),
        date: Number(dateState.endDate),
      });
      setEndHour({
        value: dateState.endHour,
        header: convertHourText(Number(dateState.endHour)),
      });

      setEndMin({
        value: dateState.startMin,
        header: convertMinText(Number(dateState.endMin)),
      });
    }
  }, [open]);

  return (
    <>
      <Modal
        open={open}
        title="응시 기간 설정"
        onOk={handleModalOnOk}
        onCancel={handleModalOnClose}
      >
        <div className="mailContent">
          <div className="dateContainer">
            <div>응시 시작일</div>
            <div className="dateDiv">
              <div className="cal">
                <Calendar
                  selectDate={startDate}
                  onChange={handleSelectedStartDateOnChange}
                />
              </div>

              <div className="hour">
                <DropDownMenu
                  selected={startHour}
                  items={hourList}
                  onChange={handleSelctedStartHourOnChange}
                />
              </div>

              <div className="min">
                <DropDownMenu
                  selected={startMin}
                  items={minList}
                  onChange={handleSelctedStartMinOnChange}
                  backColor="lightgray"
                />
              </div>
            </div>
          </div>
          <div>
            <hr className="line" />
          </div>
          <div className="dateContainer">
            <div>응시 마감일</div>
            <div className="dateDiv">
              <div className="cal">
                <Calendar
                  isSelectorColor={true}
                  onChange={handleSelctedEndDateOnChange}
                />
              </div>

              <div className="hour">
                <DropDownMenu
                  selected={endHour}
                  items={hourList}
                  onChange={handleSelctedEndHourOnChange}
                />
              </div>

              <div className="min">
                <DropDownMenu
                  selected={endMin}
                  items={minList}
                  onChange={handleSelctedEndMinOnChange}
                  backColor="gray"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MyDateModal;
