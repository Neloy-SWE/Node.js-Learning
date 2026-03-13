export const validatorFields = (data, allowedFields) => {
    const isValidOperation = Object.keys(data).every((key) => allowedFields.includes(key));
    if (!isValidOperation) {
        throw new Error("valid fields: " + allowedFields.join(", "));
    }
}