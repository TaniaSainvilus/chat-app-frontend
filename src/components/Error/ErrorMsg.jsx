import React from 'react'

export default function ErrorMsg(props) {
    return (
        <div className="error-message">
            <span>{props.message}</span>
            <button onClick={props.clearError}>X</button>
        </div>
    )
}
