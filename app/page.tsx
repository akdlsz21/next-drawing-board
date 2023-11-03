'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';

export default function Home() {
	const [count, setCount] = useState(0);
	const broadcast = useRef(new BroadcastChannel('count'));

	useEffect(() => {
		broadcast.current.onmessage = (event) => {
			setCount(event.data);
		};
	}, []);

	useEffect(() => {
		broadcast.current.postMessage(count);
	}, [count]);

	return (
		<>
			<button
				onClick={() => {
					setCount(count + 1);
				}}
			>
				Increment
			</button>
		</>
	);
}
