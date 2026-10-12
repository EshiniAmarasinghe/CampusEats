import { useState } from "react";
import Button from "../../../components/Button";

// Pure function: returns an object of per-field error messages.
function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Name too short";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email))
    e.email = "Enter a valid email";
  if (Number(v.qty) < 1) e.qty = "Qty must be ≥ 1";
  return e;
}

function OrderPage() {
  const [form, setForm] = useState({ name: "", email: "", qty: 1 }); // form state
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length === 0) setDone(true);
  }

  if (done) return <p className="success">Thanks, {form.name}! Order received.</p>;

  return (
    <section>
      <h2>Place an order</h2>
      <form className="order-form" onSubmit={handleSubmit} noValidate>
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </label>
        <label>
          Email
          <input name="email" value={form.email} onChange={handleChange} />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </label>
        <label>
          Quantity
          <input name="qty" type="number" value={form.qty} onChange={handleChange} />
          {errors.qty && <span className="field-error">{errors.qty}</span>}
        </label>
        <Button type="submit">Place order</Button>
      </form>
    </section>
  );
}
export default OrderPage;
