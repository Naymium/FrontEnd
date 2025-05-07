// CheckboxToggle.jsx
import React, { useState } from "react";

const CheckBoxToggle = ({ onToggle }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => {
      const newChecked = !prev;
      if (onToggle) onToggle(newChecked);
      return newChecked;
    });
  };

  return (
    <div>
      <input
        style={{ width: "26px", height: "26px" }}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
    </div>
  );
};

export default CheckBoxToggle;
