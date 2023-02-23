declare module '@ioc:Adonis/Core/Validator' {
  interface Rules {
    validPasswd(): Rule
    checkIsTrue(): Rule
  }
}
