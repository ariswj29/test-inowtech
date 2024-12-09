"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import {
  createStudent,
  getStudentById,
  updateStudent,
} from "@/services/student";
import { getClass } from "@/services/class";
import { ShowMessage } from "@/components/ShowMessage";

const FormStudent = () => {
  const { register, handleSubmit, reset } = useForm();

  const router = useRouter();
  const { id } = useParams();
  const studentId = id || "add";
  const [dataMessage, setDataMessage] = useState({
    message: "",
    status: "",
    data: {},
  });
  const [showMessage, setShowMessage] = useState(false);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (studentId !== "add") {
        const response = await getStudentById(studentId || "");
        reset(response.data);
      }
    };

    const fetchClasses = async () => {
      const response = await getClass();
      setClasses(response.data);
    };

    fetchClasses();
    fetchData();
  }, [studentId]);

  const formSubmit = async (formData) => {
    try {
      let response = null;
      if (studentId === "add") {
        response = await createStudent(formData);
      } else {
        response = await updateStudent(studentId || "", formData);
      }

      setShowMessage(true);
      setDataMessage(response);

      setTimeout(() => {
        setShowMessage(false);
        router.push("/students");
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
              dataMessage.message === "Create new student successfully"
                ? "Add Data Success"
                : dataMessage.message === "Update student successfully"
                ? "Edit Data Success"
                : "Failed"
            }
            desc={dataMessage.message}
            status={dataMessage.status}
            show={showMessage}
          />
        ) : null}
        <div className="text-2xl mb-4">Add Student</div>
        <div className="grid grid-cols-2 gap-4 items-center">
          <label className="label">Name Student</label>
          <div className="">
            <input
              className="w-full border p-2"
              {...register("name")}
              placeholder="Name Student"
            />
          </div>

          <label className="label">NISN</label>
          <div className="">
            <input
              className="w-full border p-2"
              {...register("nisn")}
              placeholder="NISN"
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

export default FormStudent;
