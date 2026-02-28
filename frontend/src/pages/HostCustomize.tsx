import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, Plus, ShoppingCart, Sparkles, Star, Plane } from 'lucide-react';
import '../styles/HostCustomize.css'; // Importing your existing CSS file

// --- MOCK INDIVIDUAL VENDORS ---
const INDIVIDUAL_SERVICES = [
    { id: 'v1', type: 'Venue', name: 'Grand Royal Palace', price: 150000, rating: 4.8, img: 'https://images.unsplash.com/photo-1519225421980-6f03b7a1cd1d?auto=format&fit=crop&q=80&w=600' },
    { id: 'v2', type: 'Venue', name: 'Sunset Beach Resort', price: 200000, rating: 4.9, img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600' },
    { id: 'c1', type: 'Catering', name: 'Spice & Savor Catering', price: 80000, rating: 4.7, img: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=600' },
    { id: 'c2', type: 'Catering', name: 'Global Fusion Feasts', price: 120000, rating: 4.9, img: 'https://images.unsplash.com/photo-1414235077428-33898ed1e829?auto=format&fit=crop&q=80&w=600' },
    { id: 'p1', type: 'Photography', name: 'Lens & Light Studios', price: 50000, rating: 4.8, img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600' },
    { id: 'p2', type: 'Photography', name: 'Candid Moments', price: 35000, rating: 4.6, img: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=600' },
    { id: 'd1', type: 'Decor', name: 'Floral Fantasy Decorators', price: 60000, rating: 4.7, img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=600' },
    { id: 'd2', type: 'Decor', name: 'Elite Event Design', price: 90000, rating: 4.9, img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600' },
];

const HostCustomize = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state?.formData; // Catch the data passed from the Questionnaire

    // Keep track of which vendor IDs the user has added to their custom package
    const [selectedVendors, setSelectedVendors] = useState<string[]>([]);

    const toggleVendor = (id: string) => {
        setSelectedVendors(prev => 
            prev.includes(id) ? prev.filter(vId => vId !== id) : [...prev, id]
        );
    };

    const handleFlightBooking = () => {
        navigate('/book-flight');
    };

    // Calculate total price of selected vendors
    const currentTotal = INDIVIDUAL_SERVICES
        .filter(service => selectedVendors.includes(service.id))
        .reduce((sum, service) => sum + service.price, 0);

    const handleCheckout = () => {
        if (selectedVendors.length === 0) return;
        // In a real app, you'd pass the array of selected IDs. For now, we use a generic custom payment route.
        navigate('/payment/custom-package');
    };

    // Group services by type for the UI
    const serviceCategories = ['Venue', 'Decor', 'Catering', 'Photography'];

    return (
        <div className="custom-builder-container" style={{ background: '#121212', minHeight: '100vh', paddingBottom: '100px' }}>
            {/* Page Header Area */}
            <div style={{
                background: '#1A1A1D',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                padding: '3rem 0 2.5rem',
                marginBottom: '2.5rem',
            }}>
                <div className="container" style={{ padding: '0 1.5rem' }}>
                    <p style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        color: '#C6A75E',
                        marginBottom: '0.5rem',
                    }}>
                        Tailored Experience
                    </p>
                    <h1 style={{
                        fontFamily: 'var(--font-family-serif)',
                        fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        letterSpacing: '-0.3px',
                        marginBottom: '0.5rem',
                    }}>
                        Build Your Custom Package
                    </h1>
                    {formData ? (
                        <p style={{ color: '#B5B5B5', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Sparkles size={16} color="#C6A75E" /> 
                            Tailoring for your <strong>{formData.category}</strong> {formData.location ? `in ${formData.location}` : ''}
                        </p>
                    ) : (
                        <p style={{ color: '#B5B5B5', fontSize: '0.95rem' }}>
                            Select the specific services you need to create your perfect event.
                        </p>
                    )}
                </div>
            </div>

            <div className="container" style={{ padding: '0 1.5rem' }}>
                
                {/* --- FLIGHT BOOKING BANNER --- */}
                <div className="flight-banner">
                    <div className="flight-banner-content">
                        <div className="flight-banner-icon">
                            <Plane size={28} color="#C6A75E" />
                        </div>
                        <div>
                            <h3 className="flight-banner-title">Travel & Flight Concierge</h3>
                            <p className="flight-banner-desc">
                                Expecting out-of-town guests? Seamlessly arrange group flights, capture guest demographics, and manage travel from top locations.
                            </p>
                        </div>
                    </div>
                    <button className="btn flight-banner-btn" onClick={handleFlightBooking}>
                        Setup Travel Requirements
                    </button>
                </div>
                {/* ------------------------------- */}

                {serviceCategories.map(category => (
                    <div key={category} className="service-section" style={{ marginBottom: '3rem' }}>
                        <h2 style={{ color: '#FFFFFF', fontFamily: 'var(--font-family-serif)', fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                            {category} Vendors
                        </h2>
                        <div className="vendor-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {INDIVIDUAL_SERVICES.filter(s => s.type === category).map(vendor => {
                                const isSelected = selectedVendors.includes(vendor.id);
                                return (
                                    <div key={vendor.id} className={`vendor-card ${isSelected ? 'selected' : ''}`} style={{
                                        background: '#1E1E1E',
                                        border: `1px solid ${isSelected ? '#C6A75E' : 'rgba(255,255,255,0.06)'}`,
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        boxShadow: isSelected ? '0 0 15px rgba(198, 167, 94, 0.15)' : '0 4px 16px rgba(0,0,0,0.5)',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <div className="vendor-img" style={{ backgroundImage: `url(${vendor.img})`, height: '180px', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                        <div className="vendor-info" style={{ padding: '1.25rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                                <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', margin: 0, fontWeight: 600 }}>{vendor.name}</h4>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', backgroundColor: 'rgba(0,0,0,0.4)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                                                    <Star size={12} fill="#C6A75E" color="#C6A75E" />
                                                    <span style={{ color: '#B5B5B5', fontSize: '0.8rem', fontWeight: 600 }}>{vendor.rating}</span>
                                                </div>
                                            </div>
                                            <p style={{ color: '#C6A75E', fontSize: '1.1rem', fontWeight: 700, margin: '0.5rem 0 1rem 0' }}>
                                                ₹{vendor.price.toLocaleString('en-IN')}
                                            </p>
                                            <button 
                                                className="btn"
                                                style={{ 
                                                    width: '100%', 
                                                    display: 'flex', 
                                                    justifyContent: 'center', 
                                                    alignItems: 'center', 
                                                    gap: '0.5rem',
                                                    backgroundColor: isSelected ? 'rgba(198, 167, 94, 0.1)' : 'transparent',
                                                    color: isSelected ? '#C6A75E' : '#FFFFFF',
                                                    border: `1px solid ${isSelected ? '#C6A75E' : 'rgba(255,255,255,0.2)'}`
                                                }}
                                                onClick={() => toggleVendor(vendor.id)}
                                            >
                                                {isSelected ? <><Check size={16}/> Added</> : <><Plus size={16}/> Add to Package</>}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Sticky Bottom Bar for Cart/Budget Tracking */}
            <div className="sticky-cart-bar" style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                background: 'rgba(26, 26, 29, 0.95)',
                backdropFilter: 'blur(10px)',
                borderTop: '1px solid rgba(198,167,94,0.3)',
                padding: '1rem 0',
                zIndex: 100,
                boxShadow: '0 -4px 20px rgba(0,0,0,0.5)'
            }}>
                <div className="container" style={{ padding: '0 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ position: 'relative' }}>
                            <ShoppingCart size={28} color="#FFFFFF" />
                            <span style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                background: '#C6A75E',
                                color: '#121212',
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                borderRadius: '50%',
                                width: '20px',
                                height: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>{selectedVendors.length}</span>
                        </div>
                        <div>
                            <span style={{ display: 'block', fontSize: '0.85rem', color: '#B5B5B5', textTransform: 'uppercase', letterSpacing: '1px' }}>Estimated Total</span>
                            <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 800, color: '#C6A75E' }}>₹{currentTotal.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                    <button 
                        className="btn btn-primary" 
                        disabled={selectedVendors.length === 0}
                        onClick={handleCheckout}
                        style={{
                            backgroundColor: selectedVendors.length > 0 ? '#C6A75E' : '#333',
                            color: selectedVendors.length > 0 ? '#121212' : '#888',
                            border: 'none',
                            opacity: selectedVendors.length > 0 ? 1 : 0.7,
                            cursor: selectedVendors.length > 0 ? 'pointer' : 'not-allowed',
                            padding: '0.8rem 2rem',
                            fontSize: '1rem',
                            fontWeight: 700
                        }}
                    >
                        Review & Book
                    </button>
                </div>
            </div>

            {/* Flight Banner Styles injection */}
            <style>{`
                .flight-banner {
                    background: linear-gradient(135deg, #1A1A1D 0%, #121212 100%);
                    border: 1px solid rgba(198, 167, 94, 0.3);
                    border-radius: 12px;
                    padding: 2rem;
                    margin-bottom: 3rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 2rem;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
                    position: relative;
                    overflow: hidden;
                }
                
                .flight-banner::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle at center, rgba(198, 167, 94, 0.05) 0%, transparent 60%);
                    pointer-events: none;
                }

                .flight-banner-content {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    position: relative;
                    z-index: 1;
                }

                .flight-banner-icon {
                    background: rgba(198, 167, 94, 0.1);
                    padding: 1rem;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid rgba(198, 167, 94, 0.2);
                }

                .flight-banner-title {
                    font-family: var(--font-family-serif);
                    font-size: 1.4rem;
                    color: #FFFFFF;
                    margin-bottom: 0.25rem;
                }

                .flight-banner-desc {
                    color: #B5B5B5;
                    font-size: 0.95rem;
                    line-height: 1.5;
                    max-width: 600px;
                }

                .flight-banner-btn {
                    background-color: transparent;
                    color: #C6A75E;
                    border: 1px solid #C6A75E;
                    white-space: nowrap;
                    position: relative;
                    z-index: 1;
                }

                .flight-banner-btn:hover {
                    background-color: #C6A75E;
                    color: #121212;
                }

                @media (max-width: 768px) {
                    .flight-banner {
                        flex-direction: column;
                        align-items: flex-start;
                        text-align: left;
                    }
                    .flight-banner-btn {
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
};

export default HostCustomize;