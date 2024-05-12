import React, { useState } from "react";
import DialogComponent from "../Dialogs/DialogComponent";
import { Record } from "../../interfaces/Record";

const BtnView: React.FC<{ record: Record }> = ({ record }) => {
  const [showModal, setIsModalShown] = useState<boolean>(false);
  return (
    <>
      <DialogComponent
        open={showModal}
        title={"View Task"}
        content={`The fact '${record?.title}' has ${record.upvotes} upvotes`}
        onClose={() => setIsModalShown(false)}
      />
      <button
        onClick={() => setIsModalShown(true)}
        title="delete task"
        className="py-3 px-4 text-slate-50 rounded-lg  transition dark:bg-green-600 dark:hover:bg-green-700"
      >
        View
      </button>
    </>
  );
};

export default React.memo(BtnView);
