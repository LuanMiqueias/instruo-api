/*
  Warnings:

  - You are about to drop the column `classSchedulesId` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the `ClassSchedules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentOnSession` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `classLink` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instructorId` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ClassSchedules" DROP CONSTRAINT "ClassSchedules_courseId_fkey";

-- DropForeignKey
ALTER TABLE "ClassSchedules" DROP CONSTRAINT "ClassSchedules_instructorId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_classSchedulesId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_instructorId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_scheduleId_fkey";

-- DropForeignKey
ALTER TABLE "StudentOnSession" DROP CONSTRAINT "StudentOnSession_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "StudentOnSession" DROP CONSTRAINT "StudentOnSession_studentId_fkey";

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "classSchedulesId",
ADD COLUMN     "classLink" TEXT NOT NULL,
ADD COLUMN     "instructorId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ClassSchedules";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "StudentOnSession";

-- CreateTable
CREATE TABLE "StudentOnScheduled" (
    "studentId" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,

    CONSTRAINT "StudentOnScheduled_pkey" PRIMARY KEY ("studentId","scheduleId")
);

-- AddForeignKey
ALTER TABLE "StudentOnScheduled" ADD CONSTRAINT "StudentOnScheduled_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentOnScheduled" ADD CONSTRAINT "StudentOnScheduled_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
