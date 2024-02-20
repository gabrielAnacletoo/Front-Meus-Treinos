import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Training } from "../../config/types/types";
import { FindAllWorkouts } from "../../service/editWorkout/editWorkout";

export const EditWorkout = () => {
  const [workouts, setWorkouts] = useState<Training[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("TOKEN");
        if (token) {
          const reqUsers = await FindAllWorkouts(token);
          if (reqUsers) {
            const sortedWorkouts = reqUsers.data.sort(sortByDayOfWeek);
            setWorkouts(sortedWorkouts);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  const sortByDayOfWeek = (a: Training, b: Training) => {
    const daysOfWeekOrder = [
      "segunda-feira",
      "terça-feira",
      "quarta-feira",
      "quinta-feira",
      "sexta-feira",
      "sábado",
      "domingo",
    ];

    return (
      daysOfWeekOrder.indexOf(a.dayOfWeek) -
      daysOfWeekOrder.indexOf(b.dayOfWeek)
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? workouts.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === workouts.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div>
        <Link to="/start">Voltar</Link>
        <h1>Editar Treinos:</h1>

        {workouts.length > 0 && (
          <>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>
                  {workouts[currentIndex].trainingName}{" "}
                  <Button variant="link">Editar</Button>
                </Card.Title>
                <Card.Text>
                  <span>{workouts[currentIndex].dayOfWeek}</span> <br />
                  {workouts[currentIndex].exercises.map((exercicio, index) => (
                    <div key={index}>
                      <span>
                        {exercicio.name} {exercicio.series}X
                        {exercicio.repetitions}{" "}
                      </span>
                    </div>
                  ))}
                </Card.Text>
                <div>
                  <Button onClick={handlePrevious}>Anterior</Button>
                  <Button onClick={handleNext}>Próximo</Button>
                </div>
              </Card.Body>
            </Card>
          </>
        )}
      </div>
    </>
  );
};
