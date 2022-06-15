import React, { CSSProperties, PropsWithChildren } from "react";

enum buttonType {
  "primary" = "blue",
}

interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
  className?: string;
  type?: buttonType;
}

const CustomButton = ({
  children,
  onClick,
  style = {},
  className = "",
  type,
}: PropsWithChildren<ButtonProps>) => {
  const handleOnClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onClick(event);
  };

  return (
    <>
      <div>
        <button style={style} className={className} onClick={handleOnClick}>
          {children}
        </button>
      </div>
    </>
  );
};

export default CustomButton;
