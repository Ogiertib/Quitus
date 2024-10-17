import React, { useState, useEffect } from 'react';
import './RoomTable.css';

const RoomTable = ({ onSave }) => {
    const [roomData, setRoomData] = useState([
        { id: 1, name: 'Entrées d\'air salon', present: 'non', remarks: '', photo: '', photoName: '' },
        { id: 2, name: 'Entrées d\'air chambres', present: 'non', remarks: '', photo: '', photoName: '' },
        { id: 3, name: 'Détalonnage portes', present: 'non', remarks: '', photo: '', photoName: '' },
        { id: 4, name: 'Obturation entrées d\'air', present: 'non', remarks: '', photo: '', photoName: '' },
    ]);

    useEffect(() => {
        onSave(roomData);
    }, [roomData, onSave]);

    const handleChange = (id, field, value) => {
        setRoomData(prevData =>
            prevData.map(room => (room.id === id ? { ...room, [field]: value } : room))
        );
    };

    const handlePhotoChange = (id, event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setRoomData(prevData =>
                    prevData.map(room => (room.id === id ? { ...room, photo: reader.result, photoName: file.name } : room))
                );
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePhotoDelete = (id) => {
        setRoomData(prevData =>
            prevData.map(room => (room.id === id ? { ...room, photo: '', photoName: '' } : room))
        );
    };

    return (
        <div className="room-table-container">
            {roomData.map(room => (
                <div key={room.id} className="room-item">
                    <div className="room-item-header">
                        <h3>{room.name}</h3>
                        <div className="toggle-container">
                            <p>Présence</p>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={room.present === 'Oui'}
                                    onChange={() => handleChange(room.id, 'present', room.present === 'Oui' ? 'Non' : 'Oui')}
                                />
                                <span className="slider inverted"></span>
                            </label>
                        </div>
                    </div>
                    <div className="room-item-body">
                        <div className="remarks-photo-container">
                            <input
                                type="text"
                                value={room.remarks}
                                onChange={e => handleChange(room.id, 'remarks', e.target.value)}
                                placeholder="Quantitié/Remarques"
                                className="remarks-input"
                            />
                            <div className="photo-container">
                                {!room.photo && (
                                    <label className="photo-upload-button">
                                        <input
                                            id={`file-input-${room.id}`}
                                            type="file"
                                            accept="image/*"
                                            onChange={e => handlePhotoChange(room.id, e)}
                                            style={{ display: 'none' }}
                                        />
                                        <div className="photo-upload-icon">+</div>
                                    </label>
                                )}
                                {/* Afficher le nom de la photo en dessous */}
                                {room.photoName && (
                                    <>
                                        <button
                                            className="delete-photo-button"
                                            onClick={() => handlePhotoDelete(room.id)}
                                        >
                                            &ndash;
                                        </button>
                                        <p className="photo-name">{room.photoName}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RoomTable;
