import React from "react";
import "./style.scss";
import Change_password from "../change_password";

function Profile() {
  return (
    <div className="profile center">
      <div className="background pa">
        <img
          src="/images/user-profile-icons.png"
          height="50%"
          width="50%"
        ></img>
        <h3>User Name</h3>
      </div>
      <ul className="baimfor">
        <li className="imp">
          <span>Full name:</span>
        </li>
        <li className="imp">
          <span>Email:</span>
        </li>
        <li className="imp">
          <span>Identity ID:</span>
        </li>
        <li className="imp">
          <Change_password/>
        </li>
        <li className="imp">
          <span>Log out</span>
        </li>
      </ul>
    </div>
    // <div class="container">
    //   <div class="row my-2">
    //     <div class="col-lg-8 order-lg-2">
    //       <h1>Customer information</h1>
    //       <div class="tab-content py-4">
    //         <div class="tab-pane active" id="edit">
    //           <form role="form">
    //             <div class="form-group row">
    //               <label class="col-lg-3 col-form-label label">
    //                 Full name
    //               </label>
    //               <div class="col-lg-9 col-form-label">Đinh Công Thành</div>
    //             </div>
    //             <div class="form-group row">
    //               <label class="col-lg-3 col-form-label label">
    //                 Email
    //               </label>
    //               <div class="col-lg-9"></div>
    //             </div>
    //             <div class="form-group row">
    //               <label class="col-lg-3 col-form-label label">
    //                 Identity ID
    //               </label>
    //               <div class="col-lg-9"></div>
    //             </div>
    //             <div class="form-group row">
    //               <label class="col-lg-3 col-form-label label">
    //                 Password
    //               </label>
    //               <Change_password />
    //             </div>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //     <div class="col-lg-4 order-lg-1 text-center">
    //       <img
    //         src="/images/user-profile-icons.png"
    //         class="mx-auto img-fluid img-circle d-block"
    //         alt="avatar"
    //       />
    //       <label class="custom-file">
    //         <input type="file" id="file" class="custom-file-input" accept=".png, .jpg"/>
    //         <span class="custom-file-control">Choose file</span>
    //       </label>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Profile;
