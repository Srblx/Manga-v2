import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { User } from "../interfaces/LoginSignUp.interface";
import { NewsModel } from "../interfaces/NewsModel.interface";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "#FF0001",
};

type LikedNewsModalProps = {
  open: boolean;
  handleClose: () => void;
  user: User | null;
  likedNews: NewsModel[] | undefined;
};

const LikedNewsModal = ({
  open,
  handleClose,
  likedNews,
  user, // pas besoin de cette props, préférer utiliser  const user = useContext(UserContext);
}: LikedNewsModalProps) => {
  
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          fontSize={30}
          color={"white"}
        >
          News loved by {user?.firstname} {user?.lastname}
        </Typography>
        <div id="modal-modal-description" style={{ marginTop: 2 }}>
          {likedNews?.map((news) => (
            <p key={news.id}>{news.title}</p>
          ))}
        </div>
      </Box>
    </Modal>
  );
};

export default LikedNewsModal;
