const url = new URL(window.location.href)

export const urlWithoutParams = `${url.protocol}//${url.hostname}${url.pathname}`
