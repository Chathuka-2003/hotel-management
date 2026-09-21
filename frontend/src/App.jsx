import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "/api/rooms";

const emptyRoom = {
  roomNumber: "",
  roomType: "DELUXE",
  price: "",
  status: "AVAILABLE",
};

function App() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [roomForm, setRoomForm] = useState(emptyRoom);

  // GET all rooms
  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load rooms");
      }

      const data = await response.json();
      setRooms(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load rooms. Please check the backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Open add form
  const handleAddRoom = () => {
    setEditingRoom(null);
    setRoomForm(emptyRoom);
    setShowForm(true);
  };

  // Open edit form
  const handleEditRoom = (room) => {
    setEditingRoom(room);

    setRoomForm({
      roomNumber: room.roomNumber ?? "",
      roomType: room.roomType ?? "DELUXE",
      price: room.price ?? "",
      status: room.status ?? "AVAILABLE",
    });

    setShowForm(true);
  };

  // Handle form changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setRoomForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // POST / PUT
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!roomForm.roomNumber || !roomForm.roomType || !roomForm.price) {
      setError("Please complete all required fields.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const isEditing = Boolean(editingRoom);

      const url = isEditing
        ? `${API_URL}/${editingRoom.id}`
        : API_URL;

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomNumber: roomForm.roomNumber,
          roomType: roomForm.roomType,
          price: Number(roomForm.price),
          status: roomForm.status,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save room");
      }

      const savedRoom = await response.json();

      if (isEditing) {
        setRooms((previous) =>
          previous.map((room) =>
            room.id === savedRoom.id ? savedRoom : room
          )
        );
      } else {
        setRooms((previous) => [...previous, savedRoom]);
      }

      setShowForm(false);
      setEditingRoom(null);
      setRoomForm(emptyRoom);
    } catch (err) {
      console.error(err);
      setError("Unable to save room.");
    } finally {
      setSaving(false);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this room?"
    );

    if (!confirmed) return;

    try {
      setError("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete room");
      }

      setRooms((previous) =>
        previous.filter((room) => room.id !== id)
      );
    } catch (err) {
      console.error(err);
      setError("Unable to delete room.");
    }
  };

  const availableRooms = rooms.filter(
    (room) => room.status === "AVAILABLE"
  ).length;

  const occupiedRooms = rooms.filter(
    (room) => room.status === "OCCUPIED"
  ).length;

  const maintenanceRooms = rooms.filter(
    (room) => room.status === "MAINTENANCE"
  ).length;

  const totalRevenue = rooms.reduce(
    (total, room) => total + Number(room.price || 0),
    0
  );

  return (
    <div className="app">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">H</div>

          <div>
            <h2>HavenStay</h2>
            <span>Hotel Management</span>
          </div>
        </div>

        <nav className="navigation">
          <a href="#dashboard" className="nav-item active">
            <span>▦</span>
            Dashboard
          </a>

          <a href="#rooms" className="nav-item">
            <span>▤</span>
            Rooms
          </a>

          <a href="#reservations" className="nav-item">
            <span>▣</span>
            Reservations
          </a>

          <a href="#guests" className="nav-item">
            <span>♙</span>
            Guests
          </a>

          <a href="#reports" className="nav-item">
            <span>◫</span>
            Reports
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="support-card">
            <div className="support-icon">?</div>

            <div>
              <strong>Need help?</strong>
              <p>Contact support</p>
            </div>
          </div>

          <div className="user-profile">
            <div className="avatar">AD</div>

            <div>
              <strong>Admin</strong>
              <span>Administrator</span>
            </div>

            <button className="profile-menu">•••</button>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main">

        {/* HEADER */}
        <header className="topbar">
          <div>
            <p className="eyebrow">OVERVIEW</p>
            <h1>Good morning, Admin</h1>
            <p className="subtitle">
              Here's what's happening at your hotel today.
            </p>
          </div>

          <div className="topbar-actions">
            <button className="icon-button">
              🔔
              <span className="notification-dot"></span>
            </button>

            <button
              className="primary-button"
              onClick={handleAddRoom}
            >
              <span>＋</span>
              Add Room
            </button>
          </div>
        </header>

        {/* ERROR */}
        {error && (
          <div className="error-banner">
            <span>⚠</span>
            {error}
            <button onClick={() => setError("")}>×</button>
          </div>
        )}

        {/* STAT CARDS */}
        <section className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon blue">▤</div>

            <div className="stat-content">
              <span>Total Rooms</span>
              <strong>{rooms.length}</strong>
              <small>Registered rooms</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">✓</div>

            <div className="stat-content">
              <span>Available</span>
              <strong>{availableRooms}</strong>
              <small>Ready for guests</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">♙</div>

            <div className="stat-content">
              <span>Occupied</span>
              <strong>{occupiedRooms}</strong>
              <small>Currently occupied</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">$</div>

            <div className="stat-content">
              <span>Room Value</span>
              <strong>${totalRevenue.toLocaleString()}</strong>
              <small>Current room rates</small>
            </div>
          </div>

        </section>

        {/* QUICK ACTIONS */}
        <section className="quick-actions">

          <div>
            <p className="section-label">QUICK ACTIONS</p>
            <h2>Manage your hotel</h2>
          </div>

          <div className="action-buttons">
            <button
              className="quick-button"
              onClick={handleAddRoom}
            >
              <span>＋</span>
              <div>
                <strong>Add Room</strong>
                <small>Create a new room</small>
              </div>
            </button>

            <button className="quick-button">
              <span>▣</span>
              <div>
                <strong>New Reservation</strong>
                <small>Book a guest stay</small>
              </div>
            </button>

            <button className="quick-button">
              <span>♙</span>
              <div>
                <strong>Add Guest</strong>
                <small>Register guest</small>
              </div>
            </button>
          </div>

        </section>

        {/* ROOM SECTION */}
        <section className="rooms-section" id="rooms">

          <div className="section-header">
            <div>
              <p className="section-label">ROOM MANAGEMENT</p>
              <h2>Rooms</h2>
            </div>

            <div className="section-tools">
              <button
                className="secondary-button"
                onClick={fetchRooms}
              >
                ↻ Refresh
              </button>

              <button
                className="primary-button"
                onClick={handleAddRoom}
              >
                ＋ Add Room
              </button>
            </div>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading rooms...</p>
            </div>
          ) : rooms.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">▤</div>
              <h3>No rooms yet</h3>
              <p>
                Add your first room to start managing your hotel.
              </p>

              <button
                className="primary-button"
                onClick={handleAddRoom}
              >
                ＋ Add First Room
              </button>
            </div>
          ) : (
            <div className="table-wrapper">

              <table className="room-table">

                <thead>
                  <tr>
                    <th>ROOM</th>
                    <th>TYPE</th>
                    <th>PRICE</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {rooms.map((room) => (
                    <tr key={room.id}>

                      <td>
                        <div className="room-number">
                          <div className="room-avatar">
                            {room.roomNumber}
                          </div>

                          <div>
                            <strong>
                              Room {room.roomNumber}
                            </strong>

                            <span>
                              ID #{room.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="room-type">
                          {room.roomType}
                        </span>
                      </td>

                      <td>
                        <strong>
                          ${Number(room.price).toLocaleString()}
                        </strong>
                        <span className="price-label">
                          / night
                        </span>
                      </td>

                      <td>
                        <span
                          className={`status ${room.status
                            ?.toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          <span className="status-dot"></span>
                          {room.status}
                        </span>
                      </td>

                      <td>
                        <div className="table-actions">

                          <button
                            className="action-button edit"
                            onClick={() => handleEditRoom(room)}
                            title="Edit room"
                          >
                            ✎
                          </button>

                          <button
                            className="action-button delete"
                            onClick={() => handleDelete(room.id)}
                            title="Delete room"
                          >
                            🗑
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          )}

        </section>

        {/* MAINTENANCE NOTICE */}
        {maintenanceRooms > 0 && (
          <div className="maintenance-banner">
            <div className="maintenance-icon">!</div>

            <div>
              <strong>
                {maintenanceRooms} room
                {maintenanceRooms > 1 ? "s are" : " is"} under
                maintenance
              </strong>

              <p>
                Please check the room maintenance status before
                assigning guests.
              </p>
            </div>
          </div>
        )}

      </main>

      {/* ADD / EDIT ROOM MODAL */}
      {showForm && (
        <div
          className="modal-overlay"
          onClick={() => setShowForm(false)}
        >

          <div
            className="modal"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="modal-header">
              <div>
                <p className="section-label">
                  ROOM MANAGEMENT
                </p>

                <h2>
                  {editingRoom
                    ? "Edit Room"
                    : "Add New Room"}
                </h2>
              </div>

              <button
                className="close-button"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>

              <div className="form-grid">

                <div className="form-group">
                  <label>
                    Room Number <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="roomNumber"
                    value={roomForm.roomNumber}
                    onChange={handleChange}
                    placeholder="e.g. 101"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Room Type <span>*</span>
                  </label>

                  <select
                    name="roomType"
                    value={roomForm.roomType}
                    onChange={handleChange}
                    required
                  >
                    <option value="STANDARD">
                      Standard
                    </option>

                    <option value="DELUXE">
                      Deluxe
                    </option>

                    <option value="SUITE">
                      Suite
                    </option>

                    <option value="PREMIUM">
                      Premium
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    Price / Night <span>*</span>
                  </label>

                  <div className="price-input">
                    <span>$</span>

                    <input
                      type="number"
                      name="price"
                      value={roomForm.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    Status <span>*</span>
                  </label>

                  <select
                    name="status"
                    value={roomForm.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="AVAILABLE">
                      Available
                    </option>

                    <option value="OCCUPIED">
                      Occupied
                    </option>

                    <option value="MAINTENANCE">
                      Maintenance
                    </option>
                  </select>
                </div>

              </div>

              <div className="modal-footer">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingRoom
                    ? "Update Room"
                    : "Save Room"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default App;