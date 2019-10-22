export const initialFormTextInputState = {
    value: "",
    faulty: false,
    error: ""
}
export const initialFormSubmitState = {
    faulty: false,
    error_msg: "",
    success_msg: ""
}
export const cleanSubmitResponse = { submit: { ...initialFormSubmitState } }