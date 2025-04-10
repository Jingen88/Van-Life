import React from "react"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import imageUrl from "/assets/images/avatar-icon.png"

export default function Header() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
    
    const location = useLocation()
    const navigate = useNavigate()
    const [isScrolled, setIsScrolled] = React.useState(false)
    
    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    
    function fakeLogOut() {
        localStorage.removeItem("loggedin")
        navigate("/")
    }
    
    const isHostRoute = location.pathname.startsWith("/host")

    return (
        <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
            <Link className="site-logo" to="/">#VanLife</Link>
            <nav>
                <NavLink
                    to="/host"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Host
                </NavLink>
                <NavLink
                    to="/about"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    About
                </NavLink>
                <NavLink
                    to="/vans"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Vans
                </NavLink>
                <Link to="login" className="login-link">
                    <img
                        src={imageUrl}
                        className="login-icon"
                        alt="Login"
                    />
                </Link>
                {isHostRoute && (
                    <button className="fakelogOut" onClick={fakeLogOut}>LogOut</button>
                )}
            </nav>
        </header>
    )
}