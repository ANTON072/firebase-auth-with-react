/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CSSProperties,
  forwardRef,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
} from "react";

export type LoadingBarRef = {
  continuousStart: () => void;
  complete: () => void;
};

const COLOR = "red";
const LOADER_SPEED = 500;

const defaultProps = {
  transitionTime: 300,
  waitingTime: 300,
} as const;

const initialLoaderStyle: CSSProperties = {
  height: "100%",
  background: COLOR,
  transition: `all ${LOADER_SPEED}ms ease`,
  width: "0%",
};

const loaderContainerStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  height: "2px",
  backgroundColor: "transparent",
  zIndex: 99999999999,
  width: `100%`,
};

const initialShadowStyles: CSSProperties = {
  boxShadow: `0  0 10px ${COLOR}, 0 0 10px ${COLOR}`,
  width: "5%",
  opacity: 1,
  position: "absolute",
  height: "100%",
  transition: `all ${LOADER_SPEED}ms ease`,
  transform: "rotate(3deg) translate(0px, -4px)",
  left: "-10rem",
};

const LoadingBar = forwardRef<LoadingBarRef, {}>((props, ref) => {
  const isMounted = useRef(false);
  const [localProgress, localProgressSet] = useState<number>(0);

  const pressedContinuous = useRef(false);

  const [loaderStyle, loaderStyleSet] =
    useState<CSSProperties>(initialLoaderStyle);

  const [shadowStyle, shadowStyleSet] =
    useState<CSSProperties>(initialShadowStyles);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // 親コンポーネントにカスタムrefハンドルを公開する
  // https://ja.react.dev/reference/react/useImperativeHandle#exposing-a-custom-ref-handle-to-the-parent-component
  useImperativeHandle(ref, () => ({
    continuousStart() {
      console.log("continuousStart");
    },
    complete() {
      console.log("complete");
    },
  }));

  return (
    <div>
      <div>
        <div />
      </div>
    </div>
  );
});

export default LoadingBar;
