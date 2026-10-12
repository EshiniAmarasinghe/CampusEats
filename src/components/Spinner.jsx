// Shared, reusable UI: the "loading" state for any request.
function Spinner({ label = "Loading…" }) {
  return (
    <p className="spinner" role="status">
      <span className="spinner-dot" aria-hidden="true" /> {label}
    </p>
  );
}
export default Spinner;
