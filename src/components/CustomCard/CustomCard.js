import { useContext } from "react";
import { Card, CardImg, Button } from "react-bootstrap";
import CustomModal from "../CustomModal/CustomModal";
import "./style.css";
import { Context as AuthContext } from "../../context/AuthContext";

const CustomCard = (props) => {
    const { title, description, subTitle, image, language, _id, url } = props;
    const { state: { logged }, add_favourite } = useContext(AuthContext);

    const AddFavorites = () => {
        add_favourite(_id);
    }
    return (
        <Card className="shadow-sm p-3 mb-5 bg-white rounded">
            <div id="imgCard">
                <CardImg variant="top" src={image} alt="image of repositorie" />
            </div>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <div className="mb-2 text-muted card-subtitle h6">{subTitle}</div>
                <div className="card-text">{description}</div>
            </div>
            <div className="card-body d-flex justify-content-end align-items-end">
                <CustomModal url={url.replace(/(git:\/\/)?/i, "https://")} title={title} description={description} img={image} language={language} subTitle={subTitle} />
                <Button onClick={AddFavorites} variant={logged.favourites.includes(_id) ? "warning" : "primary"}>Star</Button>
            </div>
        </Card>
    )
}

export default CustomCard;
