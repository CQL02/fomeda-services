import 'reflect-metadata';
export declare class MapperUtils {
    static readonly mapToDto: <T>(schema: any, dto: new () => T) => T;
    static readonly mapToSchema: <T>(dto: any, schema: new () => T) => T;
}
