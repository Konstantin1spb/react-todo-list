import { useEffect } from 'react';
import { useState } from 'react';

export const useLoadTodos = (refreshTodos) => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		fetch('http://localhost:3005/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			});
	}, [refreshTodos]);

	return todos;
};
