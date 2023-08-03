export const validateRequired       = value => (value ? undefined : 'Vui lòng nhập thông tin');

export const validateMaxLength      = max => value => value && value.length > max
    ? `Nhập tối đa ${max} chữ (số)`
    : undefined;

export const validateMinLength      = min => value => value && value.length < min
    ? `Nhập tối thiểu ${min} chữ (số)`
    : undefined;

export const validateBetweenValue   = (min, max) => value => (value && (value < min || value > max))
        ? `Phải nằm trong khoảng ${min} - ${max}`
        : undefined;

export const validateNumber         = value => value && isNaN(Number(value))
    ? 'Phải là số'
    : undefined;

export const validateMinValue       = min => value => value && value < min
    ? `Must be at least ${min}`
    : undefined;

export const validateMaxValue       = max => value => value && value > max
    ? `Must be at most ${max}`
    : undefined;

export const validateEmail          = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Sai địa chỉ email'
    : undefined;

export const validateImgLink   = value => !(/^(http|https):\/\/.+\.(gif|png|jpg|jpeg)$/i.test(value))
    ? 'Invalid Image address'
    : undefined;

export const validateAlphaNumeric   = value => value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only AlphaNumeric characters'
    : undefined;

export const validatePhoneNumber    = value => value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid Phone Number, must be 10 digits'
    : undefined;

export default {
    validateRequired,
    validateMaxLength,
    validateMinLength,
    validateNumber,
    validateMinValue,
    validateMaxValue,
    validateBetweenValue,
    validateEmail,
    validateImgLink,
    validateAlphaNumeric,
    validatePhoneNumber
};