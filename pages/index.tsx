import { config } from 'dotenv';
import { TranslateBody } from '@/types/types';
import { CodeBlock } from '@/components/CodeBlock';
import { LanguageSelect } from '@/components/LanguageSelect';
import { ModelSelect } from '@/components/ModelSelect';
import { TextBlock } from '@/components/TextBlock';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  const [inputLanguage, setInputLanguage] = useState<string>('JavaScript');
  const [outputLanguage, setOutputLanguage] = useState<string>('Python');
  const [inputCode, setInputCode] = useState<string>('');
  const [outputCode, setOutputCode] = useState<string>('');
  const [model, setModel] = useState<OpenAIModel>('gpt-3.5-turbo');
  const [loading, setLoading] = useState<boolean>(false);
  const [hasTranslated, setHasTranslated] = useState<boolean>(false);

  const handleTranslate = async () => {
    const maxCodeLength = model === 'gpt-3.5-turbo' ? 6000 : 12000;

    if (inputLanguage === outputLanguage) {
      alert('Veuillez sélectionner différentes langues.');
      return;
    }

    if (!inputCode) {
      alert('Veuillez saisir un code.');
      return;
    }

    if (inputCode.length > maxCodeLength) {
      alert(
        `Veuillez saisir le code de moins de ${maxCodeLength} caractères. Vous êtes actuellement à ${inputCode.length} caractères.`
      );
      return;
    }

    setLoading(true);
    setOutputCode('');

    // Créez un objet de type TranslateBody avec toutes les propriétés requ
const translateBody: TranslateBody = {
modal
inputLanguage,
outputLanguage,
code_entrée
};
try {
  const response = await fetch('/api/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(translateBody)
  });

  const { code }: { code: string } = await response.json();
  setOutputCode(code);
  setHasTranslated(true);
} catch (error) {
  console.error('Erreur lors de la traduction :', error);
} finally {
  setLoading(false);
}
};

const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
setInputCode(e.target.value);
poser

useEffect(() => {
if (hasTranslated) {
document.execCommand('copie');
}
},

    const data = response.body;

    if (!data) {
      setLoading(false);
      alert('Something went wrong.');
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let code = '';

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      code += chunkValue;

      setOutputCode((prevCode) => prevCode + chunkValue);
    }

    setLoading(false);
    setHasTranslated(true);
    copyToClipboard(code);
  };

  const copyToClipboard = (text: string) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  useEffect(() => {
    if (hasTranslated) {
      handleTranslate();
    }
  }, [outputLanguage]);

  return (
    <>
      <Head>
        <title>Clever Code Translator</title>
        <meta
          name="description"
          content="Use AI to translate code from one language to another."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-full min-h-screen flex-col items-center bg-[#0E1117] px-4 pb-20 text-neutral-200 sm:px-10">
        <div className="mt-10 flex flex-col items-center justify-center sm:mt-30">
          <div className="text-4xl font-bold">Clever Code Translator</div>
        </div>

        <div className="mt-2 flex items-center space-x-2">
  <ModelSelect model={model} onChange={(value) => setModel(value)} />

  
</div>

<div className="mt-2 text-center text-xs">
  {loading
    ? 'Translating...'
    : hasTranslated
    ? 'Output copied to clipboard!'
    : 'Enter some code and click "Translate"'}
</div>

        <div className="mt-6 flex w-full max-w-[1200px] flex-col justify-between sm:flex-row sm:space-x-4">
          <div className="h-100 flex flex-col justify-center space-y-2 sm:w-2/4">
            <div className="text-center text-xl font-bold">Input</div>

            <LanguageSelect
              language={inputLanguage}
              onChange={(value) => {
                setInputLanguage(value);
                setHasTranslated(false);
                setInputCode('');
                setOutputCode('');
              }}
            />

            {inputLanguage === 'Natural Language' ? (
              <TextBlock
                text={inputCode}
                editable={!loading}
                onChange={(value) => {
                  setInputCode(value);
                  setHasTranslated(false);
                }}
              />
            ) : (
              <CodeBlock
                code={inputCode}
                editable={!loading}
                onChange={(value) => {
                  setInputCode(value);
                  setHasTranslated(false);
                }}
              />
            )}
          </div>
 <button
    className="w-[200px] h-[50px] mt-60 cursor-pointer rounded-md bg-violet-500 px-4 py-1 font-bold hover:bg-violet-600 active:bg-violet-700"
    onClick={() => handleTranslate()}
    disabled={loading}
>
    {loading ? 'Translating...' : 'Translate'}
</button>





          


<div className="mt-8 flex h-full flex-col justify-center space-y-2 sm:mt-0 sm:w-2/4">
          <div className="text-center text-xl font-bold">Output</div>

            <LanguageSelect
              language={outputLanguage}
              onChange={(value) => {
                setOutputLanguage(value);
                setOutputCode('');
              }}
            />

            {outputLanguage === 'Natural Language' ? (
              <TextBlock text={outputCode} />
            ) : (
              <CodeBlock code={outputCode} />
            )}
          </div>
        </div>
   
  </div>
  <div className="flex h-full min-h-0 flex-col items-center bg-[#0E1117] px-14 pb-20 text-neutral-200 sm:px-100">
    <nav className="space-x-8">
      <a href="#" className="hover:underline">
        Tutoriels
      </a>
      <a href="#" className="hover:underline">
        Cours
      </a>
      <a href="#" className="hover:underline">
        Exercices
      </a>
      <a href="#" className="hover:underline">
        Forum
      </a>
      <a href="#" className="hover:underline">
        Foire aux questions
      </a>
      <a href="#" className="hover:underline">
        Contactez-nous
      </a>
      <a href="#" className="hover:underline">
        À propos
      </a>
      <a href="#" className="hover:underline">
        Mentions légales
      </a>
    </nav>
  
</div>
</>

);
}
