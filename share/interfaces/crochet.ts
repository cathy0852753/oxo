export interface CrochetPattern {
  id: number;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  yarn: string;
  hookSize: string;
  estimatedTime_1: number;
  estimatedTime_2: "minute" | "hour";
  imageUrl: string;
  diagramSteps: string[];
  tags: string[];
}

export interface TagsColor {
  label: string;
  value: string;
  color: string;
  textColor: string;
}
