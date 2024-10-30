export const InputField = ({ type = "text", label, value, onChange, error, name }) => (
  <div className="mb-3">
    <label className="form-label">{label}</label>
    <input type={type} className="form-control" value={value} onChange={onChange} name={name} />
    {error && <div className="text-danger">{error}</div>}
  </div>
);