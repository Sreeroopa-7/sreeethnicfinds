import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: '#FFFDF9', fontFamily: 'sans-serif', color: '#2D2626' }}>
          <div style={{ maxWidth: '480px', width: '100%', background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', textAlign: 'center' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#961E42', marginBottom: '12px' }}>Sree Ethnic Finds</h1>
            <p style={{ color: '#666', marginBottom: '20px' }}>Something went wrong while loading this page. Please refresh or try again.</p>
            <button
              onClick={() => window.location.reload()}
              style={{ background: '#961E42', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '9999px', fontWeight: '600', cursor: 'pointer' }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
}
