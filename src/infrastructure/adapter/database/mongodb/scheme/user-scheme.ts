import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
  street: String,
  streetLine2: String,
  number: String,
  city: String,
  state: String,
  country: String,
  postalCode: String,
  complement: String,
}, { _id : false });

const UserMongoSchema = new mongoose.Schema({
  username: String,
  pass: String,
  name: String,
  lastName: String,
  cpf: String,
  phone: String,
  email: String,
  address: AddressSchema,
  status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' },
}, { versionKey: false });

UserMongoSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

UserMongoSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret, options) {
        delete ret._id;
        return ret;
    }
});

export default UserMongoSchema
