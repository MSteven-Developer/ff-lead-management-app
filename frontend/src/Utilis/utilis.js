export const validateLeadForm = (formData) => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.lead_status_id) newErrors.lead_status_id = 'Lead status is required';
    return newErrors;
  };

  export const validateLoginForm = (formData) => {
    const newErrors = {};
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    return newErrors;
  };


  export const validateRegisterForm = (formData) => {
    const newErrors = {};
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.password_confirmation) newErrors.password_confirmation = 'Confirm Password is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    return newErrors;
  };

  export const getSortIcon = (column,sortColumn,orderBy ) => {
    if (sortColumn !== column) return null;
    return orderBy === 'asc' ? '▲' : '▼'; 
};


export const getPageParam = url => parseInt(new URL(url).searchParams.get('page')) || 1;

export const hasAnyKeyWithValue = (obj) =>{
  return Object.values(obj).some(value => value != "");
}