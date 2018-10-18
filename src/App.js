import React from 'react';
import './App.css';
import BasicEditor from './components/basicEditor';
import LinkedEditorExample from './components/linkEditorExample';
import SupEditorExample from './components/supEditorTest';

const App = () => (
    <div>
    <BasicEditor/>

    <LinkedEditorExample />
        <SupEditorExample />
    </div>

);

export default App;
