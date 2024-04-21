// /**
//  * Import function triggers from their respective submodules:
//  *
//  * import {onCall} from "firebase-functions/v2/https";
//  * import {onDocumentWritten} from "firebase-functions/v2/firestore";
//  *
//  * See a full list of supported triggers at https://firebase.google.com/docs/functions
//  */

// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript

// // export const helloWorld = onRequest((request, response) => {
// //   logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// // });

type TimeOfDayInterface = "morning" | "afternoon" | "evening";

const moment = require("moment");
const functions = require("firebase-functions");
const admin = require("firebase-admin");

const currentDateTime = moment().format("DD-MM-YYYY HH:MM:SS");
admin.initializeApp();

const firestore = admin.firestore();

const getLuckDrawNumbers = (): number[] => {
  const count = { max: 20, min: 1 };
  let noOfSpin = 3;
  let localArray: number[] = [];
  while (noOfSpin > 0) {
    let spinnedValue = generateRandom(count.min, count.max, localArray);
    localArray.push(spinnedValue);
    noOfSpin -= 1;
    if (noOfSpin === 0) {
      return localArray;
    }
  }
  return [];
};

const generateRandom = (
  min: number,
  max: number,
  localArray: number[]
): number => {
  let spinnedValue = Math.floor(Math.random() * (max - min + 1)) + min;
  const isValueExists =
    localArray.length > 0 ? localArray.includes(spinnedValue) : false;

  return isValueExists ? generateRandom(min, max, localArray) : spinnedValue;
};

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
