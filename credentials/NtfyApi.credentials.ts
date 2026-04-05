import { ICredentialType, INodeProperties } from "n8n-workflow";

export class NtfyApi implements ICredentialType {
    name = 'ntfyApi';
    displayName = 'ntfy API';
    properties: INodeProperties[] = [
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
        // Campos para basic auth
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
        // Campo para token
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