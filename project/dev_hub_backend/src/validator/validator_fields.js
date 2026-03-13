export const validatorFields = (data, allowedFields) => {
    const isValidOperation = Object.keys(data).every((key) => allowedFields.includes(key));
    if (!isValidOperation) {
        throw new Error("valid fields: " + allowedFields.join(", "));
    }
    if (data?.skills && data?.skills.length > 10) {
        throw new Error("You can add maximum 10 skills!");
    }
}