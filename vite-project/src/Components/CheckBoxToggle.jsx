const CheckBoxToggle = ({ checked = false, onToggle }) => {
  const handleChange = () => {
    if (onToggle) onToggle(!checked); // parent decides new state
  };

  return (
    <div>
      <input
        style={{ width: "26px", height: "26px", cursor: "pointer" }}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
    </div>
  );
};

export default CheckBoxToggle;
