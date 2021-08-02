
/**
 * API 响应格式
 * @packageDocumentation
 */

/**
 * 基础响应格式
 */

export interface MiraiApiResponse<T> {
    code: number;
    msg: string;
    data?: T;
}