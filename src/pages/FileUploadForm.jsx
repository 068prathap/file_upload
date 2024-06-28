import { useState } from "react"
import axios from 'axios';

export default function FileUploadForm({setPageNo}) {
    const [file, setFile] = useState();

    function convertToBlob() {
        const reader = new FileReader();

        reader.onload = async () => {
            const formData = new FormData();
            formData.append('FileName', file.name);
            formData.append('File', new Blob([reader.result], { type: file.type }));
            formData.append('FileType', file.type);

            try {
                const res = await axios({
                    method:'POST',
                    url: 'https://localhost:7025/addFile',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log(res)
            } catch (error) {
                console.log(error);
            }
        };

        reader.readAsArrayBuffer(file);
    }

    return (
        <>
            <input type="file" onChange={(event) => { setFile(event.target.files[0]) }} />
            <button onClick={() => { convertToBlob() }}>submit</button>
            <button onClick={() => { setPageNo(0) }}>Back to list</button>
        </>
    )
}