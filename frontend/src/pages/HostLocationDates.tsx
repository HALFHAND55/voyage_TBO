import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet icon not showing in React
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
});

const DEFAULT_CENTER: [number, number] = [28.6139, 77.2090]; // Delhi as default

const HostLocationDates = () => {
    const { category } = useParams<{ category: string }>();
    const navigate = useNavigate();

    const [position, setPosition] = useState<[number, number]>(DEFAULT_CENTER);
    const [locationName, setLocationName] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const [isLocating, setIsLocating] = useState(false);

    const today = new Date().toISOString().split('T')[0];

    // Helper component to handle map clicks
    const MapEvents = () => {
        useMapEvents({
            click(e) {
                setPosition([e.latlng.lat, e.latlng.lng]);
                fetchLocationName(e.latlng.lat, e.latlng.lng);
            },
        });
        return null;
    };

    const fetchLocationName = async (lat: number, lng: number) => {
        setIsLocating(true);
        try {
            // Free openstreetmap reverse geocoding
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const data = await response.json();

            const cityOrRegion = data.address.city || data.address.town || data.address.state || data.display_name;
            setLocationName(cityOrRegion);
        } catch (e) {
            console.error("Geocoding failed", e);
            setLocationName("Custom Location Selected");
        } finally {
            setIsLocating(false);
        }
    };

    // Try to geolocate user on mount
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
                setPosition(coords);
                fetchLocationName(coords[0], coords[1]);
            });
        }
    }, []);

    const isValid = locationName.trim() !== '' && startDate && endDate && endDate >= startDate;

    const handleContinue = () => {
        if (!isValid) return;

        // Pass everything as state to the next step
        navigate(`/host/hotels/${category}`, {
            state: {
                location: locationName,
                coordinates: position,
                startDate,
                endDate
            }
        });
    };

    return (
        <div className="location-dates-page" style={{ padding: '6rem 2rem', minHeight: '100vh', backgroundColor: '#121212', color: '#f5f5f5' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', background: '#1e1e1e', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(198, 167, 94, 0.2)' }}>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontFamily: 'var(--font-family-serif)', color: '#C6A75E', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Where and When?</h1>
                    <p style={{ color: '#B5B5B5' }}>Select your desired location and dates for this {category}.</p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>1. Select Location on Map</label>
                    {locationName && (
                        <div style={{ marginBottom: '1rem', padding: '0.75rem', background: 'rgba(198, 167, 94, 0.1)', borderRadius: '8px', border: '1px solid rgba(198, 167, 94, 0.3)' }}>
                            Selected: <strong>{isLocating ? 'Determining location...' : locationName}</strong>
                        </div>
                    )}
                    <div style={{ height: '350px', borderRadius: '12px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)' }}>
                        <MapContainer center={position} zoom={10} style={{ height: '100%', width: '100%' }}>
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={position} />
                            <MapEvents />
                        </MapContainer>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.5rem' }}>* Click anywhere on the map to drop a pin.</p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>2. Check-In Date *</label>
                        <input
                            type="date"
                            min={today}
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: '#252525', border: '1px solid #333', color: 'white' }}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>3. Check-Out Date *</label>
                        <input
                            type="date"
                            min={startDate || today}
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: '#252525', border: '1px solid #333', color: 'white' }}
                        />
                    </div>
                </div>

                <button
                    onClick={handleContinue}
                    disabled={!isValid}
                    style={{
                        width: '100%',
                        padding: '1.2rem',
                        background: isValid ? '#C6A75E' : '#333',
                        color: isValid ? '#000' : '#666',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: isValid ? 'pointer' : 'not-allowed',
                        transition: 'all 0.3s'
                    }}
                >
                    Find Hotels & Travel Packages
                </button>

            </div>
        </div>
    );
};

export default HostLocationDates;
