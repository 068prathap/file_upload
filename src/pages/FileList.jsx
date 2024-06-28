import { useEffect, useState } from "react"
import axios from 'axios';

export default function FileList({ setPageNo }) {
    const [file, setFile] = useState();
    const [fileList, setFileList] = useState();

    useEffect(() => async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: 'https://localhost:7025/getFile/1',
                responseType: 'blob'
            });

            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = URL.createObjectURL(blob);
            console.log(url)
            setFile(url)
        } catch (error) {
            console.log(error);
        }

        try {
            const response = await axios.get('https://localhost:7025/getAllFile');
            setFileList(response.data);
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    }, [])

    const downloadFile = async (fileId) => {
        try {
            const response = await axios.get(`https://localhost:7025/getFile/${fileId}`, {
                responseType: 'blob', // Set the response type to 'blob' to handle file data
            });
            const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `file_${fileId}`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    return (
        <>
            <button onClick={() => { setPageNo(1) }}>Upload File</button>
            {/* <img src={file} alt="image" /> */}
            {/* <button onClick={() => { downloadFile(5) }}>Download File</button> */}

            {fileList?.map((fileDetails) => (
                <li key={fileDetails.id}>
                    <a onClick={()=>{downloadFile(fileDetails.id)}}>
                        {fileDetails.fileName}
                    </a>
                </li>
            ))}
        </>
    )
}