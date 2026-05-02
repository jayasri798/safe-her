import { useState, useEffect } from 'react';
import { UserPlus, Trash2, Phone, Users } from 'lucide-react';
import './ContactsScreen.css';

const ContactsScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('safeher_contacts');
    if (saved) setContacts(JSON.parse(saved));
  }, []);

  const saveToStorage = (newContacts) => {
    localStorage.setItem('safeher_contacts', JSON.stringify(newContacts));
    setContacts(newContacts);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return setError('Fill all fields');
    if (contacts.length >= 5) return setError('Max 5 contacts allowed');
    const newContact = { id: Date.now().toString(), name: name.trim(), phone: phone.trim() };
    saveToStorage([...contacts, newContact]);
    setName('');
    setPhone('');
    setError('');
  };

  const handleDelete = (id) => saveToStorage(contacts.filter(c => c.id !== id));

  return (
    <div className="contacts-screen">
      <div className="screen-header">
        <h1 className="title-large">Emergency Contacts</h1>
        <p className="subtitle-muted">Added {contacts.length}/5 contacts</p>
      </div>

      <div className="add-contact-section">
        <div className="card add-card">
          <form onSubmit={handleAdd}>
            <div className="input-group">
              <label className="input-label">Contact Name</label>
              <input type="text" className="input-field" placeholder="e.g. Jane Doe" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">Phone Number</label>
              <input type="tel" className="input-field" placeholder="e.g. +1 234 567 890" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            {error && <p className="error-text">{error}</p>}
            <button type="submit" className="btn-primary">
              <UserPlus size={18} /> Add Contact
            </button>
          </form>
        </div>
      </div>

      <div className="contacts-list-section">
        <h3 className="section-title">Saved Contacts</h3>
        <div className="contacts-list">
          {contacts.map(c => (
            <div key={c.id} className="card contact-row-card">
              <div className="contact-avatar">
                {c.name.charAt(0).toUpperCase()}
              </div>
              <div className="contact-info">
                <strong>{c.name}</strong>
                <span>{c.phone}</span>
              </div>
              <div className="contact-actions">
                <a href={`tel:${c.phone}`} className="call-btn-circle">
                  <Phone size={16} />
                </a>
                <button onClick={() => handleDelete(c.id)} className="delete-btn-circle">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {contacts.length === 0 && <p className="empty-msg">No contacts added yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default ContactsScreen;
