import { urlWithoutParams } from './baseurl'

export const shareUrl = id => `${urlWithoutParams}?share=${id}`
