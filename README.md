# Pokey the Penguin Slack Integration

Add Pokey the Penguin to your Slack! This uses [webtask.io](https://webtask.io/)
and code shamelessly pulled from [my JavaScript Pokey API module](https://github.com/rfreebern/pokey-api-js)
to provide randomized Pokey search by keyword as a slash command in a Slack
workspace.

## Setup

### 1. Create the webtask endpoint

# `git clone git@github.com:rfreebern/pokey-webtask.git` to your local machine.
# `cd pokey-webtask`
# `npm i -g wt-cli` to install the webtask CLI tools globally.
# `wt create pokey.js` to create the endpoint.
# Copy the URL provided.

### 2. Set up the slash command

# In a Slack workspace where you have administrative privileges, navigate to `/apps/manage/custom-integrations`.
# Search for "slash commands", click on it, and add it to the workspace.
# Add a configuration with the command `/pokey`, the webtask URL from before, the method set to `GET`, and whatever additional customization you desire.
# Save it, and then in your workspace, try `/pokey whiskey`.

## Example

![/pokey hat](pokey_hat.png)
