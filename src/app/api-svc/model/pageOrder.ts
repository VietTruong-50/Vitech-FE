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
import { Order } from './order';
import { PageableObject } from './pageableObject';
import { Sort } from './sort';


export interface PageOrder { 
    totalPages?: number;
    totalElements?: number;
    size?: number;
    content?: Array<Order>;
    number?: number;
    sort?: Sort;
    pageable?: PageableObject;
    first?: boolean;
    last?: boolean;
    numberOfElements?: number;
    empty?: boolean;
}

