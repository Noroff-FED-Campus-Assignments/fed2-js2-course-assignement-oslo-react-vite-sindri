export default function Search({ onSearch }) {
  const performSearch = (event) => {
    event.preventDefault();
    onSearch(event.target[0].value);
  };
  return (
    <div className="search-field">
      <form onSubmit={performSearch}>
        <input type="search" placeholder="Search..." />
        <button>Search</button>
      </form>
    </div>
  );
}
