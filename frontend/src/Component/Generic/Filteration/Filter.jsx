import { useEffect, useState } from "react";
import { LeadStatusSelect } from "../../LeadForm/LeadStatus";
import { initialLeadFormData } from "../../../Constants/LeadForm";
import { fetchLeadStatuses } from "../../../Services/leadServices";
import { InputField } from "../InputField";
import { hasAnyKeyWithValue } from "../../../Utilis/utilis";

const FilterAccordion = ({ onFilterChange }) => {
  const [filters, setFilters] = useState(initialLeadFormData);
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [statusOptions, setStatusOptions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const fetchData = async () => {
    try {
      const statuses = await fetchLeadStatuses();
      setStatusOptions(statuses);
    } catch (error) {
      setErrors({ submit: "Error fetching data." });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetFilter = () => {
    setFilters(initialLeadFormData);
    onFilterChange(initialLeadFormData);
  }

  return (
    <div className="accordion mb-4" id="filterAccordion">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="collapseOne"
          >
            Filter Leads
          </button>
        </h2>
        <div
          id="collapseOne"
          className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
          aria-labelledby="headingOne"
        >
          <div className="accordion-body">
            <form onSubmit={handleSubmit}>
              <LeadStatusSelect
                value={filters.lead_status_id}
                onChange={handleChange}
                error={errors.lead_status_id}
                options={statusOptions}
              />

              <InputField
                label="Name"
                value={filters.name}
                onChange={handleChange}
                error={errors.name}
                name="name"
              />

              <InputField
                label="Email"
                value={filters.email}
                onChange={handleChange}
                error={errors.email}
                name="email"
              />

              <InputField
                label="Phone"
                value={filters.phone}
                onChange={handleChange}
                error={errors.phone}
                name="phone"
              />

              <button type="submit" className="btn btn-primary mr-3">
                Apply Filters
              </button>

              {hasAnyKeyWithValue(filters) && <button type="button" className="btn btn-success" onClick={() => resetFilter()}>
                 &#x2715; Reset Filter
              </button>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterAccordion;