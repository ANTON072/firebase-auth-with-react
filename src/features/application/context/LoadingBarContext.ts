import { MutableRefObject, createContext } from "react";

const LoadingBarContext = createContext<MutableRefObject<null> | null>(null);

export default LoadingBarContext;
