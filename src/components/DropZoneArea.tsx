import Button from "@mui/material/Button";

export default function DropZoneArea() {
    const uploadFile = () => {
        
    }
    return (
        <>
            <input type="file"/>
            <Button onClick={uploadFile}>Ladda upp fil</Button>
        </>
    )
}