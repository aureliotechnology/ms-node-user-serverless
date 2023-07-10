export function extractNamesAndValues(instance: any) {
    const metadata = Reflect.getMetadata('field', instance);
    let fieldNames = [];
    let fieldValues = [];
  
    for (let key in metadata) {
      fieldNames.push(key);
      
      if (metadata[key] === 'object') {
        fieldValues.push(JSON.stringify(instance[key]));
      } else {
        fieldValues.push(instance[key]);
      }
    }
  
    return [fieldNames, fieldValues];
  }
  