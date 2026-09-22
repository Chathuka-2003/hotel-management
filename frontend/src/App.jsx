import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "/api/rooms";

const emptyRoom = {
  roomNumber: "",
  roomType: "DELUXE",
  price: "",
  status: "AVAILABLE",
};

/* ---------------------------------------------------------
   Icons — small inline SVGs, presentational only.
--------------------------------------------------------- */

const IconDashboard = (props) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
    <rect x="2.5" y="2.5" width="6.5" height="6.5" rx="1.4" stroke="currentColor" strokeWidth="1.4" />
    <rect x="11" y="2.5" width="6.5" height="6.5" rx="1.4" stroke="currentColor" strokeWidth="1.4" />
    <rect x="2.5" y="11" width="6.5" height="6.5" rx="1.4" stroke="currentColor" strokeWidth="1.4" />
    <rect x="11" y="11" width="6.5" height="6.5" rx="1.4" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const IconBed = (props) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
    <path d="M2.5 15.5V6.2a1 1 0 0 1 1-1H9a1 1 0 0 1 1 1V11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.5 11h15v4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 8.3h4.6a1.9 1.9 0 0 1 1.9 1.9V11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="5.6" cy="7.8" r="1.1" stroke="currentColor" strokeWidth="1.2" />
    <path d="M2.5 15.5v1.3M17.5 15.5v1.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const IconCalendar = (props) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
    <rect x="2.5" y="4" width="15" height="13" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
    <path d="M2.5 8h15" stroke="currentColor" strokeWidth="1.4" />
    <path d="M6.2 2.5v3M13.8 2.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const IconUsers = (props) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
    <circle cx="7.2" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M2.5 16.3c0-2.5 2.1-4 4.7-4s4.7 1.5 4.7 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="14.6" cy="7.6" r="2" stroke="currentColor" strokeWidth="1.3" />
    <path d="M12.9 12.6c1.9.3 3.6 1.7 3.6 3.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const IconReports = (props) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
    <path d="M5 2.5h6.3L15 6.3V17a.6.6 0 0 1-.6.6H5A.6.6 0 0 1 4.4 17V3.1A.6.6 0 0 1 5 2.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M11.3 2.5V6h3.6" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M7 10.4h6M7 13.2h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const IconHelp = (props) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
    <circle cx="10" cy="10" r="7.3" stroke="currentColor" strokeWidth="1.4" />
    <path d="M7.9 7.9a2.15 2.15 0 1 1 3 2c-.7.4-1.1.9-1.1 1.7v.25" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <circle cx="9.9" cy="14" r="0.6" fill="currentColor" />
  </svg>
);

const IconBell = (props) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
    <path d="M6 8.1a4 4 0 0 1 8 0c0 3.1 1 4.4 1.5 4.9H4.5c.5-.5 1.5-1.8 1.5-4.9Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M8.3 15.4a1.8 1.8 0 0 0 3.4 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const IconPlus = (props) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
    <path d="M10 4.5v11M4.5 10h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const IconRefresh = (props) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
    <path d="M16 6.7A6.5 6.5 0 1 0 17.5 10.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 3.1v4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconEdit = (props) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
    <path d="M12.7 3.3a1.7 1.7 0 0 1 2.4 2.4L6.6 14.2 3 15l.8-3.6 8.9-8.1Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);

const IconTrash = (props) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
    <path d="M4 6h12M8 6V4.6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V6M6 6l.6 9.3a1 1 0 0 0 1 .9h4.8a1 1 0 0 0 1-.9L14 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconClose = (props) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
    <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconAlert = (props) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
    <path d="M10 2.6 18 16.4H2L10 2.6Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M10 8.2v3.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="10" cy="14" r="0.7" fill="currentColor" />
  </svg>
);

const IconCheck = (props) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
    <path d="M4.3 10.5 7.8 14l8-8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconGuest = (props) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
    <circle cx="10" cy="6.9" r="3" stroke="currentColor" strokeWidth="1.4" />
    <path d="M4 16.4c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const IconWrench = (props) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
    <path d="M13.6 3.3a3.6 3.6 0 0 0-4.9 4.1l-6 6a1.7 1.7 0 0 0 2.4 2.4l6-6a3.6 3.6 0 0 0 4-5l-2.3 2.3-1.7-.3-.3-1.7 2.3-2.3Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);

const IconHotel = (props) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
    <path d="M4 17.2V4.6A1.5 1.5 0 0 1 5.5 3.1h9A1.5 1.5 0 0 1 16 4.6v12.6" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M2.3 17.2h15.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M7 6.6h1.4M11.6 6.6H13M7 10.1h1.4M11.6 10.1H13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M8.6 17.2v-3a1.4 1.4 0 0 1 2.8 0v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const IconValue = (props) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
    <path d="M10 2.6v14.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M13.6 5.9c-.6-.9-1.9-1.5-3.6-1.5-2.2 0-3.8 1.1-3.8 2.7 0 3.6 7.6 1.9 7.6 5.4 0 1.6-1.7 2.7-3.8 2.7-1.7 0-3.1-.5-3.7-1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const IconDots = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
    <circle cx="4" cy="10" r="1.4" />
    <circle cx="10" cy="10" r="1.4" />
    <circle cx="16" cy="10" r="1.4" />
  </svg>
);

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
        <div className="sidebar__brand">
          <div className="brand-mark">H</div>

          <div className="brand-text">
            <h2>HavenStay</h2>
            <span>Property management</span>
          </div>
        </div>

        <nav className="sidebar__nav" aria-label="Primary">
          <a href="#dashboard" className="nav-link is-active">
            <IconDashboard className="nav-icon" />
            <span>Dashboard</span>
          </a>

          <a href="#rooms" className="nav-link">
            <IconBed className="nav-icon" />
            <span>Rooms</span>
          </a>

          <a href="#reservations" className="nav-link">
            <IconCalendar className="nav-icon" />
            <span>Reservations</span>
          </a>

          <a href="#guests" className="nav-link">
            <IconUsers className="nav-icon" />
            <span>Guests</span>
          </a>

          <a href="#reports" className="nav-link">
            <IconReports className="nav-icon" />
            <span>Reports</span>
          </a>
        </nav>

        <div className="sidebar__footer">
          <div className="support-card">
            <div className="support-icon">
              <IconHelp />
            </div>

            <div>
              <strong>Need help?</strong>
              <p>Contact support</p>
            </div>
          </div>

          <div className="user-card">
            <div className="user-avatar">AD</div>

            <div className="user-meta">
              <strong>Admin</strong>
              <span>Administrator</span>
            </div>

            <button className="user-menu-btn" aria-label="Open account menu">
              <IconDots />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main">

        {/* HEADER */}
        <header className="topbar">
          <div>
            <h1>Good morning, Admin</h1>
            <p className="topbar__subtitle">
              Here's what's happening at your hotel today.
            </p>
          </div>

          <div className="topbar__actions">
            <button className="icon-btn" aria-label="View notifications">
              <IconBell />
              <span className="notification-dot" aria-hidden="true"></span>
            </button>

            <button
              className="btn btn-primary"
              onClick={handleAddRoom}
            >
              <IconPlus />
              Add room
            </button>
          </div>
        </header>

        {/* ERROR */}
        {error && (
          <div className="banner banner-error" role="alert">
            <IconAlert />
            <p>{error}</p>
            <button aria-label="Dismiss error" onClick={() => setError("")}>
              <IconClose />
            </button>
          </div>
        )}

        {/* STAT CARDS */}
        <section className="stats" aria-label="Room summary">

          <div className="stat-tile stat-tile--total">
            <div className="stat-tile__top">
              <IconHotel className="stat-tile__icon" />
              <span>Total rooms</span>
            </div>
            <strong>{rooms.length}</strong>
            <small>Registered across the property</small>
          </div>

          <div className="stat-tile stat-tile--available">
            <div className="stat-tile__top">
              <IconCheck className="stat-tile__icon" />
              <span>Available</span>
            </div>
            <strong>{availableRooms}</strong>
            <small>Ready for guests</small>
          </div>

          <div className="stat-tile stat-tile--occupied">
            <div className="stat-tile__top">
              <IconGuest className="stat-tile__icon" />
              <span>Occupied</span>
            </div>
            <strong>{occupiedRooms}</strong>
            <small>Currently occupied</small>
          </div>

          <div className="stat-tile stat-tile--value">
            <div className="stat-tile__top">
              <IconValue className="stat-tile__icon" />
              <span>Room value</span>
            </div>
            <strong>${totalRevenue.toLocaleString()}</strong>
            <small>Combined nightly rate</small>
          </div>

        </section>

        {/* QUICK ACTIONS */}
        <section className="panel panel--actions">

          <h2>Manage your hotel</h2>

          <div className="action-list">
            <button
              className="action-item"
              onClick={handleAddRoom}
            >
              <span className="action-item__icon"><IconPlus /></span>
              <span className="action-item__text">
                <strong>Add room</strong>
                <small>Create a new room</small>
              </span>
            </button>

            <button className="action-item">
              <span className="action-item__icon"><IconCalendar /></span>
              <span className="action-item__text">
                <strong>New reservation</strong>
                <small>Book a guest stay</small>
              </span>
            </button>

            <button className="action-item">
              <span className="action-item__icon"><IconGuest /></span>
              <span className="action-item__text">
                <strong>Add guest</strong>
                <small>Register guest</small>
              </span>
            </button>
          </div>

        </section>

        {/* ROOM SECTION */}
        <section className="panel panel--table" id="rooms">

          <div className="panel__header">
            <h2>Rooms</h2>

            <div className="panel__tools">
              <button
                className="btn btn-secondary"
                onClick={fetchRooms}
              >
                <IconRefresh />
                Refresh
              </button>

              <button
                className="btn btn-primary"
                onClick={handleAddRoom}
              >
                <IconPlus />
                Add room
              </button>
            </div>
          </div>

          {loading ? (
            <div className="state-block" role="status">
              <div className="spinner" aria-hidden="true"></div>
              <p>Loading rooms…</p>
            </div>
          ) : rooms.length === 0 ? (
            <div className="state-block state-block--empty">
              <div className="state-block__icon"><IconBed /></div>
              <h3>No rooms yet</h3>
              <p>
                Add your first room to start managing your hotel.
              </p>

              <button
                className="btn btn-primary"
                onClick={handleAddRoom}
              >
                <IconPlus />
                Add first room
              </button>
            </div>
          ) : (
            <div className="table-scroll">

              <table className="room-table">

                <thead>
                  <tr>
                    <th scope="col">Room</th>
                    <th scope="col">Type</th>
                    <th scope="col">Price</th>
                    <th scope="col">Status</th>
                    <th scope="col">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {rooms.map((room) => (
                    <tr key={room.id}>

                      <td>
                        <div className="room-cell">
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
                          className={`status-pill ${room.status
                            ?.toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          <span className="status-pill__dot"></span>
                          {room.status}
                        </span>
                      </td>

                      <td>
                        <div className="row-actions">

                          <button
                            className="icon-btn"
                            onClick={() => handleEditRoom(room)}
                            aria-label={`Edit room ${room.roomNumber}`}
                          >
                            <IconEdit />
                          </button>

                          <button
                            className="icon-btn icon-btn--danger"
                            onClick={() => handleDelete(room.id)}
                            aria-label={`Delete room ${room.roomNumber}`}
                          >
                            <IconTrash />
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
          <div className="banner banner-maintenance">
            <div className="banner-maintenance__icon">
              <IconWrench />
            </div>

            <div>
              <strong>
                {maintenanceRooms} room
                {maintenanceRooms > 1 ? "s are" : " is"} under
                maintenance
              </strong>

              <p>
                Check the room's maintenance status before
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
            role="dialog"
            aria-modal="true"
            aria-labelledby="room-modal-title"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="modal__header">
              <h2 id="room-modal-title">
                {editingRoom
                  ? "Edit room"
                  : "Add new room"}
              </h2>

              <button
                className="modal__close"
                onClick={() => setShowForm(false)}
                aria-label="Close dialog"
              >
                <IconClose />
              </button>
            </div>

            <form onSubmit={handleSubmit}>

              <div className="form-grid">

                <div className="field">
                  <label htmlFor="roomNumber">
                    Room number <span>*</span>
                  </label>

                  <input
                    type="text"
                    id="roomNumber"
                    name="roomNumber"
                    value={roomForm.roomNumber}
                    onChange={handleChange}
                    placeholder="e.g. 101"
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="roomType">
                    Room type <span>*</span>
                  </label>

                  <select
                    id="roomType"
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

                <div className="field">
                  <label htmlFor="price">
                    Price / night <span>*</span>
                  </label>

                  <div className="price-field">
                    <span aria-hidden="true">$</span>

                    <input
                      type="number"
                      id="price"
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

                <div className="field">
                  <label htmlFor="status">
                    Status <span>*</span>
                  </label>

                  <select
                    id="status"
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

              <div className="modal__footer">

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving
                    ? "Saving…"
                    : editingRoom
                    ? "Update room"
                    : "Save room"}
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
