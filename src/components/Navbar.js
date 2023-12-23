import React from "react";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="d-flex justify-content-center container-fluid ">
          <a className="d-flex align-items-center navbar-brand" href="#">
            <img
              className="directory-icon mr-2"
              width="auto"
              height="auto"
              src="https://img.icons8.com/clouds/100/user-folder.png"
              alt="user-folder"
            />
            <h3>Directory</h3>
          </a>
        </div>
      </nav>
    </div>
  );
}
