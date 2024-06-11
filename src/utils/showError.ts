import { enqueueSnackbar } from "notistack";

export const showError = (message: string) => {
  enqueueSnackbar(message, { variant: "error" });
};
