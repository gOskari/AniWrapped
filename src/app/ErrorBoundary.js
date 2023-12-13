import React from "react";
import Link from "next/link";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI

      return (
        <div className="flex h-screen w-full flex-col items-center justify-center">
          <h2>Oops, there is an error! Incorrect user name.</h2>
          <Link
            href={`/`}
            className={`rounded-lg p-3 text-2xl text-secondary-color hover:text-bg-color`}
          >
            Home
          </Link>
        </div>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;
