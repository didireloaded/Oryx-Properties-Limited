"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('react-map-gl/mapbox'), { ssr: false });
import { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, ArrowLeft, Download, FileText, Phone, Building2, CheckCircle2, Maximize2, X, ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

export default function PropertyDetailClient({ property }: { property: any }) {
  const coords = property.coordinates || { lat: -22.5609, lng: 17.0836 };
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const images = property.gallery && property.gallery.length > 0 ? property.gallery : (property.image ? [property.image] : []);

  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', paddingTop: '80px', paddingBottom: '4rem' }}>
      
      {/* 1. HEADER / GALLERY HERO */}
      <section style={{ position: 'relative', height: '60vh', marginBottom: '4rem' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          {property.image ? (
            <Image src={property.image} alt={property.name} fill style={{ objectFit: 'cover' }} priority />
          ) : (
            <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--bg-card)' }} />
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,20,35,1) 0%, rgba(15,20,35,0.2) 100%)' }} />
        </div>
        
        {images.length > 0 && (
          <button onClick={() => setGalleryOpen(true)} style={{ position: 'absolute', right: '2rem', bottom: '2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', backgroundColor: 'rgba(255,255,255,0.1)', padding: '0.75rem 1.5rem', borderRadius: '100px', border: '1px solid var(--border-glass)', backdropFilter: 'blur(10px)', cursor: 'pointer', zIndex: 20 }} className="hover:bg-white/20">
            <Maximize2 size={18} /> View Gallery
          </button>
        )}
        
        <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', zIndex: 10 }}>
          <Link href="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', textDecoration: 'none', marginBottom: '2rem', width: 'fit-content', padding: '0.5rem 1rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '100px', backdropFilter: 'blur(10px)' }} className="hover:bg-white/20 transition-colors">
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
          <div style={{ display: 'inline-block', backgroundColor: 'var(--accent-gold)', color: '#0F172A', padding: '4px 12px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem', width: 'fit-content' }}>
            {property.type}
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--text-light)', marginBottom: '1rem', lineHeight: 1.1 }}>
            {property.name}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '1.25rem', marginBottom: '2rem' }}>
            <MapPin size={20} color="var(--accent-gold)" /> {property.location}
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT GRID */}
      <section className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem' }}>
          
          {/* LEFT: Details */}
          <div>
            <h2 style={{ fontSize: '2rem', color: 'var(--text-light)', fontWeight: 300, marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Property Overview</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '3rem' }}>
              {property.description || `${property.name} is a premium ${property.type.toLowerCase()} property located in ${property.location}. It forms a core part of the Oryx Properties portfolio, offering exceptional value and strategic positioning.`}
            </p>

            <h2 style={{ fontSize: '2rem', color: 'var(--text-light)', fontWeight: 300, marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Property Facts</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
              <div className="glass-panel-25" style={{ padding: '1.5rem', borderRadius: '8px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Asset Class</div>
                <div style={{ fontSize: '1.25rem', color: 'var(--text-light)', fontWeight: 500 }}>{property.type}</div>
              </div>
              <div className="glass-panel-25" style={{ padding: '1.5rem', borderRadius: '8px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Occupancy</div>
                <div style={{ fontSize: '1.25rem', color: 'var(--text-light)', fontWeight: 500 }}>{property.occupancy || '98%'}</div>
              </div>
              <div className="glass-panel-25" style={{ padding: '1.5rem', borderRadius: '8px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>GLA</div>
                <div style={{ fontSize: '1.25rem', color: 'var(--text-light)', fontWeight: 500 }}>{property.gla || '24,500m²'}</div>
              </div>
              <div className="glass-panel-25" style={{ padding: '1.5rem', borderRadius: '8px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Property Manager</div>
                <div style={{ fontSize: '1.25rem', color: 'var(--text-light)', fontWeight: 500 }}>{property.manager || 'Oryx Management'}</div>
              </div>
              <div className="glass-panel-25" style={{ padding: '1.5rem', borderRadius: '8px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Location</div>
                <div style={{ fontSize: '1.25rem', color: 'var(--text-light)', fontWeight: 500 }}>{property.location}</div>
              </div>
              <div className="glass-panel-25" style={{ padding: '1.5rem', borderRadius: '8px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Availability</div>
                <div style={{ fontSize: '1.25rem', color: 'var(--text-light)', fontWeight: 500 }}>
                  {property.isLeasing ? 'Units Available' : 'Fully Let'}
                </div>
              </div>
            </div>

            <h2 style={{ fontSize: '2rem', color: 'var(--text-light)', fontWeight: 300, marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Location</h2>
            <div style={{ height: '400px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-glass)' }}>
              <Map
                longitude={coords.lng}
                latitude={coords.lat}
                zoom={14}
                mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
                mapboxAccessToken={MAPBOX_TOKEN}
              >
                <Marker longitude={coords.lng} latitude={coords.lat} anchor="bottom">
                  <div style={{ backgroundColor: 'var(--accent-gold)', padding: '8px', borderRadius: '50%', boxShadow: '0 0 20px rgba(183,138,45,0.5)' }}>
                    <Building2 size={20} color="#0F172A" />
                  </div>
                </Marker>
              </Map>
            </div>
          </div>

          {/* RIGHT: Sidebar */}
          <div>
            <div className="glass-panel-25" style={{ padding: '2rem', borderRadius: '12px', position: 'sticky', top: '100px' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-light)', fontWeight: 300, marginBottom: '1.5rem' }}>Leasing Enquiries</h3>
              
              {property.isLeasing ? (
                <>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                    There are currently units available for lease at this property. Contact our leasing team for floor plans and rates.
                  </p>
                  <Link href="/leasing" className="btn-primary" style={{ display: 'block', textAlign: 'center', width: '100%', marginBottom: '1rem' }}>
                    View Available Units
                  </Link>
                </>
              ) : (
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  This property is currently fully let. Contact us to be placed on the waiting list.
                </p>
              )}
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <a href="tel:+26461423201" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-light)', textDecoration: 'none' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Phone size={18} color="var(--accent-gold)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Call Leasing</div>
                    <div style={{ fontWeight: 500 }}>+264 61 423 201</div>
                  </div>
                </a>
              </div>

              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-light)', fontWeight: 300, marginTop: '3rem', marginBottom: '1.5rem' }}>Downloads</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                  <div style={{ width: '60px', height: '80px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText size={24} color="var(--accent-gold)" />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ color: 'var(--text-light)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>Property Brochure</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>PDF • 2.4 MB</div>
                    <button style={{ background: 'none', border: 'none', color: 'var(--accent-gold)', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: 0 }}><Download size={14} /> Download</button>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                  <div style={{ width: '60px', height: '80px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText size={24} color="var(--accent-gold)" />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ color: 'var(--text-light)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>Floor Plans</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>PDF • 1.1 MB</div>
                    <button style={{ background: 'none', border: 'none', color: 'var(--accent-gold)', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: 0 }}><Download size={14} /> Download</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>
      
    </div>

      {/* GALLERY MODAL */}
      {galleryOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, backgroundColor: 'rgba(15,20,35,0.95)', display: 'flex', flexDirection: 'column', backdropFilter: 'blur(20px)' }}>
          <div style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ color: 'var(--text-light)', fontSize: '1.25rem' }}>{currentImage + 1} / {images.length}</div>
            <button onClick={() => setGalleryOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer' }}>
              <X size={32} />
            </button>
          </div>
          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button onClick={() => setCurrentImage((prev) => (prev > 0 ? prev - 1 : images.length - 1))} style={{ position: 'absolute', left: '2rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'var(--text-light)', padding: '1rem', borderRadius: '50%', cursor: 'pointer', zIndex: 10 }} className="hover:bg-white/20">
              <ChevronLeft size={32} />
            </button>
            <div style={{ position: 'relative', width: '80vw', height: '80vh' }}>
              <Image src={images[currentImage]} alt="Gallery" fill style={{ objectFit: 'contain' }} />
            </div>
            <button onClick={() => setCurrentImage((prev) => (prev < images.length - 1 ? prev + 1 : 0))} style={{ position: 'absolute', right: '2rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'var(--text-light)', padding: '1rem', borderRadius: '50%', cursor: 'pointer', zIndex: 10 }} className="hover:bg-white/20">
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
