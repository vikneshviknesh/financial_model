"use client";

import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Typography,
} from "@mui/material";
import Header from "@/app/components/Header";
import { getLuckDrawNumbers } from "@/app/utils/generator";
import { useLuckyDrawHooks } from "@/app/hooks/useLuckyDraw";
import { getTimeOfDay } from "@/app/utils/date";
import { CreateLuckyDrawInterface } from "@/app/model/luckyDraw";
import CustomeLoader from "@/app/components/CustomeLoader";
import moment from "moment";

const LuckyDrawContest = () => {
  const {
    isAddResultLoading,
    addResultErrorMsg,
    addNewDrawResult,
    drawList,
    isDrawLoading,
    drawListFetchErrorMsg,
    getAllLuckyDrawResults,
  } = useLuckyDrawHooks();

  useEffect(() => {
    getAllLuckyDrawResults();
  }, []);

  const runNewLuckyDraw = () => {
    const list = getLuckDrawNumbers();
    const time_of_day = getTimeOfDay();
    const payload: CreateLuckyDrawInterface = {
      selected_numbers: list.join(","),
      time_of_day,
    };
    addNewDrawResult(payload);
  };

  const listData = [
    {
      updated_at: "22-03-2024 14:03:84",
      selected_numbers: "1,17,18",
      time_of_day: "evening",
      created_at: "22-03-2024 14:03:84",
      id: "4VwR8R0ao1TNdyXqL6RA",
    },
    {
      time_of_day: "morning",
      selected_numbers: "8,5,14",
      created_at: "20-03-2024 12:03:30",
      updated_at: "20-03-2024 12:03:30",
      id: "COqSbbCuf0e1oUT7ffXc",
    },
    {
      created_at: "22-03-2024 14:03:03",
      time_of_day: "afternoon",
      updated_at: "22-03-2024 14:03:03",
      selected_numbers: "1,15,9",
      id: "sQjtLlAGHxmydlJXhVAp",
    },
  ];

  return (
    <Container
      disableGutters
      sx={{
        height: "100vh",
        backgroundColor: "#000",
      }}
    >
      <Header title="Lucky Draw Contest" showBackBtn={true} showMenu={false} />
      <CustomeLoader isLoading={isAddResultLoading || isDrawLoading} />
      <Box
        sx={{
          padding: "8px",
          margin: "8px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button sx={{ textTransform: "capitalize" }} onClick={runNewLuckyDraw}>
          Run Draw
        </Button>
      </Box>
      {Object.keys(drawList).map((item: any) => {
        return (
          <Card
            sx={{
              backgroundColor: "#fff",
              padding: "8px",
              color: "#000",
              margin: "16px",
            }}
            key={item}
          >
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography
                sx={{
                  textTransform: "capitalize",
                  fontWeight: "700",
                  fontSize: "16px",
                }}
              >
                Dated:
              </Typography>
              <Typography ml={"8px"}>{item}</Typography>
            </Box>

            {drawList[item].map((it: any) => (
              <Box sx={{ mt: "8px" }} key={it.time_of_day}>
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: "700",
                    fontSize: "16px",
                  }}
                >
                  {it.time_of_day}
                </Typography>
                <Typography ml={"16px"}>{it.selected_numbers}</Typography>
              </Box>
            ))}
          </Card>
        );
      })}
    </Container>
  );
};

export default LuckyDrawContest;
