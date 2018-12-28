import { emailRegex } from 'Utils/regex'

export function validateTextField(fieldName, fieldValue) {
  //console.log("field name", fieldName, "field val", fieldValue, "len")
  if (!fieldValue) {
    return {
      status: true,
      value: `${fieldName} is required`
    }
  }
  return {
    status: false,
    value: ''
  }
}

export function validateEmail(fieldName, fieldValue) {
  if (!fieldValue.length) {
    return {
      status: true,
      value: `${fieldName} is required`
    }
  } else if (!emailRegex.test(fieldValue)) {
    return {
      status: true,
      value: `${fieldName} is invalid`
    }
  }
  
  return {
    status: false,
    value: ''
  }
}

export function validateNumberField(fieldName, fieldValue) {
  //console.log("validate")
  if (!fieldValue.length) {
    return {
      status: true,
      value: `${fieldName} is required`
    }
  } else if (isNaN(fieldValue) || fieldValue.length < 10 || fieldValue.length > 10) {
    return {
      status: true,
      value: `${fieldName} is invalid`
    }
  }   
  return {
    status: false,
    value: ''
  }
}


