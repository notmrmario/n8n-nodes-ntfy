import { IExecuteFunctions, INodeExecutionData, NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';

export class Ntfy implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Ntfy',
		name: 'ntfy',
		icon: 'file:ntfy.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["serverUrl"] + "/" + $parameter["topic"]}}',
		description: 'Interact with the Ntfy API',
		defaults: {
			name: 'Ntfy',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'ntfyApi', required: true }],
		properties: [
			// ── OBLIGATORIOS ────────────────────────────────────────────
			{
				displayName: 'Server URL',
				name: 'serverUrl',
				type: 'string',
				default: 'https://ntfy.sh',
				required: true,
				description: 'ntfy server base url.',
			},
			{
				displayName: 'Topic',
				name: 'topic',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'phils_alerts',
				routing: {
					request: {
						baseURL: '={{ $parameter.serverUrl.replace(/\\/$/, "") }}',
						url: '={{ "/" + $parameter.topic }}',
						method: 'POST',
					},
				},
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				typeOptions: { rows: 3 },
				default: '',
				required: true,
				routing: {
					send: { type: 'body', property: 'message' },
				},
			},

			// ── OPCIONALES ───────────────────────────────────────────────
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				options: [
					{
						displayName: 'Title',
						name: 'title',
						type: 'string',
						default: '',
						description: 'Notification title.',
						routing: { send: { type: 'body', property: 'title' } },
					},
					{
						displayName: 'Priority',
						name: 'priority',
						type: 'options',
						default: 'default',
						options: [
							{ name: 'Max', value: 5 },
							{ name: 'High', value: 4 },
							{ name: 'Default', value: 3 },
							{ name: 'Low', value: 2 },
							{ name: 'Min', value: 1 },
						],
						routing: { send: { type: 'body', property: 'priority' } },
					},
					{
						displayName: 'Tags',
						name: 'tags',
						type: 'string',
						default: '',
						placeholder: 'warning,skull,rotating_light',
						// description: 'Etiquetas separadas por comas. Soporta emojis de la lista de ntfy.',
						description: "Comma separated tags. Supports emojis from ntfy's list.",
						routing: { send: { type: 'body', property: 'tags' } },
					},
					{
						displayName: 'Click URL',
						name: 'click',
						type: 'string',
						default: '',
						description: 'URL to open when clicking on the notification.',
						routing: { send: { type: 'body', property: 'click' } },
					},
					{
						displayName: 'Icon URL',
						name: 'icon',
						type: 'string',
						default: '',
						description: 'URL to display as the notification icon.',
						routing: { send: { type: 'body', property: 'icon' } },
					},
					{
						displayName: 'Attachment URL',
						name: 'attach',
						type: 'string',
						default: '',
						description: 'File URL attached to the notification.',
						routing: { send: { type: 'body', property: 'attach' } },
					},
					{
						displayName: 'Markdown',
						name: 'markdown',
						type: 'boolean',
						default: false,
						description: 'Whether to render the message as Markdown.',
						routing: { send: { type: 'body', property: 'markdown' } },
					},
					{
						displayName: 'Delay',
						name: 'delay',
						type: 'string',
						default: '',
						placeholder: '30min, 9am, 2024-01-01T09:00',
						description: 'When to deliver the notifiaction.',
						routing: { send: { type: 'body', property: 'delay' } },
					},
					{
						displayName: 'Email',
						name: 'email',
						type: 'string',
						default: '',
						placeholder: 'user@example.com',
						description: 'Forward notification to this email.',
						routing: { send: { type: 'body', property: 'email' } },
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const results: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const serverUrl = this.getNodeParameter('serverUrl', i) as string;
			const topic = this.getNodeParameter('topic', i) as string;
			const message = this.getNodeParameter('message', i) as string;
			const extra = this.getNodeParameter('additionalFields', i) as Record<string, unknown>;

			const body: Record<string, unknown> = {
				topic,
				message,
				...extra,
			};

			if (body.tags) body.tags = (body.tags as string).split(",");

			const credentials = await this.getCredentials('ntfyApi');

			const headers: Record<string, string> = {
				"Content-Type": "application/json"
			};

			if (credentials.authType === 'basic') {
				const encoded = Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64');
				headers['Authorization'] = `Basic ${encoded}`;
			} else if (credentials.authType === 'token') {
				headers['Authorization'] = `Bearer ${credentials.token}`;
			}

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: serverUrl.replace(/\/$/, ''),
				body,
				json: false,
			});

			results.push({ json: response });
		}

		return [results];
	}
}
