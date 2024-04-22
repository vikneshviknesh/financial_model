import React, { Suspense } from "react";
import CustomerDetails from "./CustomerDetails";

function CustomerDetailsWrapper(props: any) {
  return (
    <Suspense>
      <CustomerDetails {...props} />
    </Suspense>
  );
}

export default CustomerDetailsWrapper;
