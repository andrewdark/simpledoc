import {ChangeEvent, FC, useRef} from "react";

interface FileUploadProps {
    setFile: Function;
    accept: string;
    children: React.ReactNode;
}

export const FileUpload: FC<FileUploadProps> = ({setFile, accept, children}) => {
    const ref = useRef<HTMLInputElement>(null);

    const onChange = (e:ChangeEvent<HTMLInputElement>) => {
        // e.target.files - це FileList
        const fileList = e.target.files;

        // Перевіряємо, що файл був вибраний
        if (fileList && fileList.length > 0) {
            // selectedFile має тип 'File'
            const selectedFile: File = fileList[0];
            setFile(selectedFile);
        }
    }

    return (<div onClick={()=>ref.current?.click()}>
        <input type="file" accept={accept} style={{display:"none"}} ref={ref} onChange={onChange}/>
        {children}
    </div>);
}
