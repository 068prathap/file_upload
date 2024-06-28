import './App.css';
import FileUploadForm from './pages/FileUploadForm';
import FileList from './pages/FileList';
import { useState } from 'react';

function App() {
    const [pageNo,setPageNo]=useState(0);

    return (
        <>
            {pageNo===0 ? <FileList setPageNo={setPageNo}/> : <FileUploadForm setPageNo={setPageNo}/>}
        </>
    );
}

export default App;
