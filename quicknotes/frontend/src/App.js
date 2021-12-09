import React, {useState} from "react"
import Home from "./components/pages/Home"
import Login from "./components/pages/Login"
import Signup from "./components/pages/Signup"
import NavBar from "./components/partials/NavBar"
import Footer from "./components/partials/Footer"
import colors from './tools/colors'
import 'w3-css'
import './App.css'

const navWrapperStyles = {
  background: colors.primaryBg,
  color: colors.primaryText,
  borderBottom: `solid 1px ${colors.primaryBorder}`,
}

const bodyWrapperStyles = {
  background: colors.primaryBg,
  color: colors.primaryText,
  display: "grid",
  placeItems: "center"
}

const footerWrapperStyles = {
  background: colors.primaryBorder,
  color: colors.secondaryText,
}


function App() {

  /* States */
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pageState, setPageState] = useState({
    isOnLoginPage: true,
    isOnSignupPage: false
  })


  /* Action Handlers */
  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  
  const handleLogout = () => {
     setIsLoggedIn(false)
  }

  const handleSignup = () => {
    console.log("Signing up")
  }

  const handleGoToLogin = () => {
    if(isLoggedIn){
      handleLogout()
    }

    setPageState({isOnLoginPage: true, isOnSignupPage: false})
  }

  const handleGoToSignup = () => {
    if(isLoggedIn){
      handleLogout()
    }

    setPageState({isOnLoginPage: false, isOnSignupPage: true})
  }

  /* Page Renderers */
  const renderHomePage = () => {
    return <Home />
  }

  const renderLoginPage = () => {
    return <Login handleLogin={handleLogin} handleGoToSignup={handleGoToSignup}/>
  }

  const renderSignupPage = () => {
    return <Signup handleSignup={handleSignup} handleGoToLogin={handleGoToLogin} />
  }

  
  return (
    <div className="app-layout">
      <div style={navWrapperStyles}>
        <NavBar isLoggedIn={isLoggedIn} navItems={[{label: "Logout", onClick: handleLogout}]} />
      </div>
      <div style={bodyWrapperStyles}>
        {isLoggedIn && renderHomePage()}
        {!isLoggedIn && pageState.isOnLoginPage && renderLoginPage()}
        {!isLoggedIn && pageState.isOnSignupPage && renderSignupPage()}
      </div>
      <div style={footerWrapperStyles}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
