import prisma from "../src/config/prisma";
import users from "./data/users.json";
import classes from "./data/classes.json";
import students from "./data/students.json";
import teachers from "./data/teachers.json";
import { Gender } from "@prisma/client";
import { genSalt, hash } from "bcrypt";

async function main() {
  const salt = await genSalt(10);
  for (const user of users) {
    await prisma.user.create({
      data: { ...user, password: await hash(user.password, salt) },
    });
  }
  for (const cls of classes) {
    await prisma.class.create({
      data: cls,
    });
  }
  for (const student of students) {
    await prisma.student.create({
      data: {
        ...student,
        dateBirth: new Date(student.dateBirth),
        gender: student.gender as Gender,
      },
    });
  }
  for (const teacher of teachers) {
    await prisma.teacher.create({
      data: {
        ...teacher,
        dateBirth: new Date(teacher.dateBirth),
        gender: teacher.gender as Gender,
      },
    });
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
