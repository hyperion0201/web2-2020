import React from "react";
import "./style.scss";
import CreateAccount from "../account";

function Homepage() {
  return (
    <div className="homepage">
      <MainOuter />
      <AboutBank />
      <FinancialStatistics />
      <Optional />
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

const FinancialStatistics = () => {
  return (
    <div className="financial">
      <div className="my-container statistic">
        <h4 className="title">Financial Statistics</h4>
        <div className="info">
          <div className="item content">
            <p className="quote">
              <i>
                "At Bank Progress, we aim to provide top quality banking
                services to a greater number of individual and corporate
                customers than any other bank in the USA or abroad. Our clients
                value data privacy and security of their banking accounts 24/7."
              </i>
            </p>
            <div className="ceo">
              <p className="author">Minh Hieu Hoang</p>
              <p className="position">CEO & Founder of Bank Progress</p>
            </div>
          </div>
          <div className="item">
            <img className="img" src="/images/img3.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Optional = () => {
  const listOption = [
    {
      icon: "aaa",
      title: "Various Locations",
      description: "We have offices in many countries including the USA and the UK."
    },
    {
      icon: "aaa",
      title: "Mobile Banking Apps",
      description: "Get instant access to your account on any device using our banking apps."
    },
    {
      icon: "aaa",
      title: "Family & Friends Programs",
      description: "Our Bank has special programs with benefits for family members."
    },
    {
      icon: "aaa",
      title: "24/7 Support",
      description: "Our Support team is always ready to help you solve any banking issues."
    },
    {
      icon: "aaa",
      title: "Personal Profile",
      description: "Register your free personal profile online to begin using our services."
    },
    {
      icon: "aaa",
      title: "Settings",
      description: "Registered clients can edit the banking account settings in 2 clicks."
    },
  ]

  return (
    <div className="my-container optional">
      <h3 className="title">The Best Banking Choice</h3>
      <p className="description">
        Since our foundation, we have been #1 banking institution for lots of
        individual and corporate customers, both in the USA and internationally.
        We provide our clients with a number of benefits.
      </p>
      <div className="list-option">
      {listOption.map(item => (
        <div key={item.title} className="option">
          <div className="icon"></div>
          <p className="title">{item.title}</p>
          <p className="description">{item.description}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Homepage;
