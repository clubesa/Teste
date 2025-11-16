
import React, { useState, useCallback, useEffect } from 'react';
import { generateImages } from '../services/geminiService';
import type { AspectRatio } from '../types';
import Spinner from './Spinner';

const promptExamples = [
  "Crianças construindo um pequeno robô de madeira em uma oficina de marcenaria ensolarada.",
  "Um drone voando em um ginásio escolar entregando um livro para um estudante.",
  "Alunos em uma aula de circo, aprendendo a fazer malabarismo com lenços coloridos.",
  "Um grupo diverso de estudantes colaborando em um projeto de cidade sustentável com materiais reciclados.",
  "Uma menina programando um robô em um tablet, com o robô desenhando em um papel no chão.",
  "Arte abstrata vibrante representando a criatividade e o aprendizado na educação integral.",
];

// Helper component defined outside the main component body to prevent re-creation on re-renders.
const AspectRatioButton: React.FC<{ value: AspectRatio; current: AspectRatio; onClick: (value: AspectRatio) => void; children: React.ReactNode; }> = ({ value, current, onClick, children }) => {
  const isActive = value === current;
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hortencia ${
        isActive
          ? 'bg-goiaba text-white shadow-md'
          : 'bg-white text-chocolate hover:bg-lavanda/50 border border-lavanda/50'
      }`}
    >
      {children}
    </button>
  );
};

const ImageGenerator: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [placeholder, setPlaceholder] = useState('');

    useEffect(() => {
        setPlaceholder(promptExamples[Math.floor(Math.random() * promptExamples.length)]);
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) {
            setError('Por favor, insira uma descrição para a imagem.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedImages([]);

        try {
            const images = await generateImages(prompt, aspectRatio);
            if (images.length === 0) {
                setError('Não foi possível gerar imagens. Tente uma descrição diferente.');
            } else {
                setGeneratedImages(images);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
        } finally {
            setIsLoading(false);
        }
    }, [prompt, aspectRatio]);

    return (
        <div className="max-w-4xl mx-auto bg-creme p-6 sm:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-2 text-chocolate">Gerador de Imagens IA</h2>
            <p className="text-center mb-6 text-chocolate/80">Dê vida às suas ideias pedagógicas. Descreva a cena que você imagina.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="prompt" className="block text-sm font-bold mb-2 text-chocolate">
                        Descrição da Imagem
                    </label>
                    <textarea
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={placeholder}
                        rows={4}
                        className="w-full p-4 border-2 border-lavanda/60 rounded-lg bg-white/50 focus:ring-2 focus:ring-hortencia focus:border-hortencia transition-colors duration-200 placeholder:text-chocolate/50"
                        disabled={isLoading}
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-bold mb-3 text-chocolate">
                        Proporção da Imagem
                    </label>
                    <div className="flex flex-wrap gap-2">
                        <AspectRatioButton value="1:1" current={aspectRatio} onClick={setAspectRatio}>Quadrado (1:1)</AspectRatioButton>
                        <AspectRatioButton value="16:9" current={aspectRatio} onClick={setAspectRatio}>Paisagem (16:9)</AspectRatioButton>
                        <AspectRatioButton value="9:16" current={aspectRatio} onClick={setAspectRatio}>Retrato (9:16)</AspectRatioButton>
                        <AspectRatioButton value="4:3" current={aspectRatio} onClick={setAspectRatio}>Clássico (4:3)</AspectRatioButton>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full flex items-center justify-center bg-goiaba text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all duration-200 disabled:bg-goiaba/50 disabled:cursor-not-allowed transform hover:scale-105"
                    disabled={isLoading}
                >
                    {isLoading ? 'Gerando...' : '✨ Gerar Imagens'}
                </button>
            </form>

            <div className="mt-8 min-h-[256px] flex items-center justify-center">
                {isLoading && <Spinner />}
                {error && <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{error}</div>}
                
                {!isLoading && !error && generatedImages.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        {generatedImages.map((src, index) => (
                            <div key={index} className="bg-white p-2 rounded-lg shadow-md transition-transform hover:scale-105">
                                <img src={src} alt={`Imagem gerada ${index + 1}`} className="w-full h-auto object-cover rounded-md" />
                            </div>
                        ))}
                    </div>
                )}
                 {!isLoading && !error && generatedImages.length === 0 && (
                    <div className="text-center text-chocolate/60">
                        <p>Suas imagens aparecerão aqui.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageGenerator;
