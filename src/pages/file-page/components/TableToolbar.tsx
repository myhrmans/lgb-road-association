import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { alpha, Button, Fab, IconButton, Toolbar, Tooltip, Typography, useTheme } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { UserAuth } from '../../../common/contexts/AuthContext';
import { Data } from '../../../common/types/Types';
import { createData } from '../../../pages/file-page/FilePage';
import UploadIcon from '@mui/icons-material/Upload';

interface EnhancedTableToolbarProps {
    numSelected: number;
    selected: readonly string[];
    setSelected: Dispatch<SetStateAction<readonly string[]>>;
    rows: Data[];
    setRows: Dispatch<SetStateAction<Data[]>>;
}

export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected, rows, setRows, selected, setSelected } = props;
    const { deleteFile, uploadFile } = UserAuth();
    const theme = useTheme();

    const handleDelete = () => {
        const promises = selected.map((selectedRow) => deleteFile(selectedRow));

        Promise.all(promises).then(() => {
            const remaningRows = rows.filter((row) => {
                return !selected.includes(row.fileName);
            });
            setRows(remaningRows);
        });
        setSelected([]);
    };

    const handleUpload = async (fileList: FileList | null) => {
        if (fileList == null) return;

        let newFiles: Data[] = [];
        const promises = Array.from(fileList).map((file) => uploadFile(file));

        await Promise.all(promises).then((result) => {
            result.forEach((file) => {
                const metadata = file!.metadata;

                const data = createData(
                    metadata.name,
                    `${new Date(metadata.timeCreated).toLocaleString()}`,
                    metadata.contentType ?? '',
                    metadata?.size,
                    ''
                );
                newFiles.push(data);
            });
            setRows(rows.concat(newFiles));
        });
    };

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
                    {numSelected} {numSelected == 1 ? 'fil vald' : 'filer valda'}
                </Typography>
            ) : (
                <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                    Filer
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Radera">
                    <IconButton onClick={() => handleDelete()}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Ladda upp">
                    {
                        <Button
                            variant="outlined"
                            component="label"
                            endIcon={<UploadIcon />}
                            color="secondary"
                            sx={{ mt: 2, width: '160px' }}
                        >
                            Ladda upp
                            <input
                                type="file"
                                hidden
                                onChange={(event) => {
                                    handleUpload(event.target.files);
                                }}
                            />
                        </Button>
                    }
                </Tooltip>
            )}
        </Toolbar>
    );
}
