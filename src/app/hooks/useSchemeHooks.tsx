"use client";
import { useState } from "react";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";

import { db } from "../config/firebase";
import { currentDateTime } from "../utils/date";
import { CreateSchemeInterface, SchemeListInterface } from "../model/scheme";

export const useSchemeHooks = () => {
  const [schemeCreateErrorMsg, setSchemeCreateErrorMsg] = useState("");
  const [schemeList, setSchemeList] = useState<SchemeListInterface[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isSchemeListFetching, setSchemeListFetching] = useState(true);
  const [schemeListFetchErrorMsg, setSchemeListFetchErrorMsg] = useState("");

  const addNewScheme = (newScheme: CreateSchemeInterface) => {
    return new Promise(async (resolve, reject) => {
      setLoading(true);
      const payload = {
        ...newScheme,
        created_at: currentDateTime,
        updated_at: currentDateTime,
      };
      const schemeRef = doc(db, "scheme");
      try {
        await setDoc(schemeRef, payload);
        setSchemeCreateErrorMsg("");
        setLoading(false);
        resolve("success");
      } catch (error: any) {
        setLoading(false);
        setSchemeCreateErrorMsg(error?.message as string);
        reject("failure");
      }
    });
  };

  const listAllScheme = async () => {
    setSchemeListFetching(true);
    try {
      const querySnapshot = await getDocs(collection(db, "scheme"));
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSchemeList(newData as SchemeListInterface[]);
      setSchemeListFetchErrorMsg("");
      setSchemeListFetching(false);
    } catch (error: any) {
      setSchemeListFetching(false);
      setSchemeListFetchErrorMsg(error?.message as string);
    }
  };

  return {
    isLoading,
    addNewScheme,
    schemeCreateErrorMsg,
    listAllScheme,
    schemeList,
    isSchemeListFetching,
    schemeListFetchErrorMsg,
  };
};
