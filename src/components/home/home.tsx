import { Button, Carousel } from "react-bootstrap";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; // Importa ícones do react-icons
import Icon from "../../assets/images/treino.png";
import { Link } from "react-router-dom";
import { Infousers } from "../../service/infoUser/infoUser";
import { Training } from "../../config/types/types";
import * as D from "./style";
import { useEffect, useState } from "react";
import { Exemplos } from "../../assets/treinos/exemplos";


export const Home = () => {
  const [workouts, setWorkouts] = useState<Training[]>([]);
  const [currentWorkout, setCurrentWorkout] = useState<Training | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("TOKEN");
        if (token) {
          const reqUsers = await Infousers(token);
          if (reqUsers) {
            setWorkouts(reqUsers.Workouts);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const today = new Date().toLocaleDateString("pt-BR", { weekday: "long" });
    const todayWorkout = workouts.find(
      (workout) => workout.dayOfWeek.toLowerCase() === today.toLowerCase()
    );
    setCurrentWorkout(todayWorkout || null); // Usando null como valor padrão
  }, [workouts]);

  return (
    <>
      <D.DivHome className="text-capitalize">
        <Link to="/start"> Voltar </Link>
        {currentWorkout && (
          <D.DivMap>
            <h1>Treino de {currentWorkout.dayOfWeek}</h1>
            <small>clique nas laterais para ver os treinos.</small>
            <p>{currentWorkout.trainingName}</p>
            <Carousel
              interval={null}
              className="carrousel"
              nextIcon={<FiChevronRight className="carousel-control-icon" />}
              prevIcon={<FiChevronLeft className="carousel-control-icon" />}
            >
          {currentWorkout.exercises.map((exercise: any, idx: number) => {
        const exemplo = Exemplos.find((exemplo) => {
            // Converte ambos os nomes para minúsculas e verifica se o nome do exemplo
            // contém uma parte do nome do exercício atual
            return exemplo.nome.toLowerCase().includes(exercise.name.toLowerCase()) ||
            exercise.name.toLowerCase().includes(exemplo.nome.toLowerCase());
 });
        return (
            <Carousel.Item key={idx}>
                <p>
                    {exercise.name} {exercise.series}X{exercise.repetitions}
                </p>
                <D.DivImage>
                {exemplo && <img src={exemplo.foto} className="imgExercicio" alt={exercise.name} />}
                </D.DivImage>
            </Carousel.Item>
        );
    })}
            </Carousel>
            <Button className="shadow rounded-0">
              Iniciar Treino{" "}
              <img
                src={Icon}
                style={{
                  width: "25px",
                  verticalAlign: "middle",
                  marginLeft: "4px",
                }}
              />{" "}
            </Button>
          </D.DivMap>
        )}

        
      </D.DivHome>
    </>
  );
};
