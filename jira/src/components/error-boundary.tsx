import React, { ReactNode } from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null };

  //当子组件抛出异常，这里会接受到并且调用
  static getDerivedStateFromError(error: Error) {
    return { error: true };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;

    // 两种情况 error是否存在
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
