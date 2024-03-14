export const useDeleteTodo = (currentId, setCurrentId, setRefreshTodos, refreshTodos) => {
	const onClickDeleteTodo = (id) => {
		setCurrentId(id);
		console.log(id);
		fetch(`http://localhost:3005/todos/${currentId}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Todo deleted:', response);
				setRefreshTodos(!refreshTodos);
			});
	};

	return onClickDeleteTodo;
};
