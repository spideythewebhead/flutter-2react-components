import { render, screen } from "@testing-library/react";
import { StreamBuilder } from "../stream-builder/StreamBuilder";
import { SubscribeParams } from "../stream-builder/useStream";

function createStreamBuilder(
  subscribe?: (params: SubscribeParams<number, Object>) => VoidFunction
) {
  return (
    <StreamBuilder<number> subscribe={subscribe}>
      {(snapshot) => <div>{snapshot.state.toString()}</div>}
    </StreamBuilder>
  );
}

function delayed(ms = 0) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

test("renders StreamBuilder with state none", async () => {
  render(createStreamBuilder());

  await screen.findByText(/none/i);
});

test("renders StreamBuilder with state waiting", async () => {
  const observable = () => {
    return () => {};
  };

  render(createStreamBuilder(observable));

  await screen.findByText(/waiting/i);
});

test("renders StreamBuilder with state waiting and then active", async () => {
  const observable = ({ onNext }: { onNext: (data: number) => void }) => {
    delayed().then(() => onNext(0));

    return () => {};
  };

  render(createStreamBuilder(observable));

  await screen.findByText(/waiting/i);
  await screen.findByText(/active/i);
});

test("renders StreamBuilder with state waiting and then active and then done", async () => {
  const observable = ({
    onNext,
    onComplete,
  }: {
    onNext: (data: number) => void;
    onComplete?: VoidFunction;
  }) => {
    delayed()
      .then(() => onNext(0))
      .then(() => delayed(5))
      .then(onComplete);

    return () => {};
  };

  render(createStreamBuilder(observable));

  await screen.findByText(/waiting/i);
  await screen.findByText(/active/i);
  await screen.findByText(/done/i);
});
