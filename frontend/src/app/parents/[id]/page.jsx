"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import {
  createParent,
  getParentById,
  updateParent,
} from "../../../services/parent";
import { ShowMessage } from "../../../components/ShowMessage";

const FormParent = () => {
  const { register, handleSubmit, reset } = useForm();

  const router = useRouter();
  const { id } = useParams();
  const parentId = id || "add";
  const [dataMessage, setDataMessage] = useState({
    message: "",
    status: "",
    data: {},
  });
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (parentId !== "add") {
        const response = await getParentById(parentId || "");
        reset(response.data);
      }
    };

    fetchData();
  }, [parentId]);

  const formSubmit = async (formData) => {
    try {
      let response = null;
      if (parentId === "add") {
        response = await createParent(formData);
      } else {
        response = await updateParent(parentId || "", formData);
      }

      setShowMessage(true);
      setDataMessage(response);

      setTimeout(() => {
        setShowMessage(false);
        router.push("/parents");
      }, 3000);
    } catch (error) {
      console.error("Error creating/updating category:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div className="container max-w-screen-xl mx-auto px-4 h-screen py-8">
        {showMessage === true ? (
          <ShowMessage
            name={
              dataMessage.message === "Create new parent successfully"
                ? "Add Data Success"
                : dataMessage.message === "Update parent successfully"
                ? "Edit Data Success"
                : "Failed"
            }
            desc={dataMessage.message}
            status={dataMessage.status}
            show={showMessage}
          />
        ) : null}
        <div className="text-2xl mb-4">Add Parent</div>
        <div className="grid grid-cols-2 gap-4 items-center">
          <label className="label">Name Parent</label>
          <div className="">
            <input
              className="w-full border p-2"
              {...register("name")}
              placeholder="Name Parent"
            />
          </div>

          <label className="label">No Phone</label>
          <div className="">
            <input
              className="w-full border p-2"
              {...register("noPhone")}
              placeholder="No Phone"
            />
          </div>

          <label className="label">Address</label>
          <div className="">
            <textarea
              className="w-full border p-2 h-28"
              {...register("address")}
              placeholder="Address"
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

export default FormParent;
