/**
 * Visum app
 * The API for the Visum music web project
 *
 * The version of the OpenAPI document: v2
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface UserDTO { 
    id?: number;
    userName: string;
    gender: UserDTO.GenderEnum;
    birthOfDate: string;
    firstName: string;
    lastName: string;
    mobile: string;
    password: string;
    avatar?: string;
    role?: string;
    email: string;
}
export namespace UserDTO {
    export type GenderEnum = 'Male' | 'FEMALE' | 'OTHER';
    export const GenderEnum = {
        Male: 'Male' as GenderEnum,
        Female: 'FEMALE' as GenderEnum,
        Other: 'OTHER' as GenderEnum
    };
}

