import "./filters.scss";
export default function Filters() {
  return (
    <div className="filters">
      <button className="filter active">All posts</button>
      <button className="filter">Active posts</button>
      <button className="filter">My posts</button>
    </div>
  );
}
