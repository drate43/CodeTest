import React, {
  CSSProperties,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import "../css/dropdownmenu.scss";

export interface IDropDownValue {
  value: number | string;
  header: string;
}

interface DropDownProps {
  style?: CSSProperties;
  items?: IDropDownValue[];
  selected?: IDropDownValue;
  onChange?: Function;
  backColor?: "gray" | "lightgray" | "white";
}

const DropDownMenu = ({
  style,
  items,
  selected,
  onChange,
  backColor,
}: PropsWithChildren<DropDownProps>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [selectedItem, setSelectedItem] = useState<IDropDownValue>({
    value: 0,
    header: "선택해주세요",
  });
  const handelMenuOnClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelctedOnClick = useCallback(
    (selected: IDropDownValue) => {
      setSelectedItem(selected);
      setIsOpen(false);
      if (onChange) onChange(selected);
    },
    [onChange]
  );

  const selectBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected) {
      setSelectedItem(selected);
    }
  }, [selected]);

  return (
    <>
      <div className="menuContainer">
        <div className={"menuSelector"}>
          <div
            className={"selectBtn" + (isOpen === true ? " lightgray" : "")}
            onClick={handelMenuOnClick}
            ref={selectBtnRef}
          >
            <div className={"buttonContent"}>
              <div>{selectedItem.header}</div>
              <div style={{ fontSize: 10 }}>{"▼"}</div>
            </div>
          </div>
        </div>

        {isOpen ? (
          <div className="dropdownMenuContainer">
            <div className="dropdownMenu">
              <ul>
                {items?.map((item, index) => {
                  return (
                    <li
                      key={"li" + Math.random() * Number.MAX_SAFE_INTEGER}
                      onClick={() => {
                        handleSelctedOnClick(item);
                      }}
                    >
                      {item.header}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default DropDownMenu;
