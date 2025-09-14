// Validate email
export const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

// Validate password (min 6 chars, at least 1 letter and 1 number)
export const validatePassword = (password) =>
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);

// Validate mobile number (10 digits)
export const validateMobile = (mobile) => /^\d{10}$/.test(mobile);

// Validate non-empty string
export const validateString = (str) => typeof str === 'string' && str.trim() !== '';

// Validate number (positive)
export const validateNumber = (num) => typeof num === 'number' && num >= 0;

// Validate array of strings
export const validateStringArray = (arr) =>
  Array.isArray(arr) && arr.every((item) => typeof item === 'string' && item.trim() !== '');

// Validate product category ID (Mongo ObjectId)
import mongoose from 'mongoose';
export const validateObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
