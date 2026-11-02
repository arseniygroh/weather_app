export function getCookie(cookieName) {
    const cookies = document.cookie.split(/;\s*/g);
    for (let i = 0; i < cookies.length; i++) {
        const eqIndex = cookies[i].indexOf("=");
        if (eqIndex === -1) continue;

        const name = cookies[i].substring(0, eqIndex);
        
        if (name === cookieName) {
            const value = cookies[i].substring(eqIndex + 1);
            return decodeURIComponent(value);
        }
    }
    return null;
}

export function setCookie(name, value, days = 7) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}