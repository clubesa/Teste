
import React from 'react';
import Header from './components/Header';
import ImageGenerator from './components/ImageGenerator';

function App() {
  return (
    <div className="min-h-screen bg-areia text-chocolate font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ImageGenerator />
      </main>
      <footer className="text-center py-4 text-xs text-chocolate/70">
        <p>&copy; {new Date().getFullYear()} LABirintar. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
