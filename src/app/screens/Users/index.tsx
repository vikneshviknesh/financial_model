"use client";

import { useState } from "react";

import { useUserHooks } from "../../hooks/useUserHooks";

export interface UserInfoModel {
  name: string;
  email: string;
  phoneNo: string;
  address: string;
  cars: string[];
}
export default function Users() {
  const { isLoading, addNewUser, userCreateErrorMsg } = useUserHooks();

  const [userInfo, setUserInfo] = useState<UserInfoModel>({
    name: "",
    email: "",
    phoneNo: "",
    address: "",
    cars: [],
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div
        style={{
          backgroundColor: "#fff",
          padding: "100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "8px",
          position: "relative",
        }}
      >
        <p
          style={{
            position: "absolute",
            top: "7%",
            fontSize: "24px",
            color: "#000",
          }}
        >
          User Create Form
        </p>

        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#000",
            }}
          >
            <label>Username</label>
            <input
              type="text"
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({
                  ...userInfo,
                  name: e.target.value,
                })
              }
              style={{
                border: "2px solid #000",
                borderRadius: "8px",
                padding: "8px 16px",
                minWidth: "350px",
                margin: "8px 0px 0px 0px",
              }}
              placeholder="Username"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#000",
              margin: "16px 0px 0px 0px",
            }}
          >
            <label>Password</label>
            <input
              type="email"
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({
                  ...userInfo,
                  email: e.target.value,
                })
              }
              style={{
                border: "1px solid #000",
                borderRadius: "8px",
                padding: "8px 16px",
                margin: "8px 0px 0px 0px",
                minWidth: "350px",
              }}
              placeholder="Email"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#000",
              margin: "16px 0px 0px 0px",
            }}
          >
            <label>Phone Number</label>
            <input
              type="text"
              value={userInfo.phoneNo}
              onChange={(e) =>
                setUserInfo({
                  ...userInfo,
                  phoneNo: e.target.value,
                })
              }
              style={{
                border: "1px solid #000",
                borderRadius: "8px",
                padding: "8px 16px",
                margin: "8px 0px 0px 0px",
                minWidth: "350px",
              }}
              placeholder="Phone Number"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#000",
              margin: "16px 0px 0px 0px",
            }}
          >
            <label>Address</label>
            <input
              type="text"
              value={userInfo.address}
              onChange={(e) =>
                setUserInfo({
                  ...userInfo,
                  address: e.target.value,
                })
              }
              style={{
                border: "1px solid #000",
                borderRadius: "8px",
                padding: "8px 16px",
                margin: "8px 0px 0px 0px",
                minWidth: "350px",
              }}
              placeholder="Address"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#000",
              margin: "16px 0px 0px 0px",
              width: "100%",
            }}
          >
            <label>Cars</label>
            <select
              value={userInfo.cars}
              onChange={(e) => {
                const filteredList = userInfo.cars.filter(
                  (item) => item === e.target.value
                );
                const cars =
                  filteredList.length > 0
                    ? userInfo.cars.filter((item) => item !== e.target.value)
                    : [...userInfo.cars, e.target.value];
                setUserInfo({
                  ...userInfo,
                  cars: cars as string[],
                });
              }}
              style={{
                border: "1px solid #000",
                borderRadius: "8px",
                padding: "8px 16px",
                margin: "8px 0px 0px 0px",
                minWidth: "350px",
              }}
              multiple
            >
              <option value={"Volkswagen"}>Volkswagen</option>
              <option value={"Audi"}>Audi</option>
              <option value={"BMW"}>BMW</option>
              <option value={"Rolce Royce"}>Rolce Royce</option>
              <option value={"Lamborghini"}>Lamborghini</option>
              <option value={"Bughati"}>Bughati</option>
              <option value={"Ferrari"}>Ferrari</option>
            </select>
          </div>
        </>

        <p
          onClick={() => {
            addNewUser(userInfo);
          }}
          style={{
            color: "#000",
            margin: "16px 0px",
            padding: "8px 16px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Add User
        </p>

        {isLoading ? <p style={{ color: "#000" }}>Loading...</p> : null}
        {userCreateErrorMsg !== "" ? (
          <p style={{ color: "#000" }}>{userCreateErrorMsg}</p>
        ) : null}
      </div>
    </main>
  );
}
