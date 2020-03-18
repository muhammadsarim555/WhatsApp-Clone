import { useState, useEffect } from "react";

// imp: handles all validations for inventory
// imp: extreme cautions when making changes to this component

const useForm = (callback, validate, obj) => {
  // setting initial values below
    const [values, setValues] = useState(
        obj
    );
    // setting validation errors if any
    const [errors, setErrors] = useState({});
    // boolean to be trigered when form is submiting
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = event => {
      // handles value changes
      let {name, value} = event.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit = event => {
      // handles data submition
        event.preventDefault();
        console.log('error', validate(values))
        setErrors(validate(values));
        setIsSubmitting(true);
    };

    useEffect(() => {
        // checks if errors exists or not
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
    }, [errors]);

    // returns all usable functions / values/
    return {
        handleChange,
        handleSubmit,
        values,
        errors,
        setValues
    };
};

export default useForm;