import styles from './app.module.css';
import { useEffect, useState } from 'react';

const App = () => {
	const [todos, setTodos] = useState([]);
	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			});
	}, []);
	return (
		<main className={styles.todos}>
			{todos.map(({ id, title }) => (
				<div key={id} className={styles.todo}>
					{title}
				</div>
			))}
		</main>
	);
};

export default App;
