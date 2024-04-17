import React from 'react';
import ReactDOM from 'react-dom/client';
import Speech from "./components/Speech";
import AudioToTextConverter from "./components/Audio";
import {BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Speech/>
);