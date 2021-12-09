import React from 'react'
import uniqid from 'uniqid'
import SecondaryButton from "../buttons/SecondaryButton"

function NavBar({isLoggedIn, navItems}) {

    const containerStyles = {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        height: "100%"
    }

    const leftChild = {
        display: "grid",
        placeItems: "center"
    }

    const rightChild = {
        display: "grid",
        placeItems: "center"
    }

    const renderNavItems = () => {
        console.log("Rann")
        if(!navItems){
            return <div>Missing Nav Items</div> 
        }

        const items = navItems.map(item => {
            return <SecondaryButton key={() => uniqid()} label={item.label} onClick={item.onClick} />
        })

        return items
    }

    return (
        <div style={containerStyles}>
            <div style={leftChild}>
                <h4>Logo</h4>
            </div>
            <div style={rightChild}>
                {isLoggedIn && renderNavItems()}
            </div>
        </div>
    )
}

export default NavBar
