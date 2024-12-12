"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getCookies } from "../helpers/cookies";
import { FaBuilding, FaUser } from "react-icons/fa";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { dashboard } from "../services/auth";

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [dataDashboard, setDataDashboard] = useState(null);

  useEffect(() => {
    const cookies = getCookies();
    const { token, user } = cookies;
    console.log(cookies, "cookies");

    if (token) {
      setIsLogin(true);
      const dataUser = JSON.parse(user);
      setUser(dataUser);

      const fetchDashboard = async () => {
        const res = await dashboard();
        setDataDashboard(res.data);
      };

      fetchDashboard();
    }
  }, []);

  return (
    <div className="grid">
      <Image
        src="/class.jpg"
        alt="School Management"
        className="w-full object-cover"
        width={1250}
        height={1250}
      />
      <div
        className="absolute w-full text-center"
        style={{ positionArea: "center" }}
      >
        <h1 className="text-3xl font-extrabold text-center mt-4">
          {isLogin ? `Hello ${user.username}, ` : ""} Welcome to School
          Management
        </h1>
        <p className="text-center mt-4 font-semibold">
          School Management is a web application that helps school staffs to
          manage classes, students, and teachers.
        </p>
        {!isLogin ? (
          <p className="text-center mt-4 font-semibold">
            Login to start managing your school!
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-8 mt-4 max-w-screen-xl mx-auto">
            <div className="grid grid-cols-2 items-center p-8 rounded-md bg-white">
              <div className="flex items-center">
                <FaBuilding size={50} />
                <h2 className="text-xl font-semibold">Total Classes</h2>
              </div>
              <p className="text-2xl font-semibold">{dataDashboard?.classes}</p>
            </div>
            <div className="grid grid-cols-2 items-center p-8 rounded-md bg-white">
              <div className="flex items-center">
                <FaUser size={50} />
                <h2 className="text-xl font-semibold">Total Students</h2>
              </div>
              <p className="text-2xl font-semibold">
                {dataDashboard?.students}
              </p>
            </div>
            <div className="grid grid-cols-2 items-center p-8 rounded-md bg-white">
              <div className="flex items-center">
                <BsFillPersonVcardFill size={50} />
                <h2 className="text-xl font-semibold">Total Teachers</h2>
              </div>
              <p className="text-2xl font-semibold">
                {dataDashboard?.teachers}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
