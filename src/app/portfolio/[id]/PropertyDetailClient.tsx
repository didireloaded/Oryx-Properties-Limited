"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Map, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, ArrowLeft, Download, FileText, Phone, Building2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

export default function PropertyDetailClient({ property }: { property: any }) {
  // Demo coordinates since DB only has basic info
  const coords = { lat: -22.5609, lng: 17.0836 };

  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', paddingTop: '80px', paddingBottom: '4rem' }}>
      
      {/* 1. HEADER / GALLERY HERO */}
      <section style={{ position: 'relative', height: '60vh', marginBottom: '4rem' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src={property.image || '/images/portfolio/placeholder.jpg'} alt={property.name} fill style={{ objectFit: 'cover' }} priority />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,20,35,1) 0%, rgba(15,20,35,0.2) 100%)' }} />
        </div>
        
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
              <div className="glass-panel-10" style={{ padding: '1.5rem', borderRadius: '8px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Asset Type</div>
                <div style={{ fontSize: '1.25rem', color: 'var(--text-light)', fontWeight: 500 }}>{property.type}</div>
              </div>
              <div className="glass-panel-10" style={{ padding: '1.5rem', borderRadius: '8px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Status</div>
                <div style={{ fontSize: '1.25rem', color: 'var(--text-light)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={18} color="#10B981" /> Active
                </div>
              </div>
              <div className="glass-panel-10" style={{ padding: '1.5rem', borderRadius: '8px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Location</div>
                <div style={{ fontSize: '1.25rem', color: 'var(--text-light)', fontWeight: 500 }}>{property.location}</div>
              </div>
              <div className="glass-panel-10" style={{ padding: '1.5rem', borderRadius: '8px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Leasing</div>
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
            <div className="glass-panel-10" style={{ padding: '2rem', borderRadius: '12px', position: 'sticky', top: '100px' }}>
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

              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-light)', fontWeight: 300, marginTop: '3rem', marginBottom: '1.5rem' }}>Documentation</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'var(--text-light)', cursor: 'pointer', textAlign: 'left' }} className="hover:border-accent-gold transition-colors">
                  <FileText size={20} color="var(--accent-gold)" />
                  <span style={{ flex: 1, fontSize: '0.875rem' }}>Property Brochure</span>
                  <Download size={16} color="var(--text-muted)" />
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </section>
      
    </div>
  );
}
