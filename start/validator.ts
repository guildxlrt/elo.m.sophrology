/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import { validator } from '@ioc:Adonis/Core/Validator'
import PasswordValidator from 'password-validator'

validator.rule('validate', (value, _, options) => {
  var schema = new PasswordValidator()
  // Add properties to it
  schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase(2) // Must have uppercase letters
    .has()
    .lowercase(2) // Must have lowercase letters
    .has()
    .digits(2) // Must have at least 2 digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(['Passw0rd', 'Password123']) // Blacklist these values
  // Testing the password
  const testPasswd = schema.validate(value)

  if (typeof value !== 'string') {
    return
  }

  if (testPasswd === false) {
    options.errorReporter.report(
      options.pointer,
      'validate',
      'password validation failed',
      options.arrayExpressionPointer
    )
  }
})
