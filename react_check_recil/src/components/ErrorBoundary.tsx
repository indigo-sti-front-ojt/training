import React, { ErrorInfo, ReactNode } from "react";

type Props = {
  children: ReactNode;
};
type State = {
  hasError: boolean;
  message: string;
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      message: "",
    };
  }
  // エラーをキャッチしてレンダー側に通知を行う
  public static getDerivedStateFromError(error: Error) {
    // エラーとエラー状況をrenderに通知するためにStateの中身を変えす
    console.log(
      "getDerivedStatefromErrorがよばれました。",
      error,
      error.message
    );
    return { hasError: true, message: error.message };
  }

  // エラー情報を保存するために使用する
  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log("componentDidCatch", error, errorInfo);
    // errorの中身を受け取ることができる
    console.log(error.message);
  }

  // エラーが吐かれたら差し替えを行う
  render() {
    if (this.state.hasError) {
      return (
        <>
          <h2>エラーが発生しました</h2>
          <div>{this.state.message}</div>
          <button onClick={() => window.location.reload()}>reload</button>
        </>
      );
    }
    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
