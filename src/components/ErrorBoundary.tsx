import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen bg-[#0b0e14] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-glass-bg border border-red-500/30 rounded-3xl p-8 backdrop-blur-xl">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <h1 className="text-2xl font-syne font-black text-text-custom mb-2">Component Crash</h1>
            <p className="text-text-soft font-outfit mb-6">
              A runtime error occurred in the UI tree.
            </p>
            <div className="bg-card rounded-xl p-4 text-left mb-6 overflow-hidden">
              <code className="text-xs text-red-400 break-words block">
                {this.state.error?.message}
              </code>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-4 rounded-xl bg-brand text-navy font-syne font-black uppercase tracking-widest hover:brightness-110 transition-all"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
