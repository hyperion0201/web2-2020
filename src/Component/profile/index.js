import React from "react";
import "./style.scss";

function Profile() {
  return (
    <div class="container">
      <div class="row my-2">
        <div class="col-lg-8 order-lg-2">
          <h1 className="text-center">Profile</h1>
          <div class="tab-content py-4">
            <div class="tab-pane active" id="edit">
              <form role="form">
                <div class="form-group row">
                  <label class="col-lg-3 col-form-label form-control-label">
                    Full name
                  </label>
                  <div class="col-lg-9"></div>
                </div>
                <div class="form-group row">
                  <label class="col-lg-3 col-form-label form-control-label">
                    Email
                  </label>
                  <div class="col-lg-9"></div>
                </div>
                <div class="form-group row">
                  <label class="col-lg-3 col-form-label form-control-label">
                    Username
                  </label>
                </div>
                <div class="form-group row">
                  <label class="col-lg-3 col-form-label form-control-label">
                    New Password
                  </label>
                  <div class="col-lg-9">
                    <input class="form-control" type="password" />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-lg-3 col-form-label form-control-label">
                    Confirm password
                  </label>
                  <div class="col-lg-9">
                    <input class="form-control" type="password" />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-lg-3 col-form-label form-control-label"></label>
                  <div class="col-lg-9">
                    <input
                      type="reset"
                      class="btn btn-secondary"
                      value="Cancel"
                    />
                    <input
                      type="button"
                      class="btn btn-primary"
                      value="Change Password"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-lg-4 order-lg-1 text-center">
          <img
            src="/images/cmnd.jpg"
            class="mx-auto img-fluid img-circle d-block"
            alt="avatar"
          />
          <h6 class="mt-2">
            Upload photo identification card to activate account
          </h6>
          <label class="custom-file">
            <input type="file" id="file" class="custom-file-input" />
            <span class="custom-file-control">Choose file</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Profile;