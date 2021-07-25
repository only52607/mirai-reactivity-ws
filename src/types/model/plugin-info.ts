import { BaseResponse } from "./api-response";

export interface PluginInfo extends BaseResponse {
    data: {
        version: string;
    };
}