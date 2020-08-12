import React from "react";
import "./style.scss";
import CreateAccount from "../account";

function Homepage() {
  return (
    <div className="homepage">
      <MainOuter />
      <AboutBank />
    </div>
  );
}

const MainOuter = () => {
  // const socialList = [{ title: "" }];
  return (
    <div className="main-outer">
      {/* <div className="social-list">
      </div> */}
      <div className="main-insider">
        <h3>The Fastest Way to Send Money Worldwide</h3>
        <div className="order-group">
          <CreateAccount />
        </div>
      </div>
    </div>
  );
};

const AboutBank = () => {
  return (
    <div className="my-container about-bank">
      <h5>A Few Words About Our Bank</h5>
      <p className="subtitle">
        Bank Progress was founded in 1999 to introduce the new level of
        financial services worldwide. We are still dedicated to the success of
        our clients, both individual and corporate.
      </p>
      <div className="info">
        <img
          className="info-item img"
          src="https://livedemo00.template-help.com/wt_prod-20154/images/index-1-2-570x379.jpg"
          alt=""
        />
        <p className="info-item description">
          At Bank Progress, we are guided by a common purpose to help make
          financial lives better by connecting clients and communities to the
          resource they need to be successful. We are driving growth – helping
          to create jobs, develop communities, foster economic mobility and
          address society’s biggest challenges – while managing risk and
          providing a return to our clients and our shareholders.
        </p>
      </div>
    </div>
  );
};

export default Homepage;
