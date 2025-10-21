import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(p){ super(p); this.state = { hasError: false }; }
  static getDerivedStateFromError(){ return { hasError: true }; }
  render(){
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24 }}>
          <h2>Something went wrong</h2>
          <p>Reload this page or restart the dev server.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
