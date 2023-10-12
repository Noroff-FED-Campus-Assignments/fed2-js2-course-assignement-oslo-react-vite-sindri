import "./filters.scss";
import { useState } from "react";

export default function Filters() {
  const [filters, setFilters] = useState([
    { label: "All posts", active: true },
    { label: "Active posts", active: false },
    { label: "My posts", active: false },
  ]);

  const handleOnClick = function (e) {
    const clickedLabel = e.target.name;
    const updatedFilters = filters.map((filter) => {
      return {
        ...filter,
        active: filter.label === clickedLabel,
      };
    });
    setFilters(updatedFilters);
  };

  return (
    <div className="filters">
      {filters.map(({ label, active }) => {
        let activeStatus = active ? "active" : "";
        return (
          <button
            name={label}
            key={label}
            className={"filter " + activeStatus}
            onClick={handleOnClick}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
