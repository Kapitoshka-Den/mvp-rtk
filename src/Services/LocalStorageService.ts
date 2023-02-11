

export function tokensAdd(accesToken:string,refreshToken:string) {
    window.localStorage.setItem("acces token",accesToken);
    window.localStorage.setItem("refresh token",refreshToken);
}

export function tokensDelete() {
    window.localStorage.removeItem("acces token")
    window.localStorage.removeItem("refresh token")
}