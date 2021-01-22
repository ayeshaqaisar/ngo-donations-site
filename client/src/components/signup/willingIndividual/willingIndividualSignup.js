import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {useSelector} from "react-redux"
import MultiStep from "../react-multistep";
import "../css/skeleton.css";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";
import { SignUpInd } from "../../../services/user_service";

const prevStyle = { background: "#33c3f0", "borderWidth": "2px" };
const nextStyle = { background: "#33c3f0", "borderWidth": "2px" };

const WillingIndividualSignup = () => {
  const history = useHistory();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    // step 1
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [lastName, setLastName] = useState("");

    // step 2
  const [yourhelp, setYourHelp] = useState("");
  const [address, setAddress] = useState("");
  const [willhelp, setWilhlp] = useState("");
  const [occupation, setOccupation] = useState("");
  const [experience, setExperience] = useState("");

  async function submitHandler(event) {
    event.preventDefault();
    console.log("Submitted Form");
    if(!name || !password || !email || !contact) {  // only basic check since signup backend accepting empty value too
      alert("Fill Correctly !")
      window.location.reload();
    }

    if( isLoggedIn ) {  // if already logged in, then redirect
      alert("You are already logged in :D");

      history.push('/');  // redirecting to homepage
    }
    await SignUpInd(name, password, email, contact )
                  .then((res) => { // since signup backend doesn't respond with other than status code, we take response OK as fine
                    console.log("SignUp Successful...", res)

                    alert("SignUp success, now Login :D");
                    history.push('/login');

                    Promise.resolve();
                  })
                  .catch((err) => {
                    alert(err.msg || "SignUp Failed... Please try again")
                    window.location.reload();

                    console.log(err);
                  });

    console.debug("SignUp backend currently doesn't accept these: ",lastName, yourhelp, address,willhelp, occupation, experience);
  }

  return (
    <div className="container cnt1" style={{ backgroundColor: "white" }}>
      <MultiStep
        steps={[
          { component: ()=><StepOne setEmail={setEmail} setPassword={setPassword} setContact={setContact} setName={setName} setLastName={setLastName} /> },
          { component: ()=><StepTwo setYourHelp={setYourHelp} setAddress={setAddress} setWilhlp={setWilhlp} setOccupation={setOccupation} setExperience={setExperience}/> },
          { component: ()=><StepThree submitHandler={submitHandler} /> },
        ]}
        prevStyle={prevStyle}
        nextStyle={nextStyle}
        onSubmit={submitHandler}
        />
      <div className="container app-footer"></div>
    </div>
  );
}

export default WillingIndividualSignup;
