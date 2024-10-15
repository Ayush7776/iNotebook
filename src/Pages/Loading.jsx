import React from 'react'
import '../css/spineer.css'
const Loading = () => {
    return (
        <div className="fullscreen-spinner">
            <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
            </div>
        </div>
    )
}

export default Loading
