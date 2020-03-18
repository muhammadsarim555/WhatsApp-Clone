function validation(values) {
    let errors = {};
    // form validation
    if (values.full_name === "") {
      errors.full_name = "Full Name is required";
    }
    if (values.contact_no === "") {
      errors.contact_no = "Contact No is required";
    }
    return errors;
  }
  
  let defaultValues = {
    full_name: "Some Name",
    contact_no: "03442382054"
  };
  
  export { validation, defaultValues };