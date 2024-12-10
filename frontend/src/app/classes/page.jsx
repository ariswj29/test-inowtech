"use client";

import { getClass } from "@/services/class";
import ConfirmModal from "@/components/ConfirmModal";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function ClassPage() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(0);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getClass(page);
        setClasses(res.data);
        setTotalPages(res.meta.totalPages);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="container max-w-screen-xl mx-auto p-4">
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
            <th className="border px-4 py-2 w-40">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4} className="text-center">
                Loading...
              </td>
            </tr>
          ) : classes.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center">
                No data
              </td>
            </tr>
          ) : (
            classes?.map((item, index) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">
                  {page === 1 ? index + 1 : index + 1 + (page - 1) * 8}
                </td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.description}</td>
                <td className="border px-4 py-2">
                  <Link href={`/classes/${item.id}`}>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded">
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      setConfirmationModal(true);
                      setId(item.id);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded ml-2"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center gap-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:bg-slate-500"
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          Prev
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ml-2 disabled:bg-slate-500"
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

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
