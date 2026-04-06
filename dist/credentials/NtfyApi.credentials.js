"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NtfyApi = void 0;
class NtfyApi {
    constructor() {
        this.name = 'ntfyApi';
        this.displayName = 'Ntfy API';
        this.documentationUrl = 'https://docs.ntfy.sh';
        this.icon = "file:../nodes/Ntfy/ntfy.svg";
        this.properties = [
            {
                displayName: 'Authentication',
                name: 'authType',
                type: 'options',
                options: [
                    { name: 'None', value: 'none' },
                    { name: 'Username & Password', value: 'basic' },
                    { name: 'Access Token', value: 'token' },
                ],
                default: 'none',
            },
            {
                displayName: "Server URL",
                name: "serverUrl",
                type: "string",
                default: "https://ntfy.sh"
            },
            {
                displayName: 'Username',
                name: 'username',
                type: 'string',
                default: '',
                displayOptions: { show: { authType: ['basic'] } },
            },
            {
                displayName: 'Password',
                name: 'password',
                type: 'string',
                typeOptions: { password: true },
                default: '',
                displayOptions: { show: { authType: ['basic'] } },
            },
            {
                displayName: 'Access Token',
                name: 'token',
                type: 'string',
                typeOptions: { password: true },
                default: '',
                displayOptions: { show: { authType: ['token'] } },
            },
        ];
    }
}
exports.NtfyApi = NtfyApi;
//# sourceMappingURL=NtfyApi.credentials.js.map