const UserCaps = {
  view: 1,
  write: 2,
  setup: 3,
}

export default class {
  constructor(caps = []) {
    Object.keys(UserCaps).forEach((cap) => {
      this[cap] = caps.includes(UserCaps[cap])
    })
  }
}
