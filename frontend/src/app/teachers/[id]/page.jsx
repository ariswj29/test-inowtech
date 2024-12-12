"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import {
  createTeacher,
  getTeacherById,
  updateTeacher,
} from "../../../services/teacher";
import { getClass } from "../../../services/class";
import { ShowMessage } from "../../../components/ShowMessage";

const FormTeacher = () => {
  const { register, handleSubmit, reset } = useForm();

  const router = useRouter();
  const { id } = useParams();
  const teacherId = id || "add";
  const [dataMessage, setDataMessage] = useState({
    message: "",
    status: "",
    data: {},
  });
  const [showMessage, setShowMessage] = useState(false);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (teacherId !== "add") {
        const response = await getTeacherById(teacherId || "");
        reset(response.data);
      }
    };

    const fetchClasses = async () => {
      const response = await getClass();
      // response.data = response.data.filter((item) => item.status === "ACTIVE");
      setClasses(response.data);
    };

    fetchClasses();
    fetchData();
  }, [teacherId]);

  const formSubmit = async (formData) => {
    try {
      let response = null;
      if (teacherId === "add") {
        response = await createTeacher(formData);
      } else {
        response = await updateTeacher(teacherId || "", formData);
      }

      setShowMessage(true);
      setDataMessage(response);

      setTimeout(() => {
        setShowMessage(false);
        router.push("/teachers");
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
              dataMessage.message === "Create new teacher successfully"
                ? "Add Data Success"
                : dataMessage.message === "Update teacher successfully"
                ? "Edit Data Success"
                : "Failed"
            }
            desc={dataMessage.message}
            status={dataMessage.status}
            show={showMessage}
          />
        ) : null}
        <div className="text-2xl mb-4">Add Teacher</div>
        <div className="grid grid-cols-2 gap-4 items-center">
          <label className="label">Name Teacher</label>
          <div className="">
            <input
              className="w-full border p-2"
              {...register("name")}
              placeholder="Name Teacher"
            />
          </div>

          <label className="label">NUPTK</label>
          <div className="">
            <input
              className="w-full border p-2"
              {...register("nuptk")}
              placeholder="NUPTK"
              type="number"
            />
          </div>

          <label className="label">Class</label>
          <div className="">
            <select className="w-full border p-2" {...register("classId")}>
              <option value="0" disabled>
                Choose Class
              </option>
              {classes &&
                classes.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>

          <label className="label">Place, Birth Date</label>
          <div className="grid grid-cols-2 gap-4">
            <input
              className="w-full border p-2 mt-2"
              {...register("placeBirth")}
              placeholder="Place Birth"
            />
            <input
              className="w-full border p-2 mt-2"
              {...register("dateBirth")}
              type="date"
            />
          </div>

          <label className="label">Gender</label>
          <div className="">
            <select className="w-full border p-2" {...register("gender")}>
              <option value="0" disabled>
                Choose Gender
              </option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>

          <label className="label">Address</label>
          <div className="">
            <textarea
              className="w-full border p-2 h-28"
              {...register("address")}
              placeholder="Address"
            />
          </div>

          <label className="label">Phone</label>
          <div className="">
            <input
              className="w-full border p-2"
              {...register("noPhone")}
              placeholder="Phone"
              type="number"
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

export default FormTeacher;
