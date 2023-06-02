export default (errors) => {
  return {
    errors: Object.keys(errors).map((key) => ({
      field: key,
      message: errors[key],
      rule: key,
    })),
  }
}
