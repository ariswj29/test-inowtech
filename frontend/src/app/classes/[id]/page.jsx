"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { createClass, getClassById, updateClass } from "@/services/class";
import { getClass } from "@/services/class";
import { ShowMessage } from "@/components/ShowMessage";

const FormClass = () => {
  const { register, handleSubmit, reset } = useForm();

  const router = useRouter();
  const { id } = useParams();
  const classId = id || "add";
  const [dataMessage, setDataMessage] = useState({
    message: "",
    status: "",
    data: {},
  });
  const [showMessage, setShowMessage] = useState(false);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (classId !== "add") {
        const response = await getClassById(classId || "");
        reset(response.data);
      }
    };

    const fetchClasses = async () => {
      const response = await getClass();
      setClasses(response.data);
    };

    fetchClasses();
    fetchData();
  }, [classId]);

  const formSubmit = async (formData) => {
    try {
      let response = null;
      if (classId === "add") {
        response = await createClass(formData);
      } else {
        response = await updateClass(classId || "", formData);
      }

      setShowMessage(true);
      setDataMessage(response);

      setTimeout(() => {
        setShowMessage(false);
        router.push("/classes");
      }, 3000);
    } catch (error) {
      console.error("Error creating/updating category:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div className="container mx-auto px-4 h-screen py-16">
        {showMessage === true ? (
          <ShowMessage
            name={
              dataMessage.message === "Create new class successfully"
                ? "Add Data Success"
                : dataMessage.message === "Update class successfully"
                ? "Edit Data Success"
                : "Failed"
            }
            desc={dataMessage.message}
            status={dataMessage.status}
            show={showMessage}
          />
        ) : null}
        <div className="text-2xl mb-4">Add Class</div>
        <div className="grid grid-cols-2 gap-4 items-center">
          <label className="label">Name Class</label>
          <div className="">
            <input
              className="w-full border p-2"
              {...register("name")}
              placeholder="Name Class"
            />
          </div>

          <label className="label">Description</label>
          <div className="">
            <textarea
              className="w-full border p-2 h-28"
              {...register("description")}
              placeholder="Description"
            />
          </div>

          <div className="formData my-4">
            <input
              className="bg-green-500 px-4 py-2 cursor-pointer text-white rounded"
              type="submit"
              value="Save"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormClass;
