import { enqueueSnackbar } from "notistack";

export const showInfo = (message: string) => {
  enqueueSnackbar(message, { variant: "info" });
};
