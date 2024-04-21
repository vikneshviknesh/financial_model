import {
  CreateLuckyDrawInterface,
  TimeOfDayInterface,
} from "@/app/model/luckyDraw";
import { currentDateTime } from "@/app/utils/date";
import { getLuckDrawNumbers } from "@/app/utils/generator";

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const firestore = admin.firestore();

exports.generateAndStoreRandomMorning = functions.pubsub
  .schedule("0 9 * * *")
  .onRun(async () => {
    return generateAndStoreRandom("morning");
  });

exports.generateAndStoreRandomAfternoon = functions.pubsub
  .schedule("0 13 * * *")
  .onRun(async () => {
    return generateAndStoreRandom("afternoon");
  });

exports.generateAndStoreRandomEvening = functions.pubsub
  .schedule("0 18 * * *")
  .onRun(async () => {
    return generateAndStoreRandom("evening");
  });

async function generateAndStoreRandom(timeOfDay: TimeOfDayInterface) {
  const random_numbers = getLuckDrawNumbers();
  const payload = {
    selected_numbers: random_numbers.join(","),
    time_of_day: timeOfDay,
    created_at: currentDateTime,
    updated_at: currentDateTime,
  };

  try {
    await firestore.collection("lucky_draw").add(payload);
    console.log(
      `Random number ${random_numbers} stored for ${timeOfDay} at ${currentDateTime}`
    );
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
