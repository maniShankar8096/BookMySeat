import { Table, Button } from "antd";
import MovieForm from "./MovieForm";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import { getAllMovies } from "../../api/movie";
import { useDispatch } from "react-redux";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import DeleteMovieModal from "./DeleteMovieModal";

const MovieList = () => {
  const FakeMovies = [
    {
      key: "1",
      poster: "Image1",
      title: "Mastaney",
      description:
        "Set in 1739, Nadar Shah`s undefeated army was attacked by Sikh Rebellions. ",
      duration: 120,
      genre: "Action",
      language: "Hindi",
      releaseDate: "2023-10-25",
    },
    {
      key: "2",
      poster: "Image2",
      title: "Mastaney",
      description:
        "Set in 1739, Nadar Shah`s undefeated army was attacked by Sikh Rebellions. ",
      duration: 120,
      genre: "Action",
      language: "Hindi",
      releaseDate: "2023-10-25",
      action: "Delete",
    },
  ];
  const tableHeadings = [
    {
      title: "Poster",
      dataIndex: "poster",
      render: (text, data) => {
        return (
          <img
            width="75"
            height="115"
            style={{ objectFit: "cover" }}
            src={text}
          />
        );
      },
    },
    {
      title: "Movie Name",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      render: (text) => {
        return `${text} Mins`;
      },
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (text, data) => {
        return moment(data.releaseDate).format("DD-MM-YYYY");
      },
    },
    {
      title: "Action",
      render: (text, data) => {
        return (
          <div>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setSelectedMovie(data);
                setFormType("edit");
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedMovie(data);
              }}
            >
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movies, setMovies] = useState(FakeMovies);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formType, setFormType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();

  const getData = async () => {
    dispatch(showLoading());
    const res = await getAllMovies();
    const allMovies = res?.data;
    setMovies(
      allMovies?.map((mov) => {
        return { ...mov, key: `movie${mov._id}` };
      })
    );
    dispatch(showLoading());
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="d-flex justify-content-end">
      <Button
        onClick={() => {
          setIsModalOpen(true);
          setFormType("add");
        }}
      >
        Add Movie
      </Button>
      <Table dataSource={movies} columns={tableHeadings} />
      {isModalOpen && (
        <MovieForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedMovie={selectedMovie}
          formType={formType}
          setSelectedMovie={setSelectedMovie}
          getData={getData}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteMovieModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          getData={getData}
        />
      )}
    </div>
  );
};

export default MovieList;
