"use client";
import { useState } from "react";

import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { useRouter } from "next/navigation";

interface UserDataInterface {
  displayName: string;
  email: string;
  accessToken: string;
  uId: string;
  refreshToken: string;
  photoURL?: string;
}

export const useAuthHooks = () => {
  const router = useRouter();

  const [userData, setUserData] = useState<UserDataInterface>(
    {} as UserDataInterface
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userLoginErrorMsg, setUserLoginErrorMsg] = useState("");
  const [isLoading, setLoading] = useState(false);

  const checkIsLoggedIn = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  };

  const loginUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      setUserLoginErrorMsg("");
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const accessToken = await user.getIdToken();

      const data: UserDataInterface = {
        displayName: user.displayName || "",
        email: user.email || "",
        accessToken: accessToken || "",
        uId: user.uid || "",
        refreshToken: user.refreshToken || "",
        photoURL: user?.photoURL || "",
      };
      setUserData(data);
      setIsLoggedIn(true);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setUserLoginErrorMsg(error?.message as string);
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setLoading(false);
      setIsLoggedIn(false);
      setUserData({} as UserDataInterface);
      setUserLoginErrorMsg("");
      router.replace("/");
    } catch (error: any) {
      setLoading(false);
      setUserLoginErrorMsg(error?.message as string);
      setTimeout(() => {
        setUserLoginErrorMsg("");
      }, 2500);
    }
  };

  const profileUpdate = async ({
    displayName,
    photoURL,
  }: {
    displayName: string;
    photoURL: string;
  }) => {
    setLoading(true);
    try {
      await updateProfile(auth.currentUser as User, {
        displayName,
        photoURL,
      });
      setLoading(false);
      setUserData({
        ...userData,
        displayName,
        photoURL,
      });
      setUserLoginErrorMsg("");
      alert("Profile Updated!");
    } catch (error: any) {
      setLoading(false);
      setUserLoginErrorMsg(error?.message as string);
    }
  };

  return {
    checkIsLoggedIn,
    loginUser,
    isLoggedIn,
    userData,
    userLoginErrorMsg,
    isLoading,
    logoutUser,
    profileUpdate,
  };
};
