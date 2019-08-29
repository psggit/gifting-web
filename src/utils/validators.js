import { emailRegex } from 'Utils/regex'
import { mobileRegex } from 'Utils/regex'

export function validateTextField(fieldName, fieldValue) {
  console.log("field name", fieldName, "field val", fieldValue, "len")
  if (!fieldValue) {
    return {
      status: true,
      value: `${fieldName} is required`
    }
  }
  if (fieldName.indexOf("Mobile") !== -1 && !mobileRegex.test(fieldValue)) {
    return {
      status: true,
      value: `Invalid ${fieldName}`
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
  //console.log("validate",fieldValue.length, !fieldValue.length)
  if (!fieldValue.trim().length) {
    //console.log("field value", !fieldValue.length)
    return {
      status: true,
      value: `${fieldName} is required`
    }
  }
  else if ((fieldValue.length !== 10)) {
    return {
      status: true,
      value: `${fieldName} is invalid`
    }
  }
  // else if ((fieldValue.length !== 10 || ["1", "2", "3", "4", "5"].indexOf(fieldValue[0]) > -1)) {
  //   return {
  //     status: true,
  //     value: `${fieldName} is invalid`
  //   }
  // }   
  return {
    status: false,
    value: ''
  }
}


