export const useValidator = () => {
  const required = (v: string) => !!v || 'This field is required'

  const email = (value: string) => /.+@.+\..+/.test(value) || 'Email must be valid.'

  function maxLength(len: number) {
    return (val: string) => {
      if (!val) {
        return true
      }
      return val.length <= len || `Max length is ${len}`
    }
  }

  return {
    required,
    email,
    maxLength,
  }
}
