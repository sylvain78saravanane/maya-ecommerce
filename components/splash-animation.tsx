"use client"

import React, { useState, useEffect } from 'react';

interface SplashAnimationProps {
  onComplete: () => void;
}

export default function SplashAnimation({ onComplete }: SplashAnimationProps) {
  const [loaded, setLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Démarrer l'animation après le chargement de la page
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);

    // Marquer l'animation comme terminée après un certain délai
    const completionTimer = setTimeout(() => {
      setAnimationComplete(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(completionTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center overflow-hidden z-50">
      {/* Fond avec motif crochet subtil */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-repeat" style={{ backgroundImage: "url('/placeholder.svg?height=100&width=100')" }}></div>
      </div>
      
      {/* Conteneur d'animation */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Lettres du logo */}
        <div className="flex items-center relative mb-8">
          <span 
            className={`text-7xl md:text-9xl font-bold transition-all duration-1000 ease-in-out ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-16'
            }`}
            style={{ color: '#e07a5f', transitionDelay: '200ms' }}
          >
            M
          </span>
          <span 
            className={`text-7xl md:text-9xl font-bold transition-all duration-1000 ease-in-out ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-16'
            }`}
            style={{ color: '#84a98c', transitionDelay: '400ms' }}
          >
            A
          </span>
          <span 
            className={`text-7xl md:text-9xl font-bold transition-all duration-1000 ease-in-out ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-16'
            }`}
            style={{ color: '#a8dadc', transitionDelay: '600ms' }}
          >
            Y
          </span>
          <span 
            className={`text-7xl md:text-9xl font-bold transition-all duration-1000 ease-in-out ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-16'
            }`}
            style={{ color: '#f5f0e8', transitionDelay: '800ms' }}
          >
            A
          </span>
        </div>
        
        {/* Tagline */}
        <div 
          className={`text-lg md:text-xl text-gray-600 mb-12 transition-all duration-1000 ease-in-out ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          Artisanat Crochet Durable & Élégant
        </div>
        
        {/* Éléments décoratifs - formes de crochet stylisées */}
        <div className="absolute -z-10 opacity-20">
          <div 
            className={`w-64 h-64 rounded-full border-8 border-dashed transition-all duration-1500 ${
              loaded ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-45'
            }`}
            style={{ borderColor: '#e07a5f', transitionDelay: '300ms' }}
          ></div>
        </div>
        
        <div className="absolute -z-10 opacity-20">
          <div 
            className={`w-80 h-80 rounded-full border-8 border-dotted transition-all duration-1500 ${
              loaded ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-45'
            }`}
            style={{ borderColor: '#84a98c', transitionDelay: '600ms' }}
          ></div>
        </div>
        
        {/* Bouton Découvrir */}
        <button
          onClick={onComplete}
          className={`relative px-8 py-3 text-lg font-medium rounded-md transition-all duration-1000 ease-in-out overflow-hidden ${
            loaded && animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ 
            backgroundColor: '#f5f0e8',
            color: '#2f3e46',
            transitionDelay: '1200ms',
          }}
        >
          <span className="relative z-10">Découvrir</span>
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute inset-0 transform transition-transform duration-500 ease-in-out -translate-x-full hover:translate-x-0"
              style={{ backgroundColor: '#e07a5f' }}
            ></div>
          </div>
        </button>
      </div>
      
      {/* Animation de fil de crochet */}
      <div className="absolute bottom-8 w-full flex justify-center">
        <div 
          className={`h-1 bg-gradient-to-r from-transparent via-amber-200 to-transparent transition-all duration-2000 ease-in-out ${
            loaded ? 'w-64 opacity-70' : 'w-0 opacity-0'
          }`}
          style={{ transitionDelay: '800ms' }}
        ></div>
      </div>
    </div>
  );
}