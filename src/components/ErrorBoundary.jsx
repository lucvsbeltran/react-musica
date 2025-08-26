import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Cambiamos 'error' por '_error' para que ESLint no marque warning
  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error atrapado:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h2 className="text-red-600 p-4">Algo salió mal.</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

