export const getStatusLabel = (status: string) => {
  switch (status) {
    case "upcoming":
      return "Próxima";
    case "active":
      return "Activa";
    case "past":
      return "Finalizada";
    default:
      return status;
  }
};
