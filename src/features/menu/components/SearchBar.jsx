// Controlled input: the parent's state is the single source of truth.
function SearchBar({ value, onChange }) {
  return (
    <input
      className="search"
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search dishes..."
      aria-label="Search dishes"
    />
  );
}
export default SearchBar;
