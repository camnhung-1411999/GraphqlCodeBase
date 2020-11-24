export default `
query Users {
  users(data: {
    id: "5fa620c065813a2da0f83461"
    username: "administration"
    email: "admin@savemoney.vn"
    admin: 0
    status: ""
    profile: {
      name: "Administration"
      gender: 1,
      phone: "0336058705"
    }
  }) {
    users {
      id
      email
      username
      createdBy {
        profile {
          name
        }
      }
      createdAt
      updatedBy {
        profile {
          name
        }
      }
      updatedAt
      profile {
        name
        picture
        gender
        phone
      }
    }
    errors {
      message
    }
  }
}

mutation Create {
  createUser(data: {
    username: "pauphuoc"
    email: "paul.phuoc@savemoney.asia"
    password:"12345678"
    admin: 0
    status: ""
    profile: {
      name: "Paul Phuoc"
      gender: 1,
      phone: "0336058705"
    }
  }) {
    user {
      id
      email
      username
      createdBy {
        username
      }
      createdAt
      updatedBy {
        username
      }
      updatedAt
      profile {
        name
        gender
        picture
        phone
      }
    }
    errors {
      field
      message
    }
  }
}`;
