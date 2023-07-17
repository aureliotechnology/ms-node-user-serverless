import mongoose, { Schema } from 'mongoose';

export async function schemaGenerate(instance: any, options: any = { id: true }) {
  const metadata = Reflect.getMetadata('field', instance);
  let schema = {};
  for (let key in metadata) {
    switch(metadata[key].type) {
      case 'primary':
        schema[key] = { type: mongoose.Schema.Types.UUID }
        schema["_id"] = { type: mongoose.Schema.Types.UUID }
        break;
      case 'string':
        schema[key] = String;
        break;
      case 'object':
        const instanceObject = new metadata[key]['options']['Reference'](instance[metadata[key]]);
        schema[key] = await schemaGenerate(instanceObject, { id: false });
        break;
    }
  }
  let result: Schema
  if(options.id) {
    result = new mongoose.Schema(schema);
  } else {
    result = new mongoose.Schema(schema, { _id: false });
  }
  result.virtual('id').get(function(){
    if(options.id) {
      return this._id.toString();
    }
  });

  result.set('toJSON', {
    virtuals: true,
    transform: function(_doc, ret, _options) {
      if(options.id) {  
        delete ret._id;
        delete ret.__v;
      }
      
      return ret;
    }
  });
  
  return result
}