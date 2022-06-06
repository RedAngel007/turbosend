
const apiENV = {
    localhost: process.env.REACT_APP_API_PROD,
    dev: process.env.REACT_APP_API_DEV,
    prod: process.env.REACT_APP_API_PROD
};

type ENV = 'dev' | 'prod' | 'localhost'

export const getApiENV = (env: ENV) => {
    console.log("env", env)
    console.log("process.env.REACT_APP_API_PROD", process.env.REACT_APP_API_PROD)
    console.log("apiENV[env]", apiENV[env])
    return apiENV[env]
}