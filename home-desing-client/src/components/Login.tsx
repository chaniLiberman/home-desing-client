import { FunctionComponent } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { checkUser, getTokenDetails} from "../services/userService";
import { errorMsg, successMsg } from "../services/feedbacksService";

interface LoginProps {
    setUserInfo: Function 
}
 
const Login: FunctionComponent<LoginProps> = ( {setUserInfo} ) => {
    let navigate = useNavigate();
    let formik = useFormik(
        {
            initialValues:{
                email:"",
                password:""
            },
            validationSchema: yup.object(
                {
                    email: yup.string().required().email("Please Enter Valid Email"),
                    password: yup.string().required().min(8),
                }
            ),
            onSubmit: (values) => {                
              checkUser(values)
              .then((res) => {
                   navigate("/");
                  successMsg(`hello ${values.email}`)
                  sessionStorage.setItem(
                      "token",
                      JSON.stringify({
                          token:res.data
                      }));

                    const data = getTokenDetails()
                  sessionStorage.setItem(
                      "userInfo",
                      JSON.stringify({
                          email: data.email,
                          isAdmin: data.isAdmin,
                          id: data._id
                      }));
                      
                      setUserInfo(
                          JSON.parse(sessionStorage.getItem("userInfo") as string)
                      );
                  }
              )
               .catch((err) => {
                  errorMsg("Wrong email or password")
                  console.log(err)
              });
      }
         }
    );
    return ( 
        <div>
            <h5 className="display-1 text-center">התחברות</h5>
            <div className="container text-center col-md-3 input backGround">
        <form onSubmit={formik.handleSubmit}>
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
     <input type="password" className="form-control" id="floatingInput3" placeholder="name@example.com"
        value={formik.values.password}
        name="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
     />
    <label htmlFor="floatingInput3">סיסמא *</label>
    {formik.touched.password && formik.errors.password && <p className="text-danger">{formik.errors.password}</p>}
</div>
  
  <button type="submit" style={{ background: "#947427", border: "#947427" }} className="btn btn-success w-100" 
   disabled={!formik.isValid || !formik.dirty} >
    לכניסה
  </button>
</form>
  <Link to="/register">משתמש חדש ? לחץ כאן כדי להרשם</Link>
</div>
</div>
 );
}
 
export default Login;