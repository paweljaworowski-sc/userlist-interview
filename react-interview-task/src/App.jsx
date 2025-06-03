import React, {useState, useEffect, useRef} from "react";

const usersData = [
  { id: 1, name: "Alice Johnson", age: 25, role: "admin", details: "Manages team" },
  { id: 2, name: "Alice Van Der Beek", age: 25, role: "user", details: "Frontend Developer" },
  { id: 3, name: "Bob Smith", age: 30, role: "user", details: "Backend Developer" },
  { id: 4, name: "Charlie Lee", age: 22, role: "user", details: "Intern" },
];

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showDetails, setShowDetails] = useState({});
  const totalDetailViews = useRef(0);

  useEffect(() => {
      // Simulating a request
      const timer = setTimeout(() => {
        setUsers(usersData);
        setFilteredUsers(usersData);
      }, 300);
      return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    const temp = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(temp);
  }, [search, users]);

  const toggleDetails = (id) => {
    const updated = { ...showDetails };
    const newShowState = !updated[id];
    updated[id] = !updated[id];
    setShowDetails(updated);

    if (newShowState) {
      totalDetailViews.current += 1;
    }
  };

  return (
    <div style={{ padding: 20, backgroundColor: "white" }}>
      <h2 style={{ color: "darkblue" }}>User List</h2>
      <input
        style={{ padding: 5, marginBottom: 10, backgroundColor: "white", color: "#1f2a4e" }}
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p style={{fontSize: '0.8em', color: 'gray'}}>
        Details shown: {totalDetailViews.current}
       </p>

      {filteredUsers.map((user, index) => {
        if (user.role === "admin") {
          return (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: 12,
                marginBottom: 10,
                borderRadius: 5,
              }}
              className="card"
            >
              <p style={{ margin: 0 }}>
                👑 <strong>{user.name}</strong> (Admin)
              </p>
              <p style={{ margin: 0 }}>Age: {user.age}</p>
              <button onClick={() => toggleDetails(user.id)}>
                {showDetails[user.id] ? "Hide" : "Show"} Admin Notes
              </button>
              {showDetails[user.id] && (
                <p style={{ color: "darkred" }}>
                  <strong>Admin Info:</strong> {user.details}
                </p>
              )}
            </div>
          );
        } else {
          return (
            <div
              key={user.id}
              style={{
                border: "1px solid #ccc",
                padding: 10,
                marginBottom: 10,
                borderRadius: 5,
              }}
              className="card"
            >
              <p style={{ margin: 0 }}>
                <strong>Name:</strong> {user.name}
              </p>
              <p style={{ margin: 0 }}>Age: {user.age}</p>
              <button onClick={() => toggleDetails(user.id)}>
                {showDetails[user.id] ? "Hide" : "Show"} Details
              </button>
              {showDetails[user.id] && (
                <p>
                  <strong>Details:</strong> {user.details}
                </p>
              )}
            </div>
          );
        }
      })}

      {filteredUsers.length === 0 && <p>No users found</p>}
    </div>
  );
};

export default UserList;