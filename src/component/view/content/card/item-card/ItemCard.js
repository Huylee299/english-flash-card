import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useRef, useState } from "react";

const ItemCard = (props) => {
    const { description, img, id, uploadCard, deleteCard, editCard, cancelAddCard } = props;
    const [isEdit, setIsEdit] = useState(false);
    const [cardDescription, setCardDescription] = useState(null);
    const [cardImage, setCardImage] = useState(null);
    const inputFileRef = useRef(null);

    const handleChange = () => {
        description ? isEdit ? handleEditCard() : setIsEdit(true) : uploadCard(cardImage, cardDescription);
    }

    const handleEditCard = () => {
        editCard(cardImage ? cardImage : img, cardDescription ? cardDescription : description, id, true);
        setIsEdit(false);
    }

    const handleDelete = () => {
        description ? isEdit ? setIsEdit(false) : deleteCard(id) : cancelAddCard();
    }

    const handleChangeImage = () => {
        if (isEdit)
            inputFileRef.current.click();
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            {
                img ? (
                    <>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={cardImage == null ? img : URL.createObjectURL(cardImage)}
                            onClick={handleChangeImage}
                        />
                        <input ref={inputFileRef} style={{ display: "none" }} type="file" onChange={(e) => setCardImage(e.target.files[0])} />
                    </>
                )
                    :
                    (
                        <>
                            {cardImage ? (<CardMedia
                                sx={{ height: 140 }}
                                image={cardImage == null ? img : URL.createObjectURL(cardImage)}
                                onClick={handleChangeImage}
                            />) : null}
                            <input type="file" onChange={(e) => setCardImage(e.target.files[0])} />
                        </>

                    )
            }

            <CardContent>
                {
                    isEdit ?
                        (<input type="text" value={cardDescription == null ? description : cardDescription} onChange={(e) => setCardDescription(e.target.value)} />) :
                        description ? (
                            <Typography variant="body2" color="text.secondary">
                                {description}
                            </Typography>)
                            : (
                                <input type="text" onChange={(e) => setCardDescription(e.target.value)} />
                            )
                }

            </CardContent>
            <CardActions>
                <Button onClick={handleChange} size="small">{description ? isEdit ? "Save" : "Edit" : "Add"}</Button>
                <Button onClick={handleDelete} size="small">{description ? isEdit ? "Cancel" : "Delete" : "Cancel"}</Button>
            </CardActions>
        </Card>
    )
}

export default ItemCard;