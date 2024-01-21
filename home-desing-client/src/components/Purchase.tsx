import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface PurchaseProps {
    
}
 
const Purchase: FunctionComponent<PurchaseProps> = () => {
    return ( <>
 <div className="container col-md-6 p-5 mt-5 text-center aboutStyle backGround">
                <h6 className="display-4 text-center">מערכת הסליקה עדיין בבניה</h6>
                <p className="text-center" style={{ fontSize: "1.4rem" }}>
                באופן זמני ניתן לבצע הזמנה בטלפון : 0548441749
                </p>
                <p className="text-center" style={{ fontSize: "1.4rem" }}>
                תודה על הסבלנות
                </p>
                <div className="row text-center">
                <i className="fa-solid fa-hands-praying mb-3 mt-3" style={{fontSize:"1.5rem"}}></i>
                <Link to={"/cart"}> <i className="fa-regular fa-circle-right"></i> חזור לסל הקניות </Link>
                </div>
            </div>       
    </> );
}
 
export default Purchase;