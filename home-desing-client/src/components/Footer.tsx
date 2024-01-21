import { FunctionComponent } from "react";
import { UserInfo } from "../App";
import { NavLink, useNavigate } from "react-router-dom";
import { successMsg } from "../services/feedbacksService";


interface FooterProps {
    userInfo: UserInfo
    setUserInfo: Function;
}
 
const Footer: FunctionComponent<FooterProps> = ( {userInfo, setUserInfo} ) => {
    let navigate=useNavigate();
    return ( <>
     <div className="footerStyle">
     <footer className="py-5 pb-3 mt-5 shadow: 0 10px 20px 0 rgba(0,0,0,.1)">
                <div className="container">
                    <div className="row">
                        <div className="col-6 col-md-3 text-center">
                        <img className="footerImg" src="/images/logo.png" alt="logo" />
                        </div>

                        <div className="col-6 col-md-2 mb-3">
                            <h5>שירות לקוחות</h5>
                            <p className="nav flex-column">
                            א-ה 10:00 - 15:00
                            </p> 
                            <p className="nav flex-column">
                            טלפון: 054-8441749
                            </p>
                            <p className="nav flex-column">
                             לשליחת מייל לאתר
                           (chaniliber2@gmail.com)
                           </p>
                           <p className="nav flex-column">
                            לשליחת מייל לחנויות
                           (service@homeDesign.co.il)
                            </p>
                        </div>

                        <div className="col-6 col-md-2 mb-3">
                            <h5>תשמרו על קשר</h5>
                            <p className="nav flex-column">
                                {userInfo.email == false && <>
                                    <NavLink className="nav-link" to="/register">הרשמה</NavLink>
                                    <NavLink className="nav-link" to="/login">התחברות</NavLink>
                                </>}
                                {userInfo.email && (
                                <>
                                        <NavLink className="nav-link" onClick={() => {
                                            alert("click ok if you want to logout");
                                            sessionStorage.removeItem("userInfo");
                                            setUserInfo({email: false});
                                            successMsg("אינך מחובר , יש להתחבר כדי להוסיף מוצרים לעגלה")
                                        } } to={"/products"}>ליציאה</NavLink> 
                                </>
                            )}
                            </p>
                        </div>

                        <div className="col-md-4 offset-md-1 mb-3">
                            <form>
                                <h5>הישארו מעודכנים</h5>
                                <p>הרשמו לניוזלטר והיו הראשונים לדעת על מבצעים.</p>
                                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                                    <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                                    <input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
                                    <button className="btn btn-secondary" type="button">Subscribe</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="d-flex flex-column flex-sm-row justify-content-between py-2 my-2 border-top">
                        <p>© 2024 Chani Liberman, Inc. All rights reserved.</p>
                        <ul className="list-unstyled d-flex">
                            <li className="ms-3">
                                <i className="fa-brands fa-twitter fa-xl"></i>
                            </li>
                            <li className="ms-3">
                                <i className="fa-brands fa-facebook-f fa-xl"></i>
                            </li>
                            <li className="ms-3">
                                <i className="fa-brands fa-youtube fa-xl"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer >
            </div>
    </> );
}
 
export default Footer;