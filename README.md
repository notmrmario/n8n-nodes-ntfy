# n8n-nodes-ntfy

This is n8n community node lets you use ntfy in your n8n workflows.

[ntfy](https://ntfy.sh) is a lightweight REST API that allows for sending notifications to other devices via subscriptions to topcis.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

- [Installation](#installation)
- [Credentials](#credentials)
- [Compatibility](#compatibility)
- [Usage](#usage)
- [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Credentials

This node includes a ntfy credential. It needs to exist, but its actually not necessary to configure any credentials in ntfy. It has three modes:
- Basic auth
- Bearer token
- None *(use this one for no auth)*

## Compatibility

Tested in n8n v`2.14.2`.

## Usage

This node has three required fields, not includeing the credentials:
- Server URL
- Topic
- Message

and eight optional fields:
- Title
- Priority
- Tags
- Click URL
- Icon URL
- Attachment
- Markdown
- Delay
- Email *(in case its configured in your server, i didn't really test this)*

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [ntfy docks](https://docs.ntfy.sh)