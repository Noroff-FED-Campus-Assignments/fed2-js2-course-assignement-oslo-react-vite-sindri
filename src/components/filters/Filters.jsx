import "./filters.scss";
import { useState } from "react";

export default function Filters({ onChange }) {
  const [filters, setFilters] = useState([
    { label: "All posts", active: true, name: "all" },
    { label: "My posts", active: false, name: "my" },
  ]);

  const handleOnClick = function (e) {
    const clickedLabel = e.target.name;
    console.log(clickedLabel);
    const updatedFilters = filters.map((filter) => {
      return {
        ...filter,
        active: filter.name === clickedLabel,
      };
    });
    setFilters(updatedFilters);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("filter", clickedLabel);

    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;

    window.history.pushState({}, "", newUrl);
  };

  return (
    <div className="filters" onClick={onChange}>
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
