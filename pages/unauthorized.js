import { useRouter } from "next/router";
import React from "react";

function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;
  return (
    <div>
      <h1>Access Denied</h1>
      {message && <div className="text-red-500">{message}</div>}
    </div>
  );
}

export default Unauthorized;
