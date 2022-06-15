import React, { useState } from "react";

import "./css/button.scss";
import "./css/main.scss";
import Button from "./component/Button";

import MyDateModal from "./MyDateModal";

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
