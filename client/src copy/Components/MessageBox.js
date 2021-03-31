import React from 'react'

export default function MessageBox(props) {
    return (
        <div className={`alert alert -${props.vartaiant || 'info'}`}>
            <h2>{props.children}</h2>
        </div>
    )
}
