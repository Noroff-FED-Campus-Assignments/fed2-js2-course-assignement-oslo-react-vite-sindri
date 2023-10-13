import "./filters.scss";
import { useState } from "react";

export default function Filters({ renderFiltered }) {
  const [filters, setFilters] = useState([
    { label: "All posts", active: true, name: "all" },
    { label: "My posts", active: false, name: "my" },
  ]);
  const handleOnClick = function (e) {
    const clickedLabel = e.target.name;
    const updatedFilters = filters.map((filter) => {
      return {
        ...filter,
        active: filter.name === clickedLabel,
      };
    });
    setFilters(updatedFilters);
    renderFiltered();
  };

  return (
    <div className="filters">
      {filters.map(({ label, active, name }) => {
        let activeStatus = active ? "active" : "";
        return (
          <button
            name={name}
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
