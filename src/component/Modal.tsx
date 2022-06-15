import React, { CSSProperties, PropsWithChildren } from "react";
import "../css/modal.scss";
import Button from "./Button";

interface ModalProps {
  open: boolean;
  onOk?: Function;
  onCancel?: Function;
  style?: CSSProperties;
  title: string;
}

const Modal = ({
  open = false,
  onOk,
  onCancel,
  style = {},
  title,
  children,
}: PropsWithChildren<ModalProps>) => {
  const handleOnOk = () => {
    if (onOk) onOk();
  };
  const handleOnCancel = () => {
    if (onCancel) onCancel();
  };

  return (
    <>
      <div
        key={"modal" + Math.random() * Number.MAX_SAFE_INTEGER}
        className={open ? "modal modalOpen" : "modal"}
        onClick={(e) => {
          handleOnCancel();
        }}
      >
        {open ? (
          <div
            key={"modal" + Math.random() * Number.MAX_SAFE_INTEGER}
            className="modalMain"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="modalHeader">{title}</div>
            <div className="modalBody">{children}</div>
            <div className="modalFooter">
              <Button className="myButton whiteButton" onClick={handleOnCancel}>
                취소
              </Button>
              <Button className="myButton blueButton" onClick={handleOnOk}>
                확인
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Modal;
