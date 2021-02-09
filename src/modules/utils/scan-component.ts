const isNestComponent = (ob: any) => {
  if (ob.provider) return true;
  return Reflect.getMetadataKeys(ob).length > 0;
};

const isTypeORMEntity = (ob: any) => ob.prototype?.constructor;
export const scanComponents = (object: any): any[] =>
  Object.values(object).filter(isNestComponent);

export const scanEntities = (object: any): any[] =>
  Object.values(object).filter(isTypeORMEntity);
