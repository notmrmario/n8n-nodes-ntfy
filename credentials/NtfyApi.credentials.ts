import { Icon, ICredentialTestRequest, ICredentialType, INodeProperties } from "n8n-workflow";

export class NtfyApi implements ICredentialType {
    name = 'ntfyApi';
    displayName = 'Ntfy API';
    documentationUrl = 'https://docs.ntfy.sh';
    icon: Icon = "file:../nodes/Ntfy/ntfy.svg";
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
    test?: ICredentialTestRequest | undefined;
}