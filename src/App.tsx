import { useRef } from "react";
import { RouterProvider } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";

import { LoadingBarContext, LoadingBar } from "@/features/application";

import router from "./router";

function App() {
  const loadingBarRef = useRef(null);

  return (
    <ChakraProvider>
      <LoadingBarContext.Provider value={loadingBarRef}>
        <LoadingBar ref={loadingBarRef} />
        <RouterProvider router={router} />
      </LoadingBarContext.Provider>
    </ChakraProvider>
  );
}

export default App;
