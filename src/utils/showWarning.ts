import { enqueueSnackbar } from "notistack";

export const showWarning = (message: string) => {
  enqueueSnackbar(message, { variant: "warning" });
};
