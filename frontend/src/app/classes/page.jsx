"use client";

import { getClass } from "@/services/class";
import ConfirmModal from "@/components/ConfirmModal";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ClassPage() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(0);
  const [confirmationModal, setConfirmationModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getClass();
        setClasses(res.data);
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
        <h1 className="text-xl py-4">Data Class</h1>
        <Link href="/classes/add">
          <span className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Add Class
          </span>
        </Link>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr className="">
            <th className="border px-4 py-2 w-10">No</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2 w-80">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4} className="text-center">
                Loading...
              </td>
            </tr>
          ) : (
            classes?.map((item, index) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.description}</td>
                <td className="border px-4 py-2">
                  <Link href={`/classes/${item.id}`}>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded">
                      Edit Class
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      setConfirmationModal(true);
                      setId(item.id);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded ml-2"
                  >
                    Delete Class
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
          title="Delete class"
        />
      )}
    </div>
  );
}
