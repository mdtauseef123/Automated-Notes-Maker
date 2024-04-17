import React, { useState } from 'react';

function AudioToTextConverter() {
  const [transcription, setTranscription] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    
    try {
      const audioURL = URL.createObjectURL(selectedFile);
      const audio = new Audio(audioURL);
      audio.addEventListener('ended', () => {
        const recognition = new window.SpeechRecognition();
        recognition.lang = 'en-IN';
        
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcription;
          
          setTranscription(transcript);
        };
        recognition.start();
        audio.play();
      });
      setAudioFile(selectedFile);
    } 
    catch (error) {
      
      console.error('Error converting audio to text:', error);
    }
  };
  console.log();
  return (
    <div>
      <h1>Audio to Text Converter</h1>
      <input type="file" accept=".mp3, .wav" onChange={handleFileChange} />
      
      <div>
        <h2>Transcription:</h2>
        <p>{transcription}</p>
      </div>
    </div>
  );
}

export default AudioToTextConverter;
