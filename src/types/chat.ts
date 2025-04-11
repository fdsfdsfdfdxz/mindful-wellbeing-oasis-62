
export interface Message {
  id: number;
  sender: "user" | "doctor";
  text: string;
  timestamp: string;
  read: boolean;
}

