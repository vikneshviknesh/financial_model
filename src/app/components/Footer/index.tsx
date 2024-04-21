import React from "react";

function Footer() {
  return (
    <div style={{ position: "absolute", bottom: "2%", width: "100%" }}>
      <div
        style={{
          padding: "0px 8px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p>Copyright &copy; {new Date().getFullYear()}</p>
        <a href="/" style={{ textDecorationLine: "underline" }}>
          Terms & Conditions
        </a>
      </div>
    </div>
  );
}

export default Footer;
