import React from 'react'

const UserTable = ({ users, onEdit, onDelete }) => {

    if (users.length === 0) {
        return <p style={{ textAlign: 'center', color: 'gray', marginTop: '2rem' }}>No users found.</p>
    }

    return (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead style={{ backgroundColor: '#f5f5f5' }}>
                <tr>
                    <th style={th}>ID</th>
                    <th style={th}>Name</th>
                    <th style={th}>Email</th>
                    <th style={th}>Phone</th>
                    <th style={th}>Address</th>
                    <th style={th}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={td}>{user.id}</td>
                        <td style={td}>{user.name}</td>
                        <td style={td}>{user.email}</td>
                        <td style={td}>{user.phone}</td>
                        <td style={td}>{user.address}</td>
                        <td style={td}>
                            <button onClick={() => onEdit(user)} style={editBtn}>Edit</button>
                            <button onClick={() => onDelete(user.id)} style={deleteBtn}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

const th = {
    padding: '10px 14px',
    textAlign: 'left',
    fontWeight: '500',
    color: '#666',
    borderBottom: '1px solid #eee'
}

const td = {
    padding: '10px 14px',
    color: '#333'
}

const editBtn = {
    marginRight: '8px',
    padding: '4px 12px',
    fontSize: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    background: '#fff',
    cursor: 'pointer'
}

const deleteBtn = {
    padding: '4px 12px',
    fontSize: '12px',
    borderRadius: '6px',
    border: '1px solid #f09595',
    background: '#fcebeb',
    color: '#a32d2d',
    cursor: 'pointer'
}

export default UserTable