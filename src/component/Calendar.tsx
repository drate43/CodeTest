import React, {
  CSSProperties,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";

import "../css/calendar.scss";
import useOutsideClick from "../customHooks/useOutsideClick";

//화면에 표시하기위에 실제 값와 표시(header)값을다르게함
export interface ICalValue {
  value: number;
  header: string;
}

//달력일에 여러 속성을 추가하여 전달 다음달등 여러상황에 대비
export interface ICalDate {
  year: number;
  month: number;
  date: number; //날짜
  monthType?: "last" | "cur" | "next"; //전달/현재달/다음달에 속해있는지
  isSelected?: boolean;
}

//컴포넌트 파라메터
//selectDate로 파마메터로 선택된 값입력
interface CalProps {
  style?: CSSProperties;
  onChange?: Function;
  isSelectorColor?: Boolean;
  selectDate?: ICalDate;
}

//파라메터가 다른 날짜변경포맷

const getDateFormat = (convertDate: ICalDate | null) => {
  if (convertDate) {
    const year = convertDate.year;
    const month = convertDate.month;
    const date = convertDate.date;

    return (
      year + "년 " + (month < 10 ? "0" + month : month) + "월 " + date + "일"
    );
  } else {
    return "";
  }
};

const getDateFormat2 = (convertDate: Date) => {
  const year = convertDate.getFullYear();
  const month = convertDate.getMonth() + 1;
  const date = convertDate.getDate();

  return year + "년 " + (month < 10 ? "0" + month : month) + "월 ";
};

//달변경 데이트가져오기
const getAllMonthDate = (year: number, month: number): ICalDate[] => {
  //이전 날짜
  let lastDate = new Date(year, month - 1, 0).getDate();
  let lastDay = new Date(year, month - 1, 0).getDay(); //요일
  //다음 날짜
  const nextDate = new Date(year, month, 0).getDate();
  const nextDay = new Date(year, month, 0).getDay(); //요일

  //이전 날짜 만들기
  let lastRemainDays: ICalDate[] = [];
  if (lastDay !== 6) {
    for (let i = 0; i < lastDay + 1; i++) {
      lastRemainDays.unshift({
        year: year,
        month: month,
        date: lastDate - i,
        monthType: "last",
        isSelected: false,
      });
    }
  }
  //다음 날짜 만들기
  let nextWillDays: ICalDate[] = [];
  for (let i = 1; i < 7 - nextDay; i++) {
    if (i === 0) {
      return nextWillDays;
    }
    nextWillDays.push({
      year: year,
      month: month,
      date: i,
      monthType: "next",
      isSelected: false,
    });
  }

  //현재날짜
  //0부터 시작이라 맨처음 제거
  let dateNums: number[] = [...Array.from(Array(nextDate + 1).keys())].slice(1);

  const curDates: ICalDate[] = dateNums.map((value) => {
    return {
      year: year,
      month: month,
      date: value,
      monthType: "cur",
      isSelected: false,
    };
  });

  const allDates: ICalDate[] = lastRemainDays.concat(curDates, nextWillDays);

  return allDates;
};

const CalendarDay = (props: {
  date: ICalDate;
  isSelect: boolean;
  onClick: Function;
}) => {
  const { date, onClick } = props;

  const handleDayOnClick = () => {
    if (date.monthType === "cur") onClick(date);
  };

  return (
    <>
      <div className="dayContainer" onClick={handleDayOnClick}>
        <div className="dayMain">
          {date.monthType === "cur" ? (
            <div className={"useDay" + (date.isSelected ? " selectedDay" : "")}>
              {date.date}
            </div>
          ) : (
            <div className="cantDay">{date.date}</div>
          )}
        </div>
      </div>
    </>
  );
};

const weeks = ["일", "월", "화", "수", "목", "금", "토"];
const today = new Date();

//캘린더 컴포넌트
const Calendar = (props: CalProps) => {
  const { style, onChange, isSelectorColor, selectDate } = props;

  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const [curDate, setCurDate] = useState<Date>(today); //현재 년
  const [curAllDays, setCurAllDays] = useState<ICalDate[]>([]);

  const [selectedDate, setSelectedDate] = useState<ICalDate>({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
    isSelected: false,
    monthType: "cur",
  });

  const [tempDate1, setTempDate1] = useState<ICalDate | null>(null); //먼저 입력한 일
  const [tempDate2, setTempDate2] = useState<ICalDate | null>(null); //나중에 입력한 일

  //달력메뉴클릭
  const handelMenuOnClick = () => {
    setIsOpen(!isOpen);
  };

  //전달클릭
  const handlePrevOnClick = () => {
    const newDate = new Date(curDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurDate(newDate);

    //선택된 값 초기화
    setTempDate1(null);
    setTempDate2(null);
  };

  //다음달클릭
  const handleNextOnClick = () => {
    const newDate = new Date(curDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurDate(newDate);

    setTempDate1(null);
    setTempDate2(null);
  };

  //날짜 클릭
  const handleCalDayOnClick = (calDate: ICalDate) => {
    setSelectedDate(calDate);
    if (onChange) {
      onChange(calDate);
    }
    let tempDates = curAllDays;

    if (tempDate1 === null) {
      setTempDate1(calDate);
      tempDates = curAllDays.map((value) => {
        if (value.date === calDate.date) {
          value.isSelected = true;
        } else {
          value.isSelected = false;
        }
        return value;
      });
      setCurAllDays(tempDates);
    } else if (tempDate1 !== null && tempDate2 === null) {
      let minTempDate: ICalDate;
      let maxTempDate: ICalDate;
      const minDate = Math.min(tempDate1.date, calDate.date);

      if (minDate === tempDate1.date) {
        minTempDate = tempDate1;
        maxTempDate = calDate;
      } else {
        minTempDate = calDate;
        maxTempDate = tempDate1;
      }
      tempDates = curAllDays.map((value) => {
        if (minTempDate.date <= value.date && maxTempDate.date >= value.date) {
          value.isSelected = true;
        } else {
          value.isSelected = false;
        }
        return value;
      });
      setTempDate1(minTempDate);
      setTempDate2(maxTempDate);
      setCurAllDays(tempDates);
    } else if (tempDate1 !== null && tempDate2 !== null) {
      //둘다 선택되어있을때
      if (calDate.date > tempDate1.date && calDate.date < tempDate2.date) {
        //사이 일을 선택하였을때
        tempDates = curAllDays.map((value) => {
          if (value.date >= tempDate1.date && value.date <= calDate.date) {
            value.isSelected = true;
          } else {
            value.isSelected = false;
          }
          return value;
        });

        setTempDate2(calDate);
        setCurAllDays(tempDates);
      } else {
        tempDates = curAllDays.map((value) => {
          if (value.date === calDate.date) {
            value.isSelected = true;
          } else {
            value.isSelected = false;
          }
          return value;
        });
        setTempDate1(calDate);
        setTempDate2(null);
        setCurAllDays(tempDates);
      }
    }
  };

  useEffect(() => {
    const curMonthDays = getAllMonthDate(
      curDate.getFullYear(),
      curDate.getMonth() + 1
    );
    setCurAllDays(curMonthDays);
  }, [curDate]);

  useEffect(() => {
    if (selectDate) {
      setSelectedDate(selectDate);
    }
  }, [selectDate]);

  return (
    <>
      <div
        className="calContainer"
        // key={"cal" + Math.random() * Number.MAX_SAFE_INTEGER}
      >
        <div className="calSelector">
          <div
            className={
              "selectBtn" + (isSelectorColor === true ? " backcolor" : "")
            }
            onClick={handelMenuOnClick}
          >
            <div className="buttonContent">
              <div>{getDateFormat(selectedDate)}</div>
              <div style={{ fontSize: 10 }}>{"▼"}</div>{" "}
            </div>
          </div>
        </div>

        {isOpen ? (
          <div
            className="calContentContainer"
            // key={"cal" + Math.random() * Number.MAX_SAFE_INTEGER}
          >
            <div className="calContentMain">
              <div className="calHeader">
                <div>{getDateFormat2(curDate)}</div>
                <div>
                  <button className="arrowBtn" onClick={handlePrevOnClick}>
                    {"<"}
                  </button>
                  <button className="arrowBtn" onClick={handleNextOnClick}>
                    {">"}
                  </button>
                </div>
              </div>

              <div className="calContentBody">
                {weeks.map((value, index) => {
                  return (
                    <div
                      className="weeks"
                      // key={"weeks" + Math.random() * Number.MAX_SAFE_INTEGER}
                    >
                      {value}
                    </div>
                  );
                })}
                {curAllDays.map((value, index) => {
                  return (
                    <div
                      className="calContentDay"
                      // key={
                      //   "curAllDays" + Math.random() * Number.MAX_SAFE_INTEGER
                      // }
                    >
                      <CalendarDay
                        date={value}
                        isSelect={false}
                        onClick={handleCalDayOnClick}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Calendar;
