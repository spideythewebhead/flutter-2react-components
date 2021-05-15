import React, { useMemo } from "react";
import { PromiseBuilder } from "flutter-2react-components";

function App() {
  const promise = useMemo(() => {
    return new Promise((res) => {
      setTimeout(() => res("completed!"), 5000);
    });
  }, []);

  return (
    <div>
      <span>This is a PromiseBuilder</span>
      <PromiseBuilder promise={promise}>
        {(snapshot) => <div>{snapshot}</div>}
      </PromiseBuilder>
    </div>
  );
}

export default App;
