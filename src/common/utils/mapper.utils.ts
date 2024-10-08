import 'reflect-metadata';

export class MapperUtils {
  static readonly mapToDto = <T>(schema: any, dto: new () => T): T => {
    const dtoInstance = new dto();
    const schemaKeys = Object.keys(schema);

    if (schemaKeys.length === 0) {
      throw new Error("Schema has no keys");
    }

    schemaKeys.forEach((key: string) => {
      const type = Reflect.getMetadata('design:type', dto.prototype, key);
      if (type) {
        const value = schema[key];

        if (type === Date) {
          dtoInstance[key] = new Date(value);
        } else if (type === Buffer) {
          dtoInstance[key] = Buffer.from(value);
        } else if (type === Map) {
          dtoInstance[key] = new Map(Object.entries(value));
        } else if (Array.isArray(value)) {
          dtoInstance[key] = value
        } else if (type === Object) {
          dtoInstance[key] = value;
        } else if (typeof value === 'object' && value !== null) {
          dtoInstance[key] = this.mapToDto(value, dto);
        } else {
          dtoInstance[key] = value;
        }
      }
    });

    return dtoInstance;
  };

  //haven't Test
  static readonly mapToSchema = <T>(dto: any, schema: new () => T): T => {
    const schemaInstance = new schema();
    const dtoKeys = Object.keys(dto);

    if (dtoKeys.length === 0) {
      throw new Error("DTO has no keys");
    }

    dtoKeys.forEach((key: string) => {
      const type = Reflect.getMetadata('design:type', schema.prototype, key);
      if (type) {
        const value = dto[key];

        if (type === Date) {
          schemaInstance[key] = value.toISOString();
        } else if (type === Buffer) {
          schemaInstance[key] = value.toString('base64');
        } else if (type === Map) {
          schemaInstance[key] = Object.fromEntries(value);
        } else if (Array.isArray(value)) {
          schemaInstance[key] = value;
        } else if (typeof value === 'object' && value !== null) {
          schemaInstance[key] = this.mapToSchema(value, schema);
        } else {
          schemaInstance[key] = value;
        }
      }
    });

    return schemaInstance;
  };
}
