import React from 'react'
import uniqid from 'uniqid'
import SecondaryButton from "../buttons/SecondaryButton"
import logo from "../../images/logo.png"

function NavBar({isLoggedIn, navItems}) {

    const containerStyles = {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        height: "100%"
    }

    const leftChild = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    const rightChild = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    const renderNavItems = () => {
        if(!navItems){
            return <div>Missing Nav Items</div> 
        }

        const items = navItems.map(item => {
            return <SecondaryButton key={() => uniqid()} label={item.label} onClick={item.onClick} className={"w3-animate-zoom"}/>
        })

        return items
    }

    return (
        <div style={containerStyles}>
            <div style={leftChild}>
                <div><img src={logo} alt="Logo"  style={{width: 30, height: 30, margin: 10}}/></div>
                <div><h4><strong>q-notes</strong></h4></div>
            </div>
            <div style={rightChild}>
                {isLoggedIn && renderNavItems()}
            </div>
        </div>
    )
}

export default NavBar
