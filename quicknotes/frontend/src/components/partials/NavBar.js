import React from 'react'
import uniqid from 'uniqid'
import SecondaryButton from "../buttons/SecondaryButton"
import logo from "../../images/logo.png"

function NavBar({isLoggedIn, navItems, firstName, lastName}) {

    const containerStyles = {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        height: "100%"
    }

    const leftChild = {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: 10
    }

    const rightChild = {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: 20
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

    const renderFirstAndLastName = () => {
        return <small className={"w3-animate-zoom"}>{firstName + " " + lastName}</small>
    }

    return (
        <div style={containerStyles}>
            <div style={leftChild}>
                <div><img src={logo} alt="Logo"  style={{width: 30, height: 30, margin: 10}}/></div>
                <div><h4><strong>Quicknotes</strong></h4></div>
            </div>
            <div style={rightChild}>
                {isLoggedIn && renderNavItems()}
                {isLoggedIn && renderFirstAndLastName()}
            </div>
        </div>
    )
}

export default NavBar
