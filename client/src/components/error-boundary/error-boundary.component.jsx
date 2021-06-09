import { Component } from 'react';

import { ErrorImageFigure, ErrorImage, ErrorImageCaption } from './error-boundary.styles';

class ErrorBoundary extends Component {
    constructor() {
        super();

        this.state = { hasErrored: false }
    }

    static getDerivedStateFromError(error) {
        return { hasErrored: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log({ error });
        console.log({ errorInfo });
    }

    render() {
        if (this.state.hasErrored) {
            return (
                <ErrorImageFigure>
                    <ErrorImage src='https://i.imgur.com/g3hgqe8.png' alt='broken clock' />
                    <ErrorImageCaption>This Page is Broken</ErrorImageCaption>
                </ErrorImageFigure>)
        }

        return this.props.children;
    }
}

export default ErrorBoundary;