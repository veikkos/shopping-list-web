const url = new URL(window.location.href)
const urlWithoutParams = `${url.protocol}//${url.hostname}${url.pathname}`

export const shareUrl = id => `${urlWithoutParams}?share=${id}`
