export function transformLoginErrors(error){
    console.log(error)
    switch(error){
        case 'Firebase: Error (auth/invalid-credential).':
            return 'Incorrect username or password'
        default:
            return error
    }
}