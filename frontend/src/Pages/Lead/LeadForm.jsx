import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  fetchLeadStatuses,
  fetchLeadData,
  createLead,
  updateLead,
} from "../../Services/leadServices";
import { InputField } from "../../Component/Generic/InputField";
import { LeadStatusSelect } from "../../Component/LeadForm/LeadStatus";
import { validateLeadForm } from "../../Utilis/utilis";
import { initialLeadFormData } from "../../Constants/LeadForm";
import Header from "../../Component/Generic/Header";

const LeadForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState(initialLeadFormData);
  const [errors, setErrors] = useState({});
  const [statusOptions, setStatusOptions] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchData = async () => {
    try {
      const statuses = await fetchLeadStatuses();
      setStatusOptions(statuses);
      if (id) {
        const leadData = await fetchLeadData(id);
        setFormData({
          ...leadData,
        });
      }
    } catch (error) {
      setErrors({ submit: "Error fetching data." });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLeadForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = id
          ? await updateLead(id, formData)
          : await createLead(formData);
        setErrors({});
        setSuccessMessage(response.message);
        if (!id) {
          setFormData(initialLeadFormData);
        }
      } catch (error) {
        setSuccessMessage("");
        setErrors({
          submit:
            error.response?.data?.message ||
            "Error submitting form. Please try again.",
        });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        <Header />
        <h3>
          {id ? "Edit Lead" : "Add Lead"}{" "}
          <Link to="/">
            <button
              type="button"
              className="btn btn-primary"
              style={{ float: "right" }}
            >
              Leads
            </button>
          </Link>
        </h3>
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        {errors.submit && (
          <div className="alert alert-danger text-danger">{errors.submit}</div>
        )}
        <InputField
          label="Name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          name="name"
        />
        <InputField
          label="Email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          name="email"
        />
        <InputField
          label="Phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          name="phone"
        />
        <LeadStatusSelect
          value={formData.lead_status_id}
          onChange={handleChange}
          error={errors.lead_status_id}
          options={statusOptions}
        />
        <button type="submit" className="btn btn-primary">
          {id ? "Update Lead" : "Add Lead"}
        </button>
      </form>
    </>
  );
};
export default LeadForm;
