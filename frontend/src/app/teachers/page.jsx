"use client";

import { getTeacher } from "@/services/teacher";
import ConfirmModal from "@/components/ConfirmModal";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formattedDate } from "@/helpers/formattedDate";

export default function TeacherPage() {
  const [teacher, setTeacher] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(0);
  const [confirmationModal, setConfirmationModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getTeacher();
        setTeacher(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl py-4">Data Teacher</h1>
        <Link href="/teachers/add">
          <span className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Add Teacher
          </span>
        </Link>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr className="">
            <th className="border px-4 py-2">No</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">NUPTK</th>
            <th className="border px-4 py-2">Class</th>
            <th className="border px-4 py-2">Place, Birth Date</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Gender</th>
            <th className="border px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={8} className="text-center">
                Loading...
              </td>
            </tr>
          ) : (
            teacher?.map((item, index) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.nuptk}</td>
                <td className="border px-4 py-2">{item.class.name}</td>
                <td className="border px-4 py-2">
                  {item.placeBirth + ", " + formattedDate(item.dateBirth)}
                </td>
                <td className="border px-4 py-2">{item.address}</td>
                <td className="border px-4 py-2">{item.gender}</td>
                <td className="border px-4 py-2">
                  <Link href={`/teachers/${item.id}`}>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded">
                      Edit Teacher
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      setConfirmationModal(true);
                      setId(item.id);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded ml-2"
                  >
                    Delete Teacher
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {confirmationModal && (
        <ConfirmModal
          id={id}
          setModal={setConfirmationModal}
          title="Delete teacher"
        />
      )}
    </div>
  );
}
