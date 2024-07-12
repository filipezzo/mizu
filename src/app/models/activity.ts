export interface IActivityDetail {
  id: string;
  title: string;
  occurs_at: string;
  is_completed: boolean
}

export interface ISingleActivity{
date: string
activities: IActivityDetail[]
}

export interface IActivity {
  activities: ISingleActivity[]
}

export interface IActivityUpdateStatus {
  id: string;
  isCompleted: boolean
}