import React from 'react'
import PrimaryButton from '../buttons/PrimaryButton'
import colors from '../../tools/colors'

function MessageModal({content, title, hideWarning}) {

    const modalContainerStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        background:"rgba(0,0,0,0.6)",
        zIndex: 10,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    const modalStyle = {
        background: colors.white,
        display: "flex",
        justifyCOntent: "center",
        alignItems: "center",
        borderRadius: 5,
        padding: 10,
    }

    const modalContentStyle = {
        margin: 20
    }

    const modalButtonContainer = {
        display: "flex",
        justifyContent: "flex-end",
    }


    return (
        <div style={modalContainerStyle}>
            <div style={modalStyle}>
                <div style={modalContentStyle}>
                    <div className='w3-border-bottom'>
                        <h3>{title}</h3>
                    </div>
                    <div>
                        <p>{content}</p>
                    </div>
                    <div style={modalButtonContainer}>
                        <PrimaryButton onClick={hideWarning} label={"OK"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageModal
