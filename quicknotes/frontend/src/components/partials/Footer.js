import React from 'react'

function Footer() {

    const footerStyle = {
        display: "grid",
        placeItems: "center",
        height: "100%"
    }

    return (
        <div style={footerStyle}>
            <small>Ⓒ {new Date().getFullYear()} By <a href='https://www.linkedin.com/in/benmob/' target="_blank" rel="noreferrer">Benjamin Ombeni</a></small>
        </div>
    )
}

export default Footer