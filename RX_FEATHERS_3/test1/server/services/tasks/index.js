module.exports = {
  async find(params) {
    return {
      params
    }
  },
  async get(id, params) {
    return {
      id: 12345,
      name: 'jay'
    }
  },
  async create(data, params) {
    return {
      id,
      params
    }
  },
  async update(id, data, params) {
    return {
      id,
      params
    }
  },
  async patch(id, data, params) {
    return {
      id,
      params
    }
  },
  async remove(id, params) {
    return {
      id,
      params
    }
  }
}
