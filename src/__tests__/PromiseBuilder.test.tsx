import { render, screen } from "@testing-library/react";
import { PromiseBuilder } from "../promise-builder/PromiseBuilder";

function createPromiseBuilder<T>(promise?: Promise<T>) {
  return (
    <PromiseBuilder<T> promise={promise}>
      {(snapshot) => (
        <>
          <div>{snapshot.state.toString()}</div>
          {snapshot.hasData && <div>{snapshot.data}</div>}
          {snapshot.hasError && <div>{snapshot.error}</div>}
        </>
      )}
    </PromiseBuilder>
  );
}

function delayed(ms = 0, value?: any, error?: any) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (value) return res(value);
      if (error) return rej(error);

      res(undefined);
    }, ms);
  });
}

test("renders PromiseBuilder with state none", async () => {
  render(createPromiseBuilder());

  await screen.findByText(/none/i);
});

test("renders PromiseBuilder with state waiting and then done with data", async () => {
  const promise = delayed(5, "i resolved");

  render(createPromiseBuilder(promise));

  await screen.findByText(/waiting/i);
  await screen.findByText(/done/i);
  await screen.findByText(/i resolved/i);
});

test("renders StreamBuilder with state waiting and then done with error", async () => {
  const promise = delayed(5, undefined, "i failed");

  render(createPromiseBuilder(promise));

  await screen.findByText(/waiting/i);
  await screen.findByText(/done/i);
  await screen.findByText(/i failed/i);
});
