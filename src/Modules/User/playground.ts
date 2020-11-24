export default `

query Users {
  findUser(data: {
    id: "5fa620c065813a2da0f83461"
    username: "administration"
    email: "admin@savemoney.vn"
  }) {
    user {
      id
      email
      username
      createdAt
      updatedAt
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
    }
    errors {
      field
      message
    }
  }
}`;
