export const REMINDER_FREQUENCY_DAILY = "daily" as const;
export const REMINDER_FREQUENCY_WEEKLY = "weekly" as const;
export const REMINDER_FREQUENCY_MONTHLY = "monthly" as const;
export const REMINDER_FREQUENCY_YEARLY = "yearly" as const;

export const REMINDER_FREQUENCY_VALUES = {
  [REMINDER_FREQUENCY_DAILY]: "Diario",
  [REMINDER_FREQUENCY_WEEKLY]: "Semanal",
  [REMINDER_FREQUENCY_MONTHLY]: "Mensual",
  [REMINDER_FREQUENCY_YEARLY]: "Anual",
};

export interface Reminder {
  created_at: string;
  frequency: (typeof REMINDER_FREQUENCY_VALUES)[keyof typeof REMINDER_FREQUENCY_VALUES];
  id: string;
  is_active: boolean;
  message: string;
  name: string;
  phone_number: string;
  send_date: string;
  updated_at: string;
}
