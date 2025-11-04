import { useEffect, useState } from "react";

export default function Home({ setIsAuthenticated, userLogined }) {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const fetchTodos = async () => {
    const res = await fetch("http://cyan.io.vn/api/todos.php", {
      credentials: "include",
    });
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!task) return;
    await fetch("http://cyan.io.vn/api/todos.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ task }),
    });
    setTask("");
    fetchTodos();
  };

  const toggleDone = async (id, done) => {
    await fetch("http://cyan.io.vn/api/todos.php", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id, done: done ? 0 : 1 }),
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch("http://cyan.io.vn/api/todos.php", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id }),
    });
    fetchTodos();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div style={{ margin: "50px auto", textAlign: "center" }}>
      <h1>Chào mừng {userLogined}!</h1>
      <button onClick={handleLogout}>Đăng xuất</button>

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Thêm việc mới..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTodo}>Thêm</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginTop: "10px" }}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleDone(todo.id, todo.done)}
            />
            <span style={{ textDecoration: todo.done ? "line-through" : "none", marginLeft: "8px" }}>
              {todo.task}
            </span>
            <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: "10px" }}>
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
