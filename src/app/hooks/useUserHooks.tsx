"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";

import { db } from "../config/firebase";
import { UserInfoModel } from "../screens/Users";

export const useUserHooks = () => {
  const [userCreateErrorMsg, setUserCreateErrorMsg] = useState("");
  const [isLoading, setLoading] = useState(false);

  const addNewUser = async (userInfo: UserInfoModel) => {
    setLoading(true);
    const userId = uuidv4();
    const payload = {
      ...userInfo,
      userId,
    };
    const userRef = doc(db, "customers", userId);
    try {
      await setDoc(userRef, payload);
      setUserCreateErrorMsg("");
      setLoading(false);
    } catch (error: any) {
      console.log("error", error);
      setLoading(false);
      setUserCreateErrorMsg(error?.message as string);
    }
  };

  return {
    isLoading,
    addNewUser,
    userCreateErrorMsg,
  };
};
