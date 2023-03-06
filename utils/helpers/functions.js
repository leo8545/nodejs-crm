export function isDevEnv() {
    return process.env.NODE_ENV === 'DEV'
}

export function isProductionEnv() {
    return process.env.NODE_ENV === 'PRODUCTION'
}