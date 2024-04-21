"use client";

import React, { useState } from "react";

import { Footer } from "@/app/components";
import CustomeLoader from "@/app/components/CustomeLoader";
import { useLuckyDrawHooks } from "@/app/hooks/useLuckyDraw";
import { CreateLuckyDrawInterface } from "@/app/model/luckyDraw";
import { LocalImages } from "@/app/utils";
import { getTimeOfDay } from "@/app/utils/date";
import { Button } from "@mui/material";
import Dice from "react-dice-roll";

const LuckyDrawResults = () => {
  const {
    addNewDrawResult,
    addResultErrorMsg,
    currentDrawList,
    drawListFetchErrorMsg,
    getLuckyDrawByFilter,
    isAddResultLoading,
    isDrawLoading,
  } = useLuckyDrawHooks();
  const [winnersList, setWinnersList] = useState<number[]>([]);

  let count = { max: 20, min: 1 };
  let noOfSpin = 3;

  const doATrick = () => {
    let localArray: number[] = [];
    while (noOfSpin > 0) {
      let spinnedValue = generateRandom(count.min, count.max, localArray);
      localArray.push(spinnedValue);
      noOfSpin -= 1;
      if (noOfSpin === 0) {
        const time_of_day = getTimeOfDay();
        const payload: CreateLuckyDrawInterface = {
          selected_numbers: localArray.join(","),
          time_of_day,
        };
        addNewDrawResult(payload);
        setWinnersList(localArray);
      }
    }
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

  return (
    <div
      style={{
        display: "block",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#7CFC00",
        backgroundImage: `url(${LocalImages.backgroundPoster.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <CustomeLoader isLoading={isDrawLoading} />
      <Button onClick={doATrick}>Do a flip</Button>
      <h2
        style={{
          textAlign: "center",
          color: "#fff",
          fontSize: "28px",
          textDecorationLine: "underline",
          fontFamily: "Roboto-bold",
        }}
      >
        Welcome to {process.env.companyName}
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "70%",
        }}
      >
        <ol
          style={{
            color: "#000",
            backgroundColor: "#fff",
            padding: "16px 64px 16px 32px",
            borderRadius: "4px",
            margin: "16px 0px",
            minWidth: "60%",
            minHeight: "40%",
          }}
        >
          {winnersList.map((item, index) => (
            <li key={item.toString()} style={{ fontSize: "20px" }}>
              {index + 1}. {item}
            </li>
          ))}
        </ol>
      </div>

      <Footer />
    </div>
  );
};

export default LuckyDrawResults;
