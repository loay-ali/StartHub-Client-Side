'use client';

import { useState } from 'react';
import Preloader from './PreLoader';

export default function PreloaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <main
        className={`transition-opacity duration-700 ease-out ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {children}
      </main>
    </>
  );
}