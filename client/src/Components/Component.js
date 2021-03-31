import React from "react";
import { ModalContext } from "./modalContext";

const Component = () => {
  let { handleModal } = React.useContext(ModalContext);

  return (
    <>
      
      <button
        className="mt-6 rounded  bg-purple-700 text-purple-100 px-5 h-12"
        onClick={() => handleModal("This is component modal content")}
      >
        open this modal!
      </button>
    </>
  );
};

export default Component;