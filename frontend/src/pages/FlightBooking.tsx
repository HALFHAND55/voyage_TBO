import React, { useState } from 'react';
import { Plane, Users, MapPin, Send, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/FlightBooking.css';

const FlightBooking = () => {
    const navigate = useNavigate();
    
    const [guests, setGuests] = useState({ male: 0, female: 0, children: 0 });
    const [locations, setLocations] = useState<Record<string, number>>({
        Delhi: 0, Mumbai: 0, Bangalore: 0, Kolkata: 0, Hyderabad: 0
    });
    const [newCity, setNewCity] = useState('');
    
    const destination = "Udaipur Palace"; 

    const totalGuests = Number(guests.male) + Number(guests.female) + Number(guests.children);

    const handleGuestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGuests({ ...guests, [e.target.name]: parseInt(e.target.value) || 0 });
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocations({ ...locations, [e.target.name]: parseInt(e.target.value) || 0 });
    };

    const handleAddCity = (e: React.MouseEvent) => {
        e.preventDefault();
        const cityToAdd = newCity.trim();
        if (cityToAdd && locations[cityToAdd] === undefined) {
            setLocations({ ...locations, [cityToAdd]: 0 });
            setNewCity('');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitted Data:", { destination, totalGuests, guests, locations });
        alert("Travel requirements submitted successfully! Our concierge will contact you shortly.");
        
        // Redirects to the marketplace (defaulting to wedding as an example)
        navigate('/host/marketplace/wedding'); 
    };

    return (
        <div className="flight-booking-container">
            <div className="booking-card">
                <div className="booking-header">
                    <Plane className="header-icon" size={36} />
                    <h2>Flight Concierge</h2>
                    <p>Destination: <strong>{destination}</strong></p>
                </div>

                <form onSubmit={handleSubmit} className="booking-form">
                    <div className="form-section">
                        <div className="section-header">
                            <Users className="section-icon" size={24} />
                            <h3>Guest Demographics</h3>
                        </div>
                        <p className="section-desc">Enter the number of guests requiring flight tickets.</p>
                        
                        <div className="grid-inputs">
                            <div className="input-group">
                                <label>Male Adults</label>
                                <input type="number" name="male" min="0" value={guests.male} onChange={handleGuestChange} />
                            </div>
                            <div className="input-group">
                                <label>Female Adults</label>
                                <input type="number" name="female" min="0" value={guests.female} onChange={handleGuestChange} />
                            </div>
                            <div className="input-group">
                                <label>Children (Under 12)</label>
                                <input type="number" name="children" min="0" value={guests.children} onChange={handleGuestChange} />
                            </div>
                        </div>
                        <div className="total-badge">
                            Total Travelling Guests: <span>{totalGuests}</span>
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="section-header">
                            <MapPin className="section-icon" size={24} />
                            <h3>Boarding Locations</h3>
                        </div>
                        <p className="section-desc">Specify the number of guests boarding from our hubs, or add your own.</p>
                        
                        <div className="grid-inputs locations-grid">
                            {Object.entries(locations).map(([city, count]) => (
                                <div className="input-group" key={city}>
                                    <label>{city}</label>
                                    <input type="number" name={city} min="0" value={count} onChange={handleLocationChange} />
                                </div>
                            ))}
                        </div>

                        <div className="add-city-wrapper">
                            <input 
                                type="text" 
                                placeholder="Add another city..." 
                                value={newCity}
                                onChange={(e) => setNewCity(e.target.value)}
                            />
                            <button onClick={handleAddCity} className="btn-add-city">
                                <Plus size={18} /> Add
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary submit-btn">
                        <Send size={18} /> Submit Travel Requirements
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FlightBooking;