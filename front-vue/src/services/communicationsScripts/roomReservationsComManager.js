const BACK_URL = import.meta.env.VITE_ROOM_URL;

function handle401(response) {
    if (response.status === 401) {
        window.location.href = '/';
        return true;
    }
    return false;
}

export const getAllRooms = async () => {
    try {
        const response = await fetch(`${BACK_URL}api/rooms`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        if (handle401(response)) return;
        if (!response.ok) {
            return { error: `HTTP error! status: ${response.status}` };
        }
        return await response.json();
    } catch (error) {
        console.error("Network error:", error);
        return { error: "Network error. Please try again later." };
    }
};

export const getReservationsFromRoom = async (id) => {
    try {
        const response = await fetch(`${BACK_URL}api/roomReservations/room/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        if (handle401(response)) return;
        if (!response.ok) {
            return { error: `HTTP error! status: ${response.status}` };
        }
        return await response.json();
    } catch (error) {
        console.error("Network error:", error);
        return { error: "Network error. Please try again later." };
    }
}

export const getReservationsFromUser = async (userId) => {
    try {
        const response = await fetch(`${BACK_URL}api/roomReservations/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        if (handle401(response)) return;
        if (!response.ok) {
            return { error: `HTTP error! status: ${response.status}` };
        }
        return await response.json();
    } catch (error) {
        console.error("Network error:", error);
        return { error: "Network error. Please try again later." };
    }
}

export const createNewReservation = async (reservation) => {
    try {
        const response = await fetch(`${BACK_URL}api/roomReservations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(reservation),
        });
        if (handle401(response)) return;
        if (!response.ok) {
            return { error: `HTTP error! status: ${response.status}` };
        }
        return await response.json();
    } catch (error) {
        console.error("Network error:", error);
        return { error: "Network error. Please try again later." };
    }
}

export const createNewRoom = async (room) => {
    try {
        const response = await fetch(`${BACK_URL}api/rooms`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(room),
        });
        if (handle401(response)) return;
        if (!response.ok) {
            return { error: `HTTP error! status: ${response.status}` };
        }
        return await response.json();
    } catch (error) {
        console.error("Network error:", error);
        return { error: "Network error. Please try again later." };
    }
}
export const deleteRoom = async (id) => {
    try {
        const response = await fetch(`${BACK_URL}api/rooms/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        if (handle401(response)) return;
        if (!response.ok) {
            return { error: `HTTP error! status: ${response.status}` };
        }
        return await response.json();
    } catch (error) {
        console.error("Network error:", error);
        return { error: "Network error. Please try again later." };
    }
}
export const updateRoom = async (id, room) => {
    try {
        const response = await fetch(`${BACK_URL}api/rooms/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(room),
        });
        if (handle401(response)) return;
        if (!response.ok) {
            return { error: `HTTP error! status: ${response.status}` };
        }
        return await response.json();
    } catch (error) {
        console.error("Network error:", error);
        return { error: "Network error. Please try again later." };
    }
}
