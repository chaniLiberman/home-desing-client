import { FunctionComponent, useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../services/productsService";
import Product from "../interfaces/Product";
import { successMsg } from "../services/feedbacksService";

interface UpdateProductProps {
    
}
 
const UpdateProduct: FunctionComponent<UpdateProductProps> = () => {
    let navigate = useNavigate();
    let { id } = useParams();
      useEffect(() => {
       getProductById(id as string)
           .then((res) => setProduct(res.data))
           .catch((err) => (console.log(err)))
      }, []);

      let [product, setProduct] = useState<Product>({
            title: "", 
            subtitle:"",
            description:"",
            option:"",
            category: "",
            price: 0, 
            imageUrl: "",
            imageAlt:"" 
      })

      let formik = useFormik(
        {
            initialValues: {
                title: product.title, 
            subtitle: product.subtitle,
            description: product.description,
            option: product.option,
            category: product.category,
            price: product.price, 
            imageUrl: product.imageUrl,
            imageAlt: product.imageAlt 
            }, 
            enableReinitialize: true,
            validationSchema: yup.object(
                {
            title: yup.string().required().min(2),
            subtitle: yup.string(),
            description: yup.string().required().min(2),
            option: yup.string(),
            category: yup.string().required().min(2),
            price: yup.number().required(),
            imageUrl: yup.string().required(),
            imageAlt: yup.string().required(),
                }
            ),
            onSubmit: (values) => {
               updateProduct(values, id as string)
                 .then((res) => {
                    navigate("/products");
                    successMsg("השינויים עודכנו בהצלחה");
                 })
                 .catch((err) => console.log(err))
            }
        }
      )
    return ( <>
    <h5 className="display-1">עדכון מוצר</h5>
            <div className="container col-md-4 backGround">
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-floating mb-3">
                        <input type="text"
                            className="form-control"
                            id="floatingInputDisabled"
                            placeholder="name"
                            name="title"
                            onChange={formik.handleChange}
                            value={formik.values.title}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingInputDisabled">שם מוצר</label>
                        {formik.touched.title && formik.errors.title && (
                            <p className="text-danger">{formik.errors.title}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text"
                            className="form-control"
                            id="floatingInputDisabled"
                            placeholder="name"
                            name="subtitle"
                            onChange={formik.handleChange}
                            value={formik.values.subtitle}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingInputDisabled">פירוט</label>
                        {formik.touched.subtitle && formik.errors.subtitle && (
                            <p className="text-danger">{formik.errors.subtitle}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInputDisabled" placeholder="description"
                            name="description"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingInputDisabled">תאור מורחב</label>
                        {formik.touched.description && formik.errors.description && (
                            <p className="text-danger">{formik.errors.description}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInputDisabled" placeholder="description"
                            name="option"
                            onChange={formik.handleChange}
                            value={formik.values.option}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingInputDisabled">אופציות</label>
                        {formik.touched.option && formik.errors.option && (
                            <p className="text-danger">{formik.errors.option}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInputDisabled" placeholder="Category"
                            name="category"
                            onChange={formik.handleChange}
                            value={formik.values.category}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingInputDisabled">קטגוריה</label>
                        {formik.touched.category && formik.errors.category && (
                            <p className="text-danger">{formik.errors.category}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="number" className="form-control" id="floatingInputDisabled" placeholder="0"
                            name="price"
                            onChange={formik.handleChange}
                            value={formik.values.price}
                            onBlur={formik.handleBlur} />
                        <label htmlFor="floatingInputDisabled">מחיר</label>
                        {formik.touched.price && formik.errors.price && (
                            <p className="text-danger">{formik.errors.price}</p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInputDisabled" placeholder="image"
                            name="imageUrl"
                            onChange={formik.handleChange}
                            value={formik.values.imageUrl}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="floatingInputDisabled">תמונת מוצר</label>
                        {formik.touched.imageUrl && formik.errors.imageUrl && (
                            <p className="text-danger">{formik.errors.imageUrl}</p>)}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInputDisabled" placeholder="image"
                            name="imageAlt"
                            onChange={formik.handleChange}
                            value={formik.values.imageAlt}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="floatingInputDisabled">שם תמונה</label>
                        {formik.touched.imageAlt && formik.errors.imageAlt && (
                            <p className="text-danger">{formik.errors.imageAlt}</p>)}
                    </div>
                    <button className="btn btn-primary mb-3 w-100" disabled={!formik.isValid || !formik.dirty} type="submit" style={{ background: "#947427", border: "#947427" }} >עדכון</button>
                </form>
                <button className="btn btn-danger w-100" onClick={() => navigate(-1)}>ביטול</button>
            </div>

    </> );
}
 
export default UpdateProduct;