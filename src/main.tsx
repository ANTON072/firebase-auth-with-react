import React from "react";
import ReactDOM from "react-dom/client";

// import { getAuth } from "firebase/auth";

import App from "@/App";
// import firebaseApp from "@/features/firebase";

// getAuth(firebaseApp);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
