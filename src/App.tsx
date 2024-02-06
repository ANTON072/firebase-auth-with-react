import { RouterProvider } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";

import { router } from "@/features/application";

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
