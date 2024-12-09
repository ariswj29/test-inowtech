import { useState } from "react";
import { deleteStudent } from "@/services/student";
import { deleteClass } from "@/services/class";
import { deleteTeacher } from "@/services/teacher";

export default function ConfirmModal(props) {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleDeleteStudent = async () => {
    try {
      const response = await deleteStudent(Number(props.id));

      const { status } = response;

      if (status == "success") {
        showToast("Delete student successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        setToastVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClass = async () => {
    try {
      const response = await deleteClass(Number(props.id));

      const { status } = response;

      if (status == "success") {
        showToast("Delete class successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        setToastVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTeacher = async () => {
    try {
      const response = await deleteTeacher(Number(props.id));

      const { status } = response;

      if (status == "success") {
        showToast("Success delete kota");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        setToastVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {toastVisible && (
        <div className="toast toast-top toast-end top-[3rem]">
          <div className="alert alert-info">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className={`bg-white p-8 rounded-lg shadow-lg z-10 border-t-8`}>
        <h3 className="text-xl font-bold">Confirm {props.title}</h3>
        <p className="my-2">Are you sure to delete this data?</p>
        <div className="grid grid-cols-2 gap-2 items-center text-center">
          <a
            className="p-2 my-4 border bg-secondary rounded-md cursor-pointer hover:font-bold"
            onClick={() => {
              if (props.title === "Delete student") {
                handleDeleteStudent();
              } else if (props.title === "Delete class") {
                handleDeleteClass();
              } else if (props.title === "Delete teacher") {
                handleDeleteTeacher();
              }
            }}
          >
            Yes
          </a>
          <a
            className="p-2 border border-secondary rounded-md cursor-pointer hover:font-bold"
            onClick={() => props.setModal(false)}
          >
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
}
