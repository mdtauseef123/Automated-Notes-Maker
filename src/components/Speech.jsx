import React from "react";
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import {useState} from "react";
import {jsPDF} from "jspdf";
import pic from "../text-to-speech.png";
import navbar from "./navbar";
import "../App.css";

function Speech(){
    const [textToCopy, setTextToCopy] = useState();
    const [isCursive, setCursive] = useState(false);
    const [isCursive2, setCursive2] = useState(false);
    const [isCursive3, setCursive3] = useState(false);
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration:1000
    });
    function startListening(){
        SpeechRecognition.startListening({ 
                continuous: true,
                language: 'en-IN'
            }
        );
    }
    const {transcript, browserSupportsSpeechRecognition} = useSpeechRecognition();
    if (!browserSupportsSpeechRecognition) {
        return null
    }
    function pdfGenerate(){
        const doc = new jsPDF();
        console.log(doc.getFontList());
        doc.setFont('times', 'italic');
        var strArr = doc.splitTextToSize(transcript, 190);
        doc.text(strArr, 10, 10);  
        console.log(transcript.length);
        doc.save("YourAudio.pdf");
    }
    function imageGenerate() {
        const text = transcript;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 350;
        canvas.height = 400; 
        context.font = '16px Arial';
        context.fillStyle = 'black';
        context.clearRect(0, 0, canvas.width, canvas.height);
        const maxLineWidth = canvas.width - 30; 
        const lines = [];
        let currentLine = '';
        const words = text.split(' ');
        for (const word of words) {
            const testLine = currentLine + (currentLine === '' ? '' : ' ') + word;
            const testLineWidth = context.measureText(testLine).width;
            if (testLineWidth < maxLineWidth) {
                currentLine = testLine;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine); 
        let y = 30; 
        for (const line of lines) {
            context.fillText(line, 10, y);
            y += 20; 
        }
        const dataURL = canvas.toDataURL('image/png');
        const tempLink = document.createElement('a');
        tempLink.href = dataURL;
        tempLink.download = 'text_image.png'; 
        tempLink.click();
    }
    function docsGenerate() {
        const text = transcript;
        const blob = new Blob([text], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sample.doc';
        a.click();
        URL.revokeObjectURL(url);
    }
    const cursive = () => {
      setCursive(!isCursive);
    };
    const font2 = () => {
      setCursive2(!isCursive2);
    };
    const font3 = () => {
      setCursive3(!isCursive3);
    };
    var finalClass = "";
    if(isCursive){
      finalClass = "cursive-font";
    }
    else if(isCursive2){
      finalClass = "cursive-font2";
    }
    else if(isCursive3){
      finalClass = "cursive-font2";
    }
    else{
      finalClass = "main-content";
    }
    
    
    return (
        
        <div className="container">
            <navbar/>
            <img className="img-pic" src={pic}/>
            <h2>Automated Notes Maker</h2>
            <br/>
            <p className="para-start">An Automated Notes Maker which helps in making notes very easy and efficiently.</p>
            <textarea className={finalClass} value={transcript}></textarea>
            {/*<div className="main-content" onClick={() =>  setTextToCopy(transcript)}>
                
            </div>*/}
            
            
            <div className="btn-style">
                <button onClick={startListening}>Start</button>
                <button onClick={SpeechRecognition.stopListening}>Stop</button>
                <button onClick={cursive}>Cursive</button>
                <button onClick={font2}>Fuggles</button>
                <button onClick={font3}>Handlee</button>
                
                
                {/*<button onClick={setCopied}>{isCopied ? 'Copied!' : 'Copy The Text'}</button>
                <button onClick={textToImage}>Download Notes</button>*/}
                <a href="./index.js" style={{textDecoration: 'none'}}><button class="dropbtn">Download</button></a>
                {/*<div class="dropdown">
                    
                    <div class="dropdown-content">
                        <button onClick={imageGenerate}>Image Form</button>
                        <button onClick={docsGenerate}>Docs Form</button>
                        <button onClick={pdfGenerate}>PDF Form</button>
                    </div>
                </div>*/}
            </div>
            
        </div>
    );
}

export default Speech;
