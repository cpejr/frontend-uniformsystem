import React, { useRef, useState } from "react";
import { FaCheck, FaShoppingCart } from "react-icons/fa";

function Checkbox(props) {
  const inputSize = useRef(null);
  const obj_sizes = ["PP", "P", "M", "G", "GG"];

  function Radio(gender) {
    function Content() {
      return (
        <div className="checked">
          <FaCheck color="white" />
        </div>
      );
    }

    return (
      <div className="radio" style={{ display: "flex" }}>
        {obj_sizes.map((size, index) => {
          let value;
          value = gender + "_" + size;
          return (
            <label
              key={index}
              htmlFor="radio_size_item"
              className="radio_container"
              onClick={() => props.setSelectedValue(value)}
            >
              {size}
              <input
                type="radio"
                name="radio_size_item"
                value={value}
                ref={inputSize}
              />
              <span className="radio_checkmark">
                {props.selectedValue === value ? Content() : null}
              </span>
            </label>
          );
        })}
      </div>
    );
  }

  if (props.gender === "M") {
    return (
      <div>
        <div className="divCheckboxes">
          <div className="genderCheckboxes">
            <h6>Masculino</h6>
            {Radio("Mas")}
          </div>
        </div>
      </div>
    );
  }

  if (props.gender === "F") {
    return (
      <div>
        <div className="genderCheckboxes">
          <h6>Feminino</h6>
          {Radio("Fem")}
        </div>
      </div>
    );
  }
}

export default Checkbox;
