"use client";

import React, { useEffect } from "react";
import { Box, Button, Card, Container, Typography } from "@mui/material";
import Header from "@/app/components/Header";
import { getARandomNumber } from "@/app/utils/generator";
import { useLuckyDrawHooks } from "@/app/hooks/useLuckyDraw";
import { getTimeOfDay } from "@/app/utils/date";
import { CreateLuckyDrawInterface } from "@/app/model/luckyDraw";
import CustomeLoader from "@/app/components/CustomeLoader";
import { useAuthHooks } from "@/app/hooks/useAuthHooks";

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

  const { getLoggedInUserInfo, userData } = useAuthHooks();

  useEffect(() => {
    getLoggedInUserInfo();
    getAllLuckyDrawResults();
  }, []);

  const runNewLuckyDraw = () => {
    const selectedNumber = getARandomNumber();
    const time_of_day = getTimeOfDay();
    const payload: CreateLuckyDrawInterface = {
      selected_numbers: selectedNumber.toString(),
      time_of_day,
    };
    addNewDrawResult(payload);
  };

  const userName = userData.displayName || "User";

  return (
    <>
      <Header title={`Welcome ${userName}`} showBackBtn={false} />

      <Container disableGutters sx={{ height: "100vh" }}>
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
          <Button
            sx={{ textTransform: "capitalize" }}
            onClick={runNewLuckyDraw}
          >
            Run Draw
          </Button>
        </Box>
        <Box sx={{ maxHeight: "725px" }}>
          {Object.keys(drawList).length > 0 ? (
            Object.keys(drawList).map((item: any) => {
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
            })
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>
                {isDrawLoading ? "Fetching..." : "No Data Found"}
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};

export default LuckyDrawContest;
