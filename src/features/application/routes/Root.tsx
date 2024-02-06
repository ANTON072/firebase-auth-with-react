/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useSyncExternalStore } from "react";

import { User, getAuth, onAuthStateChanged } from "firebase/auth";

import useFirebaseApp from "../hooks/useFirebaseApp";

type AuthState = {
  status: "loading" | "login" | "logout";
  user: User | undefined;
};

const initialState: AuthState = {
  status: "loading",
  user: undefined,
};

const getStore = (app: ReturnType<typeof useFirebaseApp>) => {
  let state: AuthState = initialState;

  return {
    // コンポーネントが必要とするストアにあるデータのスナップショットを返す関数
    getSnapshot: () => state,
    // ストアのデータの初期スナップショットを返す
    // サーバーレンダリング中、およびクライアント上でのサーバーレンダリングされたコンテンツのハイドレーション中にのみ使用される
    getServerSnapshot: () => initialState,
    // ストアにサブスクライブを開始する
    subscribe: (callback: () => void) => {
      const auth = getAuth(app);
      // 戻り値で購読を解除が可能
      // https://firebase.google.com/docs/reference/js/auth.auth.md?hl=ja#authonauthstatechanged
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          state = {
            status: "login",
            user,
          };
        } else {
          state = {
            status: "logout",
            user: undefined,
          };
        }
        callback();
      });

      return () => {
        unsubscribe();
      };
    },
  };
};

function Root() {
  const app = useFirebaseApp();
  const [store] = useState(() => getStore(app));

  const state = useSyncExternalStore<AuthState>(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  );

  console.log("state", state);

  return <>Root</>;
}

export default Root;
