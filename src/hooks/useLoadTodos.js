import { useEffect } from 'react';
import { useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { sortByTitle } from '../utils/sortByTitle';

export const useLoadTodos = (isSort, setSortButton) => {
	const [todos, setTodos] = useState({});

	useEffect(() => {
		const todosDbRef = ref(db, 'todos');

		return onValue(todosDbRef, (snapshot) => {
			const loadedTodos = snapshot.val() || {};
			if (isSort) {
				const sortedTodosArr = Object.entries(loadedTodos).sort(sortByTitle);
				const sortedTodos = {};
				for (let todo of sortedTodosArr) {
					sortedTodos[todo[0]] = todo[1];
				}
				setTodos(sortedTodos);
				setSortButton('Unsort');
			} else {
				setTodos(loadedTodos);
				setSortButton('Sort');
			}
		});
	}, [isSort]);

	return todos;
};
