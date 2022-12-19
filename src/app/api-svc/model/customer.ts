/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Product } from './product';


export interface Customer { 
    id?: number;
    userName?: string;
    email?: string;
    genderEnum?: Customer.GenderEnumEnum;
    address?: string;
    role?: string;
    wishListProducts?: Set<Product>;
}
export namespace Customer {
    export type GenderEnumEnum = 'MALE' | 'FEMALE' | 'OTHER';
    export const GenderEnumEnum = {
        Male: 'MALE' as GenderEnumEnum,
        Female: 'FEMALE' as GenderEnumEnum,
        Other: 'OTHER' as GenderEnumEnum
    };
}

