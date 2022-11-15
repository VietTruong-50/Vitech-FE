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
import { PageableObject } from './pageableObject';
import { SongDTO } from './songDTO';
import { Sort } from './sort';


export interface PageSong { 
    totalPages?: number;
    totalElements?: number;
    size?: number;
    content?: Array<SongDTO>;
    sort?: Sort;
    first?: boolean;
    last?: boolean;
    numberOfElements?: number;
    pageable?: PageableObject;
    number?: number;
    empty?: boolean;
}
