import React from "react";
import { Link } from "react-router-dom";
import "./AdmButton.css";

import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import HomeIcon from "@material-ui/icons/Home";


function AdmButton({ linkToRedirect, isEdit }) {
    return (
      <Link
        to={linkToRedirect}
        className="admButton"
      >
        <Fab color="primary" aria-label="home">
          {
            isEdit ? (
              <EditIcon />
            )
            : (
              <HomeIcon />
            )
          }
        </Fab>
      </Link>
    );
}

export default AdmButton;
