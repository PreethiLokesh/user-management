import React, { useState, useEffect } from 'react'

const UserModal = ({ isOpen, onClose, onSave, editingUser }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    })

    const [errors, setErrors] = useState({})

    // If editing, fill the form with existing user data
    useEffect(() => {
        if (editingUser) {
            setFormData({
                name: editingUser.name,
                email: editingUser.email,
                phone: editingUser.phone,
                address: editingUser.address
            })
        } else {
            setFormData({ name: '', email: '', phone: '', address: '' })
        }
        setErrors({})
    }, [editingUser, isOpen])

    if (!isOpen) return null

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const validate = () => {
        const newErrors = {}
        if (!formData.name.trim()) newErrors.name = 'Name is required'
        if (!formData.email.trim()) newErrors.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email'
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
        else if (formData.phone.length !== 10) newErrors.phone = 'Phone must be 10 digits'
        if (!formData.address.trim()) newErrors.address = 'Address is required'
        return newErrors
    }

    const handleSubmit = () => {
        const newErrors = validate()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }
        onSave(formData)
    }

    return (
        <div style={overlay}>
            <div style={modal}>
                <h2 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '1rem' }}>
                    {editingUser ? 'Edit user' : 'Add new user'}
                </h2>

                <div style={formGrid}>
                    <div style={formGroup}>
                        <label style={label}>Name</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            style={input}
                        />
                        {errors.name && <span style={errorStyle}>{errors.name}</span>}
                    </div>

                    <div style={formGroup}>
                        <label style={label}>Email</label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email address"
                            style={input}
                        />
                        {errors.email && <span style={errorStyle}>{errors.email}</span>}
                    </div>

                    <div style={formGroup}>
                        <label style={label}>Phone</label>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="10-digit number"
                            style={input}
                        />
                        {errors.phone && <span style={errorStyle}>{errors.phone}</span>}
                    </div>

                    <div style={formGroup}>
                        <label style={label}>Address</label>
                        <input
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter address"
                            style={input}
                        />
                        {errors.address && <span style={errorStyle}>{errors.address}</span>}
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '1rem' }}>
                    <button onClick={onClose} style={cancelBtn}>Cancel</button>
                    <button onClick={handleSubmit} style={saveBtn}>
                        {editingUser ? 'Update user' : 'Save user'}
                    </button>
                </div>
            </div>
        </div>
    )
}

const overlay = {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
}

const modal = {
    background: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    width: '480px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.12)'
}

const formGrid = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px'
}

const formGroup = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
}

const label = {
    fontSize: '12px',
    color: '#666'
}

const input = {
    height: '34px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    padding: '0 10px',
    fontSize: '13px'
}

const errorStyle = {
    fontSize: '11px',
    color: '#a32d2d'
}

const cancelBtn = {
    padding: '7px 16px',
    fontSize: '13px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    background: '#f5f5f5',
    cursor: 'pointer'
}

const saveBtn = {
    padding: '7px 16px',
    fontSize: '13px',
    borderRadius: '6px',
    border: 'none',
    background: '#378ADD',
    color: '#fff',
    cursor: 'pointer'
}

export default UserModal