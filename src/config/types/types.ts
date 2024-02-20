export interface loginPayload {
    email: string
    password: string
}

export interface ExerciciesInterface {
    name: string 
    series: string
    repetitions: string
}
export interface WorkoutInterface {
    trainingName: string
    dayOfWeek: string
    exercises: ExerciciesInterface[]
}


export interface Exercise {
    name: string;
    series: string;
    repetitions: string;
  }
  
 export interface Training {
    trainingName: string;
    dayOfWeek: string;
    exercises: Exercise[];
  }