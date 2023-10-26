import { Component, ErrorInfo, ReactNode } from 'react';

interface IErrorBoundaryProps {
  children?: ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  public state: IErrorBoundaryState = {
    hasError: false,
  };

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log('Uncaught error:', error, info);

    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Sorry... There was an error </h1>;
    }

    return this.props.children;
  }
}
