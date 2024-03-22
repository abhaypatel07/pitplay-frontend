import React from 'react'

const loading = () => {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div
                style={{ borderTopColor: "transparent" }}
                className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"
            />
            <p className="ml-2">Loding...</p>
        </div>
    )
}

export default loading