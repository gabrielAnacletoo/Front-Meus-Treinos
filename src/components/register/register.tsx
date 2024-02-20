import { useState } from "react";
import * as D from "./style";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RegisterWorkout } from "../../service/registerWorkout/registerWorkout";
import { Training } from "../../config/types/types";
import { Exercise } from "../../config/types/types";

export const Register = () => {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [tempTraining, setTempTraining] = useState<Training>({
    trainingName: "",
    dayOfWeek: "",
    exercises: [{ name: "", series: "", repetitions: "" }],
  });
  const [showMessage, setShowMessage] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddExercise = () => {
    setTempTraining({
      ...tempTraining,
      exercises: [
        ...tempTraining.exercises,
        { name: "", series: "", repetitions: "" },
      ],
    });
  };

  const handleRemoveExercise = (index: number) => {
    const newExercises = [...tempTraining.exercises];
    newExercises.splice(index, 1);
    setTempTraining({
      ...tempTraining,
      exercises: newExercises,
    });
  };

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const newExercises = [...tempTraining.exercises];
    newExercises[index][name as keyof Exercise] = value;
    setTempTraining({
      ...tempTraining,
      exercises: newExercises,
    });
  };

  const isExerciseComplete = (exercise: Exercise) => {
    return (
      exercise.name.trim() !== "" &&
      exercise.series.trim() !== "" &&
      exercise.repetitions.trim() !== ""
    );
  };

  const handleSave = async () => {
    if (!tempTraining.trainingName.trim() || !tempTraining.dayOfWeek.trim()) {
      alert("Por favor, preencha o nome do treino e o dia da semana.");
      return;
    }
    const completeExercises = tempTraining.exercises.filter(isExerciseComplete);
    if (completeExercises.length === 0) {
      alert(
        "Você precisa preencher pelo menos um exercício completo para salvar."
      );
      return;
    }
    try {
      setTrainings([...trainings, tempTraining]);
      setTempTraining({
        trainingName: "",
        dayOfWeek: "",
        exercises: [{ name: "", series: "", repetitions: "" }],
      });
      setLoading(true);
      if (localStorage.getItem("TOKEN")) {
        const token = String(localStorage.getItem("TOKEN"));
        const registerWorkout = await RegisterWorkout(token, tempTraining);

        if (registerWorkout?.success) {
          setShowMessage(true);
        } else {
          setShowMessage(false);
          setErrorMessage(`${registerWorkout?.message}`);
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
        }
      }
    } catch (error) {
      console.log("erro", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <D.DivRegister>
        <Link to="/start" className="voltar">Voltar</Link>
        <label>Nome do treino</label>
        <input
          className="inputText"
          type="text"
          placeholder="Ex.: Treino de tríceps"
          value={tempTraining.trainingName}
          onChange={(e) =>
            setTempTraining({ ...tempTraining, trainingName: e.target.value })
          }
        />

        <label>Dia da Semana</label>
        <select
          className="inputText selectInput"
          aria-label="Default select example"
          value={tempTraining.dayOfWeek}
          onChange={(e) =>
            setTempTraining({ ...tempTraining, dayOfWeek: e.target.value })
          }
        >
          <option hidden>Selecionar</option>
          <option value="segunda-feira">Segunda-feira</option>
          <option value="terça-feira">Terça-feira</option>
          <option value="quarta-feira">Quarta-feira</option>
          <option value="quinta-feira">Quinta-feira</option>
          <option value="sexta-feira">Sexta-feira</option>
          <option value="sábado">Sábado</option>
          <option value="domingo">Domingo</option>
        </select>
        <br />
        <span className="me-3">Exercício:</span>
        {tempTraining.exercises.map((exercise, index) => (
          <div key={index}>
            <input
              name="name"
              value={exercise.name}
              onChange={(event) => handleInputChange(index, event)}
              className="inputText"
              type="text"
              placeholder="Ex.: Agachamento com barra"
            />
            <D.DivInputs>
              <select
                className="inputText selectSeries"
                name="series"
                value={exercise.series}
                onChange={(event) => handleInputChange(index, event)}
                aria-label="Default select example"
              >
                <option hidden>Séries</option>
                {[2, 3, 4, 6, 8, 10, 12, 14, 16, 18, 20].map((value) => (
                  <option key={value} value={String(value)}>
                    {value}
                  </option>
                ))}
              </select>

              <select
                        className="inputText selectMenor"
                name="repetitions"
                value={exercise.repetitions}
                onChange={(event) => handleInputChange(index, event)}
                aria-label="Default select example"
              >
                <option hidden>Repetições</option>
                {[6, 8, 10, 12, 14, 16, 20, 22, 24, 26, 28, 30].map((value) => (
                  <option key={value} value={String(value)}>
                    {value}
                  </option>
                ))}
              </select>
            </D.DivInputs>
            {index === tempTraining.exercises.length - 1 && (
              <>
                <D.DivBtns>
                  {index > 0 && (
                    <Button
                      onClick={() => handleRemoveExercise(index)}
                      variant="danger"
                      className="shadow rounded-0"
                    >
                      &#45;
                    </Button>
                  )}
                  <Button
                    onClick={handleAddExercise}
                    className="Btns shadow rounded-0"
                    variant="success"
                  >
                    &#43;
                  </Button>
                </D.DivBtns>
              </>
            )}
          </div>
        ))}
        <Button className="rounded-0 BtnSalvar" onClick={handleSave} disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" className="shadow"/> : "Salvar"}
        </Button>

        <br />
        {ErrorMessage && <p>{ErrorMessage}</p>}
        {showMessage &&
          trainings.map((training, index) => (
            <div
              key={index}
              style={{ display: "flex", flexDirection: "column" }}
              className="text-capitalize"
            >
              <p>Treino de {training.dayOfWeek} Registrado com sucesso!</p>
              <span>
                Nome do Treino: <b>{training.trainingName}</b>
              </span>
              <span>
                Dia da Semana: <b>{training.dayOfWeek}</b>
              </span>
              <span>Exercícios:</span>
              {training.exercises.map((exercise, idx) => (
                <span key={idx}>
                  {" "}
                  <b> {exercise.name} - </b> {exercise.series} Séries |{" "}
                  {exercise.repetitions} Repetições.
                </span>
              ))}
            </div>
          ))}
      </D.DivRegister>
    </>
  );
};
