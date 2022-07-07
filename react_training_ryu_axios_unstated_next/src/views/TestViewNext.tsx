import React from "react";
import { CounterContainer } from "../provider/CounterContainer";
export const TestViewNext = () => {
  type Props = {
    amount: number;
  };
  const CouterOperate = (props: Props) => {
    const counterContainer = CounterContainer.useContainer();
    const onClick = () => {
      counterContainer.add(props.amount);
    };
    return <button onClick={onClick}>amount : {props.amount}</button>;
  };

  const CouterReset = () => {
    const counterContainer = CounterContainer.useContainer();
    const onClick = () => {
      counterContainer.reset();
    };
    return <button onClick={onClick}>リセット</button>;
  };

  const CouterDisplay = () => {
    const counterContainer = CounterContainer.useContainer();
    return <div>count : {counterContainer.count}</div>;
  };

  return (
    <>
      <CounterContainer.Provider>
        <CouterOperate amount={1} />
        <CouterOperate amount={10} />
        <CouterOperate amount={11} />
        <CouterReset />
        <CouterDisplay />
      </CounterContainer.Provider>
    </>
  );
};
