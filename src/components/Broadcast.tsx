'use client';
import React, { useState } from 'react';
import useBroadcastChannel from '../lib/components/hooks/useBroadcast';

const Broadcast = () => {
	const [receivedMessage, setReceivedMessage] = useState<string | null>(null);
	const { postMessage } = useBroadcastChannel('myChannel', (message) => {
		setReceivedMessage(message);
	});

	return (
		<div>
			<button onClick={() => postMessage('Hello from Page One')}>
				Send Message
			</button>
			<p>Received Message: {receivedMessage}</p>
		</div>
	);
};

export default Broadcast;
