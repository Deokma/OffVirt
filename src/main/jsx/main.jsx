import React from 'react';
import ReactDOM from 'react-dom';

function TestComponent() {
    return (
        <div>
            <h1>Hello, World!</h1>
        </div>
    );
}

ReactDOM.render(
    <TestComponent />,
    document.getElementById('root')
);
