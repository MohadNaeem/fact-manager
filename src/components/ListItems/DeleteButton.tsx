import React, { useState } from "react";
// import ModalConfirm from "../../utils/ModalConfirm";
import { useRecords } from "../../context/RecordContext";
import DialogComponent from "../Dialogs/DialogComponent";

const BtnDelete: React.FC<{ id: string }> = ({ id }) => {
  const [showModal, setIsModalShown] = useState<boolean>(false);
  const { state: records, dispatch } = useRecords();

  const removeTaskHandler = () => {
    dispatch({ type: "DELETE_RECORD", payload: id });
  };
  return (
    <>
      <DialogComponent
        open={showModal}
        title={"Confirmation"}
        content={"This fact will be deleted permanently."}
        onClose={() => setIsModalShown(false)}
        onConfirm={removeTaskHandler}
      />
      <button
        onClick={() => setIsModalShown(true)}
        title="delete task"
        className="py-3 px-4 text-slate-50 rounded-lg  transition dark:bg-red-600 dark:hover:bg-red-700"
      >
        Delete
      </button>
    </>
  );
};

export default React.memo(BtnDelete);
