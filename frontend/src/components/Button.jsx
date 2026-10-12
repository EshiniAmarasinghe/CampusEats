// Shared, reusable UI: a styled button that forwards all other props.
function Button({ children, variant = "primary", ...rest }) {
  return (
    <button className={`btn btn-${variant}`} {...rest}>
      {children}
    </button>
  );
}
export default Button;
