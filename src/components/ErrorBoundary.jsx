import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error atrapado:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Algo salió mal 😢</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
