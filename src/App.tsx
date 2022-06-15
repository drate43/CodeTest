import React, { useState } from "react";

import "./css/button.scss";
import "./css/main.scss";
import Button from "./component/Button";

import MyDateModal from "./MyDateModal";

//컨트롤들이 오픈된 상태에서 다른 컨트롤을 누르면 자동으로 닫기 처리할려고 했으나...
//현재 기능 구현은 되어있지 않음.
function App() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleBtnOnClick = () => {
    setModalOpen(true);
  };

  const handleModalOnClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="App">
      <div>
        <Button className="myButton" onClick={handleBtnOnClick}>
          버튼 클릭
        </Button>

        {modalOpen ? (
          <MyDateModal open={modalOpen} onClose={handleModalOnClose} />
        ) : null}
      </div>
    </div>
  );
}

export default App;
