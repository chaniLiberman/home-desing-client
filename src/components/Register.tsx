import { FunctionComponent } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { addUser, getTokenDetails } from "../services/userService";
import { errorMsg, successMsg } from "../services/feedbacksService";
import { createCart } from "../services/cartService";

interface RegisterProps {
   setUserInfo: Function 
}
 
const Register: FunctionComponent<RegisterProps> = ({setUserInfo}) => {
    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: {
          firstName: "",
          lastName: "",
          phone: "",
          password: "",
          email: "",
          city: "",
          street: "",
          houseNumber: 0,
          isAdmin: false,
          favorites: []
        },
        validationSchema: yup.object({
            firstName: yup.string().required().min(2),
            lastName: yup.string().required().min(2),
            phone: yup.string().required().min(9),
            password: yup.string().required().min(8),
            email: yup.string().required().email(),
            city: yup.string().required().min(2),
            street: yup.string().required().min(2),
            houseNumber: yup.number().required().min(2),
            isAdmin: yup.boolean(),
        }),
        onSubmit: (values) => {
            // let theStatus = status ? 'Admin' : 'Regular'
            // values = {...values, status: theStatus}
            addUser({...values, favorites: []})
            .then((res) => {
                navigate("/");
                successMsg(`hello ${values.email}`)
                sessionStorage.setItem(
                    "token",
                    JSON.stringify({
                        token : res.data
                    })
                );

                const data = getTokenDetails()
                sessionStorage.setItem(
                    "userInfo",
                    JSON.stringify({
                        email: data.email,
                        isAdmin: data.isAdmin,
                        id: data._id,
                    })
                )
                setUserInfo(
                    JSON.parse(sessionStorage.getItem("userInfo") as string)
                );
                successMsg("נוספת בהצלחה");
                //createCart(res.data.id);
            })
            .catch((err) => {
                errorMsg("יש לבדוק שוב את הנתונים")
                console.log(err);
                
            })
        }
    })
    return ( 
        <div className="container col-md-3 text-center mb-5 input backGround">
            <h5 className="display-1 text-center">הרשמה</h5>
            <form onSubmit={formik.handleSubmit}>
<div className="form-floating mb-3">
     <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"
        value={formik.values.firstName}
        name="firstName"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
     />
    <label htmlFor="floatingInput">שם פרטי *</label>
    {formik.touched.firstName && formik.errors.firstName && <p className="text-danger">{formik.errors.firstName}</p>}
</div>
<div className="form-floating mb-3">
     <input type="text" className="form-control" id="floatingInput1" placeholder="name@example.com"
        value={formik.values.lastName}
        name="lastName"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
     />
    <label htmlFor="floatingInput1">שם משפחה *</label>
    {formik.touched.lastName && formik.errors.lastName && <p className="text-danger">{formik.errors.lastName}</p>}
</div>
<div className="form-floating mb-3">
     <input type="text" className="form-control" id="floatingInput2" placeholder="name@example.com"
        value={formik.values.phone}
        name="phone"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
     />
    <label htmlFor="floatingInput2">טלפון *</label>
    {formik.touched.phone && formik.errors.phone && <p className="text-danger">{formik.errors.phone}</p>}
</div>
<div className="form-floating mb-3">
     <input type="password" className="form-control" id="floatingInput3" placeholder="name@example.com"
        value={formik.values.password}
        name="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
     />
    <label htmlFor="floatingInput3">סיסמא *</label>
    {formik.touched.password && formik.errors.password && <p className="text-danger">{formik.errors.password}</p>}
</div>
<div className="form-floating mb-3">
     <input type="email" className="form-control" id="floatingInput4" placeholder="name@example.com"
        value={formik.values.email}
        name="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
     />
    <label htmlFor="floatingInput4">אימייל *</label>
    {formik.touched.email && formik.errors.email && <p className="text-danger">{formik.errors.email}</p>}
</div>
<div className="form-floating mb-3">
     <input type="text" className="form-control" id="floatingInput5" placeholder="name@example.com"
        value={formik.values.city}
        name="city"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
     />
    <label htmlFor="floatingInput5">עיר *</label>
    {formik.touched.city && formik.errors.city && <p className="text-danger">{formik.errors.city}</p>}
</div>
<div className="form-floating mb-3">
     <input type="text" className="form-control" id="floatingInput6" placeholder="name@example.com"
        value={formik.values.street}
        name="street"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
     />
    <label htmlFor="floatingInput6">רחוב *</label>
    {formik.touched.street && formik.errors.street && <p className="text-danger">{formik.errors.street}</p>}
</div>
<div className="form-floating mb-3">
     <input type="number" className="form-control" id="floatingInput8" placeholder="name@example.com"
        value={formik.values.houseNumber}
        name="houseNumber"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
     />
    <label htmlFor="floatingInput8">מספר בית *</label>
    {formik.touched.houseNumber && formik.errors.houseNumber && <p className="text-danger">{formik.errors.houseNumber}</p>}
</div>
                    <button className="btn btn-primary mb-4 w-100" type="submit" style={{ background: "#947427", border: "#947427" }} disabled={!formik.isValid || !formik.dirty}>להרשמה</button>
            </form>

            <button className="btn btn-danger col-md-6" onClick={() => navigate(-1)}>ביטול</button>
                    <button className="btn btn-success col-md-6" onClick={() => formik.resetForm()}><i className="fa-solid fa-rotate"></i></button>
                <Link to="/login">יש לך חשבון אצלינו ? הכנס כאן</Link>    
        </div>
     );
}
 
export default Register;

// function createNewCart(id: any) {
//     throw new Error("Function not implemented.");
// }
