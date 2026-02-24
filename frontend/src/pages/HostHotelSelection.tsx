import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { MapPin, CalendarDays, Star, Users } from 'lucide-react';

interface HotelPackage {
    HotelName: string;
    StarRating: number;
    RoomType: string;
    MealPlan: string;
    IsRefundable: boolean;
    Price: number;
    Currency: string;
    Image?: string;
}

const HostHotelSelection = () => {
    const { category } = useParams<{ category: string }>();
    const locationState = useLocation().state as {
        location: string;
        coordinates: [number, number];
        startDate: string;
        endDate: string;
    } | null;
    const navigate = useNavigate();

    const [hotels, setHotels] = useState<HotelPackage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // If user arrived without selecting location/dates, send them back
        if (!locationState) {
            navigate(`/host/location-dates/${category}`);
            return;
        }

        const fetchHotels = async () => {
            try {
                // TBO Required payload matching backend requirements
                const payload = {
                    CheckIn: locationState.startDate,
                    CheckOut: locationState.endDate,
                    HotelCodes: "1000000,1000001", // Demo/Default mock codes
                    GuestNationality: "IN",
                    PaxRooms: [
                        {
                            Adults: 2,
                            Children: 0
                        }
                    ]
                };

                // Call our backend
                const response = await axios.post('http://localhost:5000/api/hotels/search', payload);

                // Map the backend TBO response to our frontend format 
                // Note: we are mocking the UI binding here for demonstration as real TBO structure can be nested.
                const results = response.data?.data?.HotelSearchResults || [
                    // Fallback mock data if API doesn't return exactly what we expect on test creds
                    {
                        HotelName: "The Grand Palace - " + locationState.location,
                        StarRating: 5,
                        RoomType: "Presidential Suite",
                        MealPlan: "Breakfast Included",
                        IsRefundable: true,
                        Price: 45000,
                        Currency: "INR",
                        Image: "https://images.unsplash.com/photo-1542314831-c6a4d14d837e?auto=format&fit=crop&q=80&w=600"
                    },
                    {
                        HotelName: "Royal Heritage Resort",
                        StarRating: 4,
                        RoomType: "Deluxe Villa",
                        MealPlan: "All Inclusive",
                        IsRefundable: false,
                        Price: 28000,
                        Currency: "INR",
                        Image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=600"
                    },
                    {
                        HotelName: "Boutique Corporate Stay",
                        StarRating: 3,
                        RoomType: "Standard Room",
                        MealPlan: "Room Only",
                        IsRefundable: true,
                        Price: 8500,
                        Currency: "INR",
                        Image: "https://images.unsplash.com/photo-1551882547-ff40c0d5e9af?auto=format&fit=crop&q=80&w=600"
                    }
                ];

                setHotels(results);
            } catch (err: any) {
                console.error("Failed to fetch hotels:", err);
                setError("Failed to fetch hotels from the API. Continuing with demo packages.");

                // Populate with mock data for UI demo purposes if backend fails
                setHotels([
                    {
                        HotelName: "The Grand Palace - " + locationState.location,
                        StarRating: 5,
                        RoomType: "Presidential Suite",
                        MealPlan: "Breakfast Included",
                        IsRefundable: true,
                        Price: 45000,
                        Currency: "INR",
                        Image: "https://images.unsplash.com/photo-1542314831-c6a4d14d837e?auto=format&fit=crop&q=80&w=600"
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, [locationState, navigate, category]);

    const handleSelectHotel = (hotel: HotelPackage) => {
        // Navigate to Questionnaire Form carrying all collected data
        navigate(`/host/questionnaire/${category}`, {
            state: {
                ...locationState,
                selectedHotel: hotel
            }
        });
    };

    if (!locationState || loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212', color: '#C6A75E' }}>
                <div style={{ textAlign: 'center' }}>
                    <div className="loader" style={{ width: '50px', height: '50px', border: '3px solid rgba(198,167,94,0.3)', borderTop: '3px solid #C6A75E', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
                    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                    <h2>Searching Top Venues & Hotels at TBO API...</h2>
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: '6rem 2rem', minHeight: '100vh', backgroundColor: '#121212', color: '#f5f5f5' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

                <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <h1 style={{ fontFamily: 'var(--font-family-serif)', color: '#C6A75E', fontSize: '2.5rem', marginBottom: '1rem' }}>
                        Available Packages
                    </h1>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', color: '#B5B5B5' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={18} color="#C6A75E" /> {locationState.location}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CalendarDays size={18} color="#C6A75E" /> {locationState.startDate} to {locationState.endDate}</span>
                    </div>
                </header>

                {error && <div style={{ padding: '1rem', background: 'rgba(255, 100, 100, 0.1)', color: '#ff6b6b', borderRadius: '8px', marginBottom: '2rem', textAlign: 'center' }}>{error}</div>}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {hotels.map((hotel, idx) => (
                        <div key={idx} style={{ background: '#1e1e1e', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(198, 167, 94, 0.2)', transition: 'transform 0.3s', cursor: 'pointer' }}
                            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>

                            <div style={{ height: '200px', background: '#333', backgroundImage: `url(${hotel.Image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.7)', padding: '0.2rem 0.5rem', borderRadius: '6px', color: '#C6A75E', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                                    <Star size={14} fill="#C6A75E" /> {hotel.StarRating} Star
                                </div>
                            </div>

                            <div style={{ padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#FFF' }}>{hotel.HotelName}</h3>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#AAA' }}>
                                    <span><strong>Room:</strong> {hotel.RoomType}</span>
                                    <span><strong>Meal:</strong> {hotel.MealPlan}</span>
                                    <span style={{ color: hotel.IsRefundable ? '#4CAF50' : '#f44336' }}>
                                        {hotel.IsRefundable ? '✓ Refundable' : '✗ Non-Refundable'}
                                    </span>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <div>
                                        <span style={{ fontSize: '0.8rem', color: '#888' }}>Starting from</span>
                                        <div style={{ fontSize: '1.5rem', color: '#C6A75E', fontWeight: 'bold' }}>
                                            {hotel.Currency === 'INR' ? '₹' : hotel.Currency} {hotel.Price.toLocaleString()}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleSelectHotel(hotel)}
                                        style={{ background: '#C6A75E', color: '#000', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}
                                        onMouseOver={e => e.currentTarget.style.background = '#d4b76a'}
                                        onMouseOut={e => e.currentTarget.style.background = '#C6A75E'}
                                    >
                                        Select Hotel
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default HostHotelSelection;
