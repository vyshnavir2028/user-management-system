const apiBase = 'http://localhost:4000/api/users';
const userTable = document.getElementById('userTable');
const userForm = document.getElementById('userForm');
let editUserId = null;

// Fetch all users
async function loadUsers() {
    const response = await fetch(apiBase);
    const users = await response.json();
    userTable.innerHTML = users.map(user => `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.dob}</td>
            <td>
                <button class="edit" onclick="editUser(${user.id})">Edit</button>
                <button class="delete" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Add or update user
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const dob = document.getElementById('dob').value;

    const payload = { name, email, dob };
    const method = editUserId ? 'PUT' : 'POST';
    const url = editUserId ? `${apiBase}/${editUserId}` : apiBase;

    await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    editUserId = null;
    userForm.reset();
    loadUsers();
});

// Edit user
async function editUser(id) {
    const response = await fetch(`${apiBase}/${id}`);
    const user = await response.json();
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('dob').value = user.dob;
    editUserId = id;
}

// Delete user
async function deleteUser(id) {
    await fetch(`${apiBase}/${id}`, { method: 'DELETE' });
    loadUsers();
}

// Initial load
loadUsers();
