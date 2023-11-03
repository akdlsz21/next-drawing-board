import { useEffect } from 'react';

type MessageHandler = (message: any) => void;

const useBroadcastChannel = (
	channelName: string,
	onMessage: MessageHandler
) => {
	useEffect(() => {
		// Initialize the BroadcastChannel
		const broadcastChannel = new BroadcastChannel(channelName);

		// Set up the message event listener
		broadcastChannel.onmessage = (event) => {
			onMessage(event.data);
		};

		// Clean up
		return () => {
			broadcastChannel.close();
		};
	}, [channelName, onMessage]);

	// Function to post messages to the channel
	const postMessage = (message: any) => {
		const broadcastChannel = new BroadcastChannel(channelName);
		broadcastChannel.postMessage(message);
		broadcastChannel.close();
	};

	return { postMessage };
};

export default useBroadcastChannel;
