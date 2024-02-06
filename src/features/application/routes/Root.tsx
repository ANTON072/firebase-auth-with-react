import useFirebaseAuthState from "../hooks/useFirebaseAuthState";

function Root() {
  const authState = useFirebaseAuthState();

  if (authState.status === "loading") {
    return <>Loading...</>;
  }

  return <>Root</>;
}

export default Root;
