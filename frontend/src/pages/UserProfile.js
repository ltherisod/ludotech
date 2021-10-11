import { useState } from "react";
import { useSelector } from "react-redux";
import DirectionsForm from "../components/DirectionsForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroPages from "../components/HeroPages";
import usersActions from "../redux/actions/usersActions";
import { useDispatch } from "react-redux";
import Address from "../components/Address";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserProfile = () => {
  const user = useSelector((state) => state.users.user);
  const { directions, email, firstname, lastname, photo, phone } = user;
  const [visibleDirectionForm, setVisibleDirectionForm] = useState(false);
  const [visiblePhone, setVisiblePhone] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addDirectionHandler = async (values) => {
    setLoading(true);
    const res = await dispatch(usersActions.addDirection(values));
    console.log(res);
    if (!res.success) setError(res.error);
    setLoading(false);
    setVisibleDirectionForm(false);
  };

  const addPhone = async (values) => {
    setLoading(true);
    const res = await dispatch(usersActions.updateAccount(values));
    console.log(res);
    if (!res.success) setError(res.error);
    setLoading(false);
    setVisiblePhone(false);
  };

  let formik = useFormik({
    initialValues: { phone: "" },
    onSubmit: (values) => {
      addPhone(values);
    },
    validationSchema: Yup.object({
      phone: Yup.number("Only numbers").required("Required"),
    }),
  });

  const initialValues = {
    alias: "",
    receiver: "",
    street: "",
    number: "",
    department: "",
    zipCode: "",
    city: "",
    state: "",
  };

  console.log(user);

  return (
    <div
      className="signInBody"
      style={{
        backgroundImage: `url("https://i.postimg.cc/3wVXYt59/back-Ludo3.png")`,
      }}
    >
      <HeroPages />
      <Header />
      <div className="flex">
        <div className="main-sign">
          <h2>Profile</h2>
          <div className="profileFirstData">
            <div
              className="logoUserProfile"
              style={{
                backgroundImage: `url('${photo}')`,
              }}
            ></div>
            <div>
              <h3>
                {firstname} {lastname}
              </h3>
              <p>{email}</p>
            </div>
          </div>
          <div className="phone">
            <div className="flex">
              <h5 className="profileTitles">Phone number:</h5>
              <p>{phone ? phone : "No phone number added."}</p>
            </div>
            <div>
              <div className="inputContainer2">
                {visiblePhone && (
                  <>
                    <div className="phoneInput">
                      <input
                        placeholder="+234 455 5353"
                        name="phone"
                        type="number"
                        value={formik.values.phone}
                        onChange={formik.handleChange("phone")}
                        onBlur={formik.handleBlur("phone")}
                      />
                      {formik.touched.phone && formik.errors.phone ? (
                        <small className="signErrorsDir">
                          {formik.errors.phone}
                        </small>
                      ) : (
                        <small className="signNoErrorsDir">NoErrors</small>
                      )}{" "}
                    </div>
                    <button
                      className="profileButton"
                      style={{
                        backgroundImage: `url("https://i.postimg.cc/mD7r09R8/button-Back.png")`,
                      }}
                      type="button"
                      onClick={formik.handleSubmit}
                    >
                      ✔
                    </button>
                  </>
                )}
                {!visiblePhone && (
                  <button
                    className="profileButton"
                    type="button"
                    onClick={() => setVisiblePhone(!visiblePhone)}
                    style={{
                      backgroundImage: `url("https://i.postimg.cc/mD7r09R8/button-Back.png")`,
                    }}
                  >
                    {phone ? "Edit" : "+"}
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="addresses">
            <h5 className="profileTitles">Addresses:</h5>
            <div className="adressesAdded">
              {!directions || directions.length === 0 ? (
                <p>There are no addresses added.</p>
              ) : (
                directions.map((direction) => {
                  return <Address direction={direction} key={direction._id} />;
                })
              )}
            </div>
            <div className="d-flex">
              <button
                className="signupButtonSignup"
                style={{
                  backgroundImage: `url("https://i.postimg.cc/mD7r09R8/button-Back.png")`,
                }}
                type="button"
                onClick={() => setVisibleDirectionForm(!visibleDirectionForm)}
              >
                {!directions || directions.length === 0
                  ? "Add Address"
                  : "Add another address"}
              </button>
            </div>
            <div className="inputsAddAddress">
              {visibleDirectionForm && (
                <DirectionsForm
                  submitCallback={addDirectionHandler}
                  initialValues={initialValues}
                  buttonText="✔"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
