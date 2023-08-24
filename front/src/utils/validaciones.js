export const validateURL = (URL = null) => {
  if (URL === null) return false;
  // regex source: https://regexr.com/39nr7
  const URLRegex =
    /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/i;
  return URLRegex.test(URL);
};

export const validateEmail = (email = null) => {
  if (email === null) return false;
  // const re    = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

export const validatePassword = (pass = null) => {
  if (pass === null) return false;
  return pass.length > 3;
};

export const validateStringNotEmpty = (str = null) => {
  if (str === null) return false;
  return str.length > 0;
};

export const validateOnlyNumber = (num = null, allowNegative = false) => {
  // const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;  // For phonenumber //TODO: test it
  // allowNegative /^-?
  const regex = /^(?:\d+)(?:(\.|,)\d+)?$/;
  return regex.test(num);
  // if (num === null) return false;
  // return !isNaN(num);
};

export const formatOnlyNumberInput = (value, maxLength, extras = []) => {
  if (!value) return value;
  //const reg = RegExp(`(?![\\d+|\\${extras.join("")}]+)\\w+`);
  return value.replace(/\D+/g, '').slice(0, maxLength);
};

export const parseOnlyLetterAndSpace = str => str.replace(/[^A-Za-z ]/g, '');

export const parseLength = (str, length) => str.substring(0, length);

export const validateAtLeastLength = (str, length) =>
  str && str.trim().length >= length;

export const validateIsfilled = expression =>
  expression && (expression.length > 0 || expression > 0);

export const validateIsTrue = expression => expression;

export const composeValidators =
  (...validators) =>
    value =>
      validators.reduce(
        (error, validator) => error || validator(value),
        undefined
      );