import { ref, computed } from 'vue'
//import { get as apiGet } from '@/api'
import Capabilities from '@/models/capabilities'

class User {
  constructor() {
    this.firstName = ref()
    this.lastName = ref()
    this.fullName = computed(() => {
      return [this.firstName.value, this.lastName.value].join(' ')
    })

    this.initials = computed(() => {
      return [this.firstName.value[0], this.lastName.value[0]].join('')
    })

    this.role = ref()
    this.capabilities = new Capabilities()
  }

  async get() {
    //const data = await apiGet('user')
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      role: 1,
      capabilities: [1, 2, 3],
    }
    this.firstName.value = data.firstName
    this.lastName.value = data.lastName
    this.role.value = data.value
    this.capabilities = new Capabilities(data.capabilities)
  }
}

const user = new User()
export default user
