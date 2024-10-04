import { Modal, message } from "antd";
import { deleteMovie } from "../../api/movie";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";

const DeleteMovieModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedMovie,
  setSelectedMovie,
  getData,
}) => {
  const dispatch = useDispatch();
  const handleOK = async () => {
    try {
      dispatch(showLoading());
      const res = await deleteMovie({ _id: selectedMovie._id });
      if (res?.success) {
        message.success(res?.message);
        getData();
      } else {
        message.error(res?.message);
      }
      setSelectedMovie(null);
      setIsDeleteModalOpen(false);
      dispatch(hideLoading);
    } catch (err) {
      message.error(err.message);
      dispatch(hideLoading);
      setIsDeleteModalOpen(false);
    }
  };
  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedMovie(null);
  };
  return (
    <Modal
      centered
      title="Delete Movie"
      open={isDeleteModalOpen}
      onCancel={handleCancel}
      onOk={handleOK}
    >
      Are you sure you want to delete this movie
    </Modal>
  );
};

export default DeleteMovieModal;
