export const formValidatorHelper = (values: any) => {

    const errors: any = {};
  
    if (!values.firstName) {
      errors.firstName = 'First name is required';
    }
  
    if (!values.lastName) {
      errors.lastName = 'Last name is required';
    }
      
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/(.+)@(.+){2,}\.(.+){2,}/i.test(values.email)) {
      errors.email = 'Invalid Email !!!';
    }
  
    return errors;
};