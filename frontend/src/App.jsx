import React, { useState, useEffect } from 'react'
import UserTable from './components/UserTable'
import UserModal from './components/UserModal'
import UserService from './service/UserService'

const App = () => {

    const [users, setUsers] = useState([])
    const [searchName, setSearchName] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingUser, setEditingUser] = useState(null)
    const [message, setMessage] = useState('')

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = (name = '') => {
        UserService.getAllUsers(name)
            .then(res => setUsers(res.data.content || res.data))
            .catch(err => showMessage('Failed to fetch users'))
    }

    const handleSearch = () => {
        fetchUsers(searchName)
    }

    const handleAddClick = () => {
        setEditingUser(null)
        setIsModalOpen(true)
    }

    const handleEditClick = (user) => {
        setEditingUser(user)
        setIsModalOpen(true)
    }

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            UserService.deleteUser(id)
                .then(() => {
                    showMessage('User deleted successfully')
                    fetchUsers()
                })
                .catch(() => showMessage('Failed to delete user'))
        }
    }

    const handleSave = (formData) => {
        if (editingUser) {
            UserService.updateUser(editingUser.id, formData)
                .then(() => {
                    showMessage('User updated successfully')
                    setIsModalOpen(false)
                    fetchUsers()
                })
                .catch(() => showMessage('Failed to update user'))
        } else {
            UserService.createUser(formData)
                .then(() => {
                    showMessage('User created successfully')
                    setIsModalOpen(false)
                    fetchUsers()
                })
                .catch(() => showMessage('Failed to create user'))
        }
    }

    const showMessage = (msg) => {
        setMessage(msg)
        setTimeout(() => setMessage(''), 3000)
    }

    return (
        <div style={container}>

            {/* Header */}
            <div style={topbar}>
                <h1 style={{ fontSize: '20px', fontWeight: '500' }}>User management</h1>
                <button onClick={handleAddClick} style={addBtn}>+ Add user</button>
            </div>

            {/* Success/Error Message */}
            {message && (
                <div style={messageBanner}>
                    {message}
                </div>
            )}

            {/* Search Bar */}
            <div style={searchBar}>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    style={searchInput}
                />
                <button onClick={handleSearch} style={searchBtn}>Search</button>
                <button onClick={() => { setSearchName(''); fetchUsers('') }} style={clearBtn}>Clear</button>
            </div>

            {/* Table */}
            <div style={tableWrap}>
                <UserTable
                    users={users}
                    onEdit={handleEditClick}
                    onDelete={handleDelete}
                />
            </div>

            {/* Modal */}
            <UserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                editingUser={editingUser}
            />

        </div>
    )
}

const container = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem 1.5rem',
    fontFamily: 'sans-serif'
}

const topbar = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1.5rem'
}

const addBtn = {
    padding: '8px 16px',
    fontSize: '14px',
    borderRadius: '8px',
    border: 'none',
    background: '#378ADD',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: '500'
}

const messageBanner = {
    padding: '10px 16px',
    borderRadius: '8px',
    background: '#EAF3DE',
    color: '#3B6D11',
    fontSize: '14px',
    marginBottom: '1rem'
}

const searchBar = {
    display: 'flex',
    gap: '8px',
    marginBottom: '1.25rem'
}

const searchInput = {
    flex: 1,
    height: '36px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '0 12px',
    fontSize: '14px'
}

const searchBtn = {
    height: '36px',
    padding: '0 16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    background: '#f5f5f5',
    fontSize: '14px',
    cursor: 'pointer'
}

const clearBtn = {
    height: '36px',
    padding: '0 16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    background: '#fff',
    fontSize: '14px',
    cursor: 'pointer'
}

const tableWrap = {
    background: '#fff',
    border: '1px solid #eee',
    borderRadius: '12px',
    overflow: 'hidden'
}

export default App