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
import withAuth from "@/app/components/AuthGuardProvider";
import moment from "moment";

const LuckyDrawContest = () => {
  const {
    isAddResultLoading,
    addNewDrawResult,
    drawList,
    isDrawLoading,
    getAllLuckyDrawResults,
  } = useLuckyDrawHooks();

  const { getLoggedInUserInfo, userData } = useAuthHooks();

  const time_of_day = getTimeOfDay();
  const today = moment().format("DD/MM/YYYY");

  useEffect(() => {
    getLoggedInUserInfo();
    getAllLuckyDrawResults();
  }, []);

  const runNewLuckyDraw = () => {
    const selectedNumber = getARandomNumber();
    const payload: CreateLuckyDrawInterface = {
      selected_numbers: selectedNumber.toString(),
      time_of_day,
    };
    addNewDrawResult(payload).then(() => {
      getAllLuckyDrawResults();
    });
  };

  const userName = userData.displayName || "User";

  const allowToFlip =
    drawList !== undefined
      ? drawList[today]?.filter(
          (item: any) => item?.time_of_day === time_of_day
        )?.length === 0
      : false;

  return (
    <>
      <Header title={`Welcome ${userName}`} showBackBtn={false} />

      <Container
        disableGutters
        sx={{
          minHeight: "calc(100vh - 64px - 56px)",
          maxHeight: "calc(100vh - 64px - 56px)",
          overflow: "auto",
        }}
      >
        <CustomeLoader isLoading={isAddResultLoading || isDrawLoading} />
        {allowToFlip ? (
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
        ) : null}
        <Box>
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
                height: "calc(100vh - 64px - 56px)",
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

export default withAuth(LuckyDrawContest);
