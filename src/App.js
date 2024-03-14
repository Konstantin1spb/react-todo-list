import styles from './app.module.css';
import { useState } from 'react';
import { useNewTodo, useEditedTodo, useDeleteTodo, useLoadTodos } from './hooks/index';

const App = () => {
	const [currentId, setCurrentId] = useState();
	const [refreshTodos, setRefreshTodos] = useState(false);

	const todos = useLoadTodos(refreshTodos);

	const { newTodo, onChangeNewTodo, onSubmitNewTodo } = useNewTodo(
		refreshTodos,
		setRefreshTodos,
	);

	const {
		editedTodo,
		onClickOpenToEditTodo,
		onChangeEditedTodo,
		onSubmitEditedTodo,
		openModal,
		editedTodoError,
	} = useEditedTodo(refreshTodos, setRefreshTodos, currentId, setCurrentId);

	const onClickDeleteTodo = useDeleteTodo(
		currentId,
		setCurrentId,
		refreshTodos,
		setRefreshTodos,
	);

	return (
		<main className={styles.todos}>
			<div
				className={`${styles.todosContainer} ${openModal ? styles.blured : null}`}
			>
				<form onSubmit={onSubmitNewTodo}>
					<input onChange={onChangeNewTodo} value={newTodo}></input>
					<button>Add todo</button>
				</form>
				{todos.map(({ id, title }) => (
					<div key={id} className={styles.todo}>
						{title}
						<div>
							<span
								className={styles.editButton}
								onClick={() => onClickOpenToEditTodo(id)}
							></span>
							<span
								className={styles.deleteButton}
								onClick={() => onClickDeleteTodo(id)}
							></span>
						</div>
					</div>
				))}
			</div>
			<form
				onSubmit={onSubmitEditedTodo}
				className={`${styles.editTodoForm} ${openModal ? styles.active : null}`}
			>
				{editedTodoError && <div className={styles.error}>{editedTodoError}</div>}
				<input onChange={onChangeEditedTodo} value={editedTodo}></input>
				<button disabled={!!editedTodoError}>Edit todo</button>
			</form>
		</main>
	);
};

export default App;
