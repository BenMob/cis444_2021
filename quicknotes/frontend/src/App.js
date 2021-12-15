import React, {useState} from "react"
import Home from "./components/pages/Home"
import Login from "./components/pages/Login"
import Signup from "./components/pages/Signup"
import NavBar from "./components/partials/NavBar"
import Footer from "./components/partials/Footer"
import UserModel from "./models/UserModel"
import MessageModal from "./components/modals/MessageModal"
import { isLoggedIn } from "./tools/authprovider"
import colors from './tools/colors'
import 'w3-css'
import './App.css'

const navWrapperStyles = {
  background: colors.primaryBg,
  color: colors.primaryText,
  borderBottom: `solid 1px ${colors.primaryBorder}`,
  position: "fixed",
  top: 0,
  width: "100%",
  zIndex: 6
}

const bodyWrapperStyles = {
  marginTop: 50,
  background: colors.primaryBg,
  color: colors.primaryText,
  display: "grid",
  placeItems: "center"
}

const footerWrapperStyles = {
  background: colors.primaryBorder,
  color: colors.secondaryText,
}

/** Root Component */
function App() {

  /* States */
  const [warning, setWarning] = useState(undefined)
  const [user, setUser] = useState(new UserModel().literal())
  const [pageState, setPageState] = useState({
    isOnLoginPage: true,
    isOnSignupPage: false
  })


  /*------------- Action Handlers --------------- */
  /** Logs the current user out */
  const handleLogout = () => {
     setUser(new UserModel().literal())
  }

  const handleSignup = () => {
    console.log("Signing up")
  }

  /** Set user state to current user */
  const handleGoToHome = (user) => {
      setUser(user)
  }

  /** Log current user out and set page state tp login page */
  const handleGoToLogin = () => {
    if(isLoggedIn(user)){
      handleLogout()
    }

    setPageState({isOnLoginPage: true, isOnSignupPage: false})
  }

  /** Log current user out and set page state to signup page */
  const handleGoToSignup = () => {
    if(isLoggedIn(user)){
      handleLogout()
    }

    setPageState({isOnLoginPage: false, isOnSignupPage: true})
  }

  /** Fills warnign state variable with content */
  const handleShowWarning = (message, title) => {
    setWarning({message: message, title: title})
  }

  /** Enmpties Warning state variabale */
  const handleHideWarning = () => {
    setWarning(undefined)
  }

  /** Checks if warning is there */
  const hasWarning = () => {
    if(warning === undefined) return false
    if(typeof warning != 'object') return false
    if(!warning.hasOwnProperty('message')) return false
    if(!warning.hasOwnProperty('title')) return false
    if(typeof warning.message != 'string') return false 
    if(typeof warning.title != 'string') return false
    if(warning.message === '') return false
    if(warning.title === '') return false

    return true
  }

  /* Page Renderers */
  const renderHomePage = () => {
    return <Home user={user} messageHandler={handleShowWarning} className={""}/>
  }

  /** Renders the Login page */
  const renderLoginPage = () => {
    return <Login handleGoToHome={handleGoToHome} handleGoToSignup={handleGoToSignup} messageHandler={handleShowWarning} className={"w3-animate-top"}/>
  }

  /** Renders the Sign up page */
  const renderSignupPage = () => {
    return <Signup handleSignup={handleSignup} handleGoToLogin={handleGoToLogin} messageHandler={handleShowWarning} className={"w3-animate-top"}/>
  }

  /** Renders the Message Modal */
  const renderMessage = () => {
    return (
      <MessageModal content={warning.message} title={warning.title} hideWarning={handleHideWarning} />
    )
  }
  
  return (
    <div className="app-layout">
      {hasWarning() && renderMessage()}
      <div style={navWrapperStyles}>
        <NavBar isLoggedIn={isLoggedIn(user)} navItems={[{label: "Logout", onClick: handleLogout}]} firstName={user.firstName} lastName={user.lastName} />
      </div>
      <div style={bodyWrapperStyles}>
        {isLoggedIn(user) && renderHomePage()}
        {!isLoggedIn(user) && pageState.isOnLoginPage && renderLoginPage()}
        {!isLoggedIn(user) && pageState.isOnSignupPage && renderSignupPage()}
      </div>
      <div style={footerWrapperStyles}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
