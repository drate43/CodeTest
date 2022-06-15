import React, { useEffect, useState } from "react";

import "./css/button.scss";
import "./css/main.scss";
import Button from "./component/Button";
import Modal from "./component/Modal";
import DropDownMenu, { IDropDownValue } from "./component/DropDownMenu";
import Calendar, { ICalValue } from "./component/Calendar";

const hours = (): IDropDownValue[] => {
  const arr: IDropDownValue[] = [];
  for (let i = 0; i < 24; i++) {
    const element: IDropDownValue = {
      value: 0,
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

const today = new Date();

function App() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [hourList, setHourList] = useState<IDropDownValue[]>([]);
  const [minList, setMinList] = useState<IDropDownValue[]>([]);

  const [selStartHour, setSelStartHour] = useState<IDropDownValue>({
    value: today.getHours(),
    header:
      today.getHours() < 12
        ? "오전 " + today.getHours() + "시"
        : "오후 " + (today.getHours() - 12) + "시",
  });

  const [startDate, setStartDate] = useState<ICalValue>();
  const [startHour, setStartHour] = useState<IDropDownValue>();
  const [startMin, setStartMin] = useState<IDropDownValue>();

  const [endDate, setEndDate] = useState<ICalValue>();
  const [endHour, setEndHour] = useState<IDropDownValue>();
  const [endMin, setEndMin] = useState<IDropDownValue>();

  const handleBtnOnClick = () => {
    console.log("onclick");
    setModalOpen(true);
  };

  ///handle modal

  const handleModalOnOk = () => {
    //redux 저장
    setModalOpen(false);
  };

  const handleModalOnClose = () => {
    setModalOpen(false);
  };
  ////////////////////    handle start date       ///////////////////////
  const handleSelectedStartDateOnChange = (selected: ICalValue) => {
    setStartDate(selected);
    console.log(selected);
  };

  const handleSelctedStartHourOnChange = (selected: IDropDownValue) => {
    setSelStartHour(selected);
    console.log(selected);
  };

  const handleSelctedStartMinOnChange = (selected: IDropDownValue) => {
    setStartMin(selected);
    console.log(selected);
  };
  //////////////////////////////////////////////////////////////////////

  ////////////////////    handle end date       ///////////////////////
  const handleSelctedEndDateOnChange = (selected: ICalValue) => {
    setEndDate(selected);
    console.log(selected);
  };

  const handleSelctedEndHourOnChange = (selected: IDropDownValue) => {
    setEndHour(selected);
    console.log(selected);
  };

  const handleSelctedEndMinOnChange = (selected: IDropDownValue) => {
    setEndMin(selected);
    console.log(selected);
  };
  //////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setHourList(hours());
    setMinList(minutes);
  }, []);

  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <Button className="myButton" onClick={handleBtnOnClick}>
          버튼 클릭
        </Button>

        <Modal
          open={modalOpen}
          title="응시 기간 설정"
          onOk={handleModalOnOk}
          onCancel={handleModalOnClose}
        >
          <div className="mailContent">
            <div className="dateContainer">
              <div>응시 시작일</div>
              <div className="dateDiv">
                <div className="cal">
                  <Calendar onChange={handleSelectedStartDateOnChange} />
                </div>

                <div className="hour">
                  <DropDownMenu
                    selected={selStartHour}
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
                    selected={selStartHour}
                    items={hourList}
                    onChange={handleSelctedEndHourOnChange}
                  />
                </div>

                <div className="min">
                  <DropDownMenu
                    selected={startMin}
                    items={minList}
                    onChange={handleSelctedEndMinOnChange}
                    backColor="gray"
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default App;
