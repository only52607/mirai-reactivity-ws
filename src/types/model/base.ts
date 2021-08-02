/**
 * 可标识实体
 */
export interface IdentifiableEntity<IDTYPE> {
  id: IDTYPE
}

/**
 * 以数字为ID的可标识实体
 */
export interface NumeralIdentifiableEntity extends IdentifiableEntity<number> {
    id: number
}

/**
 * 可分类实体
 */
export interface ClassifiedEntity<T> {
  type: T
}