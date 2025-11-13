export class UserWithTheSameEmailError extends Error {
    constructor() {
        super('❌This email has already been registered.')
    }
}