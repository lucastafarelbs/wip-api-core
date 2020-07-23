const model = (Schema) => ({
  name: { type: String, uppercase: true },
  cpf: { type: String }
  // rg: { type: String },
  // note: { type: String },
  // gender: { type: String, required: true },
  // status: { type: Boolean, required: true, default: true },
  // person: { type: String },
  // birthday: { type: Date },
  // old: { type: Boolean },
  // whoIndicate: { type: Boolean, default: false },
  // emails: [{
  //   mail: { type: String },
  //   description: { type: String, uppercase: true },
  //   icon: { type: String, default: 'fas fa-times' }
  // }],
  // phones: [{
  //   type: { type: String, uppercase: true },
  //   description: { type: String, uppercase: true },
  //   number: { type: String },
  //   icon: { type: String, default: 'fas fa-times' }
  // }],
  // address: {
  //   zipCode: { type: String, default: '' },
  //   street: { type: String, uppercase: true, default: '' },
  //   number: { type: String, default: '' },
  //   complement: { type: String, uppercase: true, default: '' },
  //   neighborhood: { type: String, uppercase: true, default: '' },
  //   city: { type: String, uppercase: true, default: '' },
  //   state: { type: String, uppercase: true, default: '' }
  // },
  // role: { type: String, required: true },
  // age: { type: Number },
  // // Company,
  // cnpj: { type: String },
  // ie: { type: String },
  // job: { type: String },
  // representative: { type: String, uppercase: false },
  // fantasyname: { type: String, uppercase: true }
})

module.exports = model
