
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  photo: string;
  availability: string;
  status: "online" | "offline";
}

