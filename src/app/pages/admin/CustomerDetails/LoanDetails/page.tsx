import React, { Suspense } from "react";
import LoanDetails from "./LoanDetails";

function LoanDetailsWrapper(props: any) {
  return (
    <Suspense>
      <LoanDetails {...props} />
    </Suspense>
  );
}

export default LoanDetailsWrapper;
