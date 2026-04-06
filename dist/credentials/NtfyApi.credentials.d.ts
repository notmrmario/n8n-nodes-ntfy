import { Icon, ICredentialTestRequest, ICredentialType, INodeProperties } from "n8n-workflow";
export declare class NtfyApi implements ICredentialType {
    name: string;
    displayName: string;
    documentationUrl: string;
    icon: Icon;
    properties: INodeProperties[];
    test?: ICredentialTestRequest | undefined;
}
