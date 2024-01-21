import { FunctionComponent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserInfo } from "../App";
import { successMsg } from "../services/feedbacksService";

interface NavbarProps {
    userInfo: UserInfo
    setUserInfo: Function;
}
 
const Navbar: FunctionComponent<NavbarProps> = ({ userInfo , setUserInfo}) => {
    let navigate = useNavigate();
    return ( <>
    <div className="navbarStyle">
    <nav className="navbar navbar-expand-lg shadow">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/products">
            <img src="/images/logo.png" style={{ width: "150px", height: "80px", }} alt="logo" />
            </NavLink>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">

                <div className="navbar-nav">
                    <NavLink className="nav-link" to="/">ראשי</NavLink>
                    <NavLink className="nav-link" to="/about">מי אנחנו</NavLink>
                    {userInfo.email == false && <>
                                <div className="navbar-nav">
                              <NavLink className="nav-link" to="/register">הרשמה</NavLink>
                              </div>
                              <div className="navbar-nav">
                              <NavLink className="nav-link" to="/login">התחברות</NavLink>
                              </div>
                            </>}
                    <NavLink className="nav-link" to="/favorites"><i className="fa-regular fa-heart"></i></NavLink>
                    {userInfo.email &&
                    <NavLink className="nav-link" to="/cart"><i className="fa-solid fa-cart-shopping"></i></NavLink>
                    }
                    {userInfo.email == false &&
                    <NavLink className="nav-link" to="/login"><i className="fa-solid fa-cart-shopping"></i></NavLink>
                    }
                </div> 
                {userInfo.email && (
                                <>
                                    <div className="ml-auto d-flex ms-auto" role="search">
                                        <img src="/Images/user.png" alt="user" style={{ width: "40px", height: "40px" }} onClick={() => {
                                            alert("click ok if you want to logout")
                                            sessionStorage.removeItem("userInfo")
                                            sessionStorage.removeItem("token")
                                            setUserInfo({ email: false })
                                            navigate("/products")
                                            successMsg("אינך מחובר , יש להתחבר כדי להוסיף מוצרים לעגלה")
                                        }} />
                                    </div>
                                </>
                            )}
            </div>
          </div>
        </nav>
        </div>
    </> );
}
 
export default Navbar;