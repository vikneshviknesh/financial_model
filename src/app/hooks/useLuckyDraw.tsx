"use client";
import { useState } from "react";
import { doc, setDoc, getDocs, collection, addDoc } from "firebase/firestore";
import moment from "moment";

import { db } from "../config/firebase";
import { currentDateTime, getFormattedDate } from "../utils/date";
import {
  CreateLuckyDrawInterface,
  ListLuckyDrawInterface,
  LuckyDrawResultsModel,
  TimeOfDayInterface,
} from "../model/luckyDraw";

export const useLuckyDrawHooks = () => {
  const [isAddResultLoading, setIsAddResultLoading] = useState(false);
  const [addResultErrorMsg, setAddResultErrorMsg] = useState("");

  const [isDrawLoading, setIsDrawLoading] = useState(false);
  const [currentDrawList, setCurrentDrawList] = useState<
    ListLuckyDrawInterface[]
  >([]);
  const [drawListFetchErrorMsg, setDrawListFetchErrorMsg] = useState("");
  const [drawList, setDrawList] = useState<any>({});

  const addNewDrawResult = (newDrawResult: CreateLuckyDrawInterface) => {
    return new Promise(async (resolve, reject) => {
      setIsAddResultLoading(true);
      const payload = {
        ...newDrawResult,
        created_at: currentDateTime,
        updated_at: currentDateTime,
      };
      const drawRef = collection(db, "lucky_draw");

      try {
        await addDoc(drawRef, payload);
        setAddResultErrorMsg("");
        setIsAddResultLoading(false);
        resolve("success");
      } catch (error: any) {
        setIsAddResultLoading(false);
        setAddResultErrorMsg(error?.message as string);
        reject("failure");
      }
    });
  };

  const getAllLuckyDrawResults = async () => {
    setIsDrawLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "lucky_draw"));
      const newData = querySnapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .reverse();
      const modifiedList = groupListByDate(newData as ListLuckyDrawInterface[]);
      setDrawList(modifiedList);
      setDrawListFetchErrorMsg("");
      setIsDrawLoading(false);
    } catch (error: any) {
      setIsDrawLoading(false);
      setDrawListFetchErrorMsg(error?.message as string);
    }
  };

  const getLuckyDrawByFilter = async (request: {
    time_of_day: TimeOfDayInterface;
    date: "";
  }) => {
    setIsDrawLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "lucky_draw"));
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCurrentDrawList(newData as ListLuckyDrawInterface[]);
      setDrawListFetchErrorMsg("");
      setIsDrawLoading(false);
    } catch (error: any) {
      setIsDrawLoading(false);
      setDrawListFetchErrorMsg(error?.message as string);
    }
  };

  return {
    addNewDrawResult,
    isAddResultLoading,
    addResultErrorMsg,
    getLuckyDrawByFilter,
    currentDrawList,
    isDrawLoading,
    drawListFetchErrorMsg,
    getAllLuckyDrawResults,
    drawList,
  };
};

const groupListByDate = (list: ListLuckyDrawInterface[]) => {
  let obj: any = {};
  for (const i of list) {
    const date = getFormattedDate(
      i.created_at,
      "DD-MM-YYYYY HH:MM:SS",
      "DD/MM/YYYY"
    );
    if (obj[date]) {
      obj[date].push(i);
    } else {
      obj[date] = [i];
    }
  }
  return obj;
};
