import { IExecuteFunctions, INodeExecutionData, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
export declare class Ntfy implements INodeType {
    description: INodeTypeDescription;
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
}
