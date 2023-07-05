import {
    Box,
    Button,
    Collapse,
    useTheme,
} from '@mui/material';
import { useState } from 'react';
import Form from './Form';

interface NewPostPropsInterface{
    onSubmit: (heading: string, text: string) => void;
}

export default function NewPost(props: NewPostPropsInterface) {
    const [isOpen, setIsOpen] = useState(false);
    const theme = useTheme();

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Box marginBottom={8}>
            <Button onClick={toggleAccordion} variant="contained" sx={{ backgroundColor: theme.palette.info.main }}>
                {isOpen ? 'Avbryt' : 'Lägg till ny händelse'}
            </Button>
            <Collapse in={isOpen}>
                <Form onSubmit={props.onSubmit}/>
            </Collapse>
        </Box>
    );
}
