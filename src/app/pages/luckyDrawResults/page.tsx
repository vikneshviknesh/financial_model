"use client";

import React, { useEffect } from "react";

import { Footer } from "@/app/components";
import CustomeLoader from "@/app/components/CustomeLoader";
import { useLuckyDrawHooks } from "@/app/hooks/useLuckyDraw";
import { LocalImages } from "@/app/utils";
import { LuckyDrawResultsModel } from "@/app/model/luckyDraw";
import { today } from "@/app/utils/date";
import { Strings } from "@/app/utils/strings";

const LuckyDrawResults = () => {
  const { drawList, getAllLuckyDrawResults, isDrawLoading } =
    useLuckyDrawHooks();

  useEffect(() => {
    getAllLuckyDrawResults();
  }, []);

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
      <h2
        style={{
          textAlign: "center",
          color: "#fff",
          fontSize: "28px",
          textDecorationLine: "underline",
          fontFamily: "Roboto-bold",
        }}
      >
        {Strings.welcomeTo} {process.env.companyName}
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
          {drawList[today] !== undefined
            ? drawList[today]?.map(
                (item: LuckyDrawResultsModel, index: number) => (
                  <li style={{ fontSize: "20px" }} key={item.id}>
                    {index + 1}. {item.selected_numbers}
                  </li>
                )
              )
            : null}
        </ol>
      </div>

      <Footer />
    </div>
  );
};

export default LuckyDrawResults;
