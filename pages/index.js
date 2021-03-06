import Head from "next/head";
import { useRouter } from "next/router";

import { useState, useEffect } from "react";
import styles from "../styles/Home.module.scss";

const regex = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9]+).([a-z]+)(.[a-z])?$/;
const nameRegex = /^([a-zA-Z\s]+)$/;
const phoneRegex = /^([0-9]+)$/;

export default function Home() {
  const router = useRouter();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirm: "",
    name: "",
    phoneNum: "",
  });
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const formSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(inputs));
    setIsSubmitted(true);
  };

  const validate = (inputs) => {
    const emailIsValid = regex.test(inputs.email);
    const nameIsValid = nameRegex.test(inputs.name);
    const phoneNumIsValid = phoneRegex.test(inputs.phoneNum);

    const errors = {};
    if (inputs.email === "") {
      errors.emailErr = "email is required";
    } else if (!emailIsValid) {
      errors.emailErr = "enter a valid email";
    }

    if (inputs.password === "") {
      errors.passwordErr = "password is required";
    } else if (inputs.password.length < 8 || inputs.password.length > 16) {
      errors.passwordErr = "password length should be between 8 and 16 letters";
    }

    if (inputs.confirm === "") {
      errors.confirmErr = "confirm password is required";
    } else if (inputs.confirm !== inputs.password) {
      errors.confirmErr = "passwords are not matching";
    }

    if (inputs.name === "") {
      errors.nameErr = "name is required";
    } else if (!nameIsValid) {
      errors.nameErr = "Enter a valid name";
    }
    if (inputs.phoneNum === "") {
      errors.phoneNumErr = "mobile number is required";
    } else if (!phoneNumIsValid) {
      errors.phoneNumErr = "Enter a valid mobile number";
    } else if (inputs.phoneNum.length < 10) {
      errors.phoneNumErr = "Enter a valid mobile number";
    }

    if (!checked) {
      errors.notCheckedErr = "please select this before submitting";
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitted) {
      router.push("/barchart");
    } else {
      setIsSubmitted(false);
    }
  }, [errors]);

  return (
    <div>
      <Head>
        <title>SignUpForm</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.text}>
        <h2>Choose date range</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in
          purus
        </p>
      </div>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={formSubmit}>
          <div className={styles.form__title}>
            <h2>Create an account</h2>
          </div>
          <div className={styles.form__fields}>
            <div className={styles.fields__input}>
              <label>Your email address</label>
              <input
                value={inputs.email}
                onChange={handleInputChange}
                type="email"
                name="email"
              />
              <p style={{ color: "red" }}>{errors.emailErr}</p>
            </div>
            <div className={styles.fields__input}>
              <label>Your password</label>
              <input
                value={inputs.password}
                onChange={handleInputChange}
                type="password"
                name="password"
              />
              <p style={{ color: "red" }}>{errors.passwordErr}</p>
            </div>
            <div className={styles.fields__input}>
              <label>Confirm your password</label>
              <input
                value={inputs.confirm}
                onChange={handleInputChange}
                type="password"
                name="confirm"
              />
              <p style={{ color: "red" }}>{errors.confirmErr}</p>
            </div>
            <div className={styles.fields__input}>
              <label>Your full name</label>
              <input
                value={inputs.name}
                onChange={handleInputChange}
                type="text"
                name="name"
              />
              <p style={{ color: "red" }}>{errors.nameErr}</p>
            </div>
            <div className={styles.fields__input}>
              <label>Your phone number</label>
              <input
                value={inputs.phoneNum}
                onChange={handleInputChange}
                type="tel"
                name="phoneNum"
              />
              <p style={{ color: "red" }}>{errors.phoneNumErr}</p>
            </div>
            <div className={styles.input__checkbox}>
              <input
                defaultChecked={checked}
                onChange={() => setChecked(!checked)}
                type="checkbox"
                name="checkbox"
              />
              <label>I read and agree Terms {"&"} Conditions</label>
              <p style={{ color: "red" }}>{errors.notCheckedErr}</p>
            </div>
            <div className={styles.input__btn}>
              <input type="submit" value={"Create account"} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
