import { db } from "@/app/config/firebase";
import { currentDateTime, getTimeOfDay } from "@/app/utils/date";
import { getARandomNumber } from "@/app/utils/generator";
import { addDoc, collection } from "firebase/firestore";
import { NextResponse } from "next/server";

const runNewLuckyDraw = async () => {
  const selectedNumber = getARandomNumber();
  const time_of_day = getTimeOfDay();

  const payload = {
    selected_numbers: selectedNumber.toString(),
    time_of_day,
    created_at: currentDateTime,
    updated_at: currentDateTime,
  };
  const drawRef = collection(db, "lucky_draw");

  try {
    await addDoc(drawRef, payload);
    console.log("Success");
  } catch (error) {
    console.log("Error", error);
  }
};

export async function GET() {
  try {
    runNewLuckyDraw();
    return NextResponse.json({
      user: { displayName: "Lucky draw results updated" },
    });
  } catch (error) {
    console.log(error);
  }
}
