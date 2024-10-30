export const LeadStatusSelect = ({ value, onChange, error, options }) => (
  <div className="mb-3">
    <label className="form-label">Lead Status</label>
    <select
      className="form-select"
      name="lead_status_id"
      value={value}
      onChange={onChange}
    >
      <option value="">Select Status</option>
      {options &&
        options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
    </select>
    {error && <div className="text-danger">{error}</div>}
  </div>
);
