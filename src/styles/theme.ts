import { createTheme, Theme, ThemeOptions } from "@mui/material";
import { colors, common, primary, severities } from "./colors";

const baseTheme = createTheme({
  typography: {
    fontFamily: "Mona sans, sans-serif",
    h1: {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "38px",
      lineHeight: "1.263em",
      letterSpacing: 0,
      color: `${colors.lightSteelBlue}`,
    },
    h2: {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "24px",
      lineHeight: "1.571em",
      letterSpacing: "0.069rem",
      color: `${colors.lightSteelBlue}`,
    },
    h3: {
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "22px",
      lineHeight: "1.273em",
      letterSpacing: "0.069rem",
      color: `${colors.lightSteelBlue}`,
    },
    h4: {
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: "16px",
      lineHeight: "1.375em",
      color: `${colors.lightSteelBlue}`,

      //   letterSpacing: "0.069rem",
      //   textTransform: "uppercase",
    },
    h5: {
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: "1.429em",
      //   letterSpacing: "0.038rem",
      //   textTransform: "uppercase",
    },
    h6: {
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "12px",
      lineHeight: "1.5em",
      //   letterSpacing: "0.063rem",
    },
    body1: {
      //large
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: "1.5em",
      color: `${colors.lightSteelBlue}`,

      //   letterSpacing: "0.063rem",
      //   fontFeatureSettings: `"zero" on`,
    },
    body2: {
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: "1.5em",
      //   letterSpacing: "0.063rem",
      //   fontFeatureSettings: `"zero" on`,
      //   fontVariantNumeric: "tabular-nums",
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: "1.1143em",
      color: `${colors.lightSteelBlue}`,
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: "12px",
      lineHeight: "1.167em",
    },
    button: {
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: "1.05rem",
      letterSpacing: "0.053.rem",
      textTransform: "uppercase",
    },
  },
});

const lightPalette: ThemeOptions = {
  palette: {
    mode: "light",
    success: {
      main: "#34dea9",
      dark: "#2d8376",
    },
    info: {
      main: "#297ceb",
      dark: "#256faf",
      light: "#3BABFF",
    },
    error: {
      main: `${severities.error}`,
      // dark: "#7f5072",
    },
    warning: {
      main: "#ffb179",
      dark: "#94645f",
    },
    primary: {
      main: `${colors.purple}`,
      light: `${colors.charcoal}`,
      dark: `${colors.maastrichtBlue}`,
    },
    secondary: {
      main: "#3babff",
      dark: "#76a7dc",
    },
    background: {
      default: "#FFFFFF",
      paper: "#F1F3F9",
    },
    common: {
      black: "#ffffff",
      white: "#000000",
    },
  },
};

function createComponents(theme: Theme) {
  const components: ThemeOptions = {
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            color: `${colors.lightSteelBlue}`,

            transition: "all .2s ease-in-out",
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              background: "transparent",
              width: "0.5rem",
              height: "0.5rem",
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              background: theme.palette.primary.light,
            },
            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
              {
                backgroundColor: theme.palette.primary.light,
              },
            "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
              backgroundColor: theme.palette.primary.light,
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            width: "fit-content",
            color: `${colors.purple}`,
            textDecoration: "none",
            "&:hover": {
              color: "#FFF",
              cursor: "pointer",
              transition: "all .2s ease-in-out",
            },
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            padding: baseTheme.spacing(3),
          },
        },
      },
      MuiInputLabel: {
        // LABEL ///
        styleOverrides: {
          root: {
            textTransform: "capitalize",
            color: `${colors.lightSteelBlue}`,
            "&.Mui-focused": {
              color: `${common.purple}`,
            },
          },
          outlined: {
            borderRadius: 4,
            border: "none",
            // padding: "14px",
            "&.Mui-focused": {
              backgroundColor: "tranparent",
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            letterSpacing: ".5px",
            "&:hover": {},
            "&.Mui-focused": {},
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            "&.Mui-focused": {},
          },
        },
      },
      MuiOutlinedInput: {
        //text on border
        styleOverrides: {
          root: {
            color: "#FFF",
            backgroundColor: `${colors.maastrichtBlue}`,
            "&:hover": {
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: `${colors.shadowBlue}`,
              },
            },
            "&.Mui-focused": {
              ".MuiOutlinedInput-notchedOutline": {
                border: `.6px solid ${colors.purple} !important`,
              },
            },
          },
          notchedOutline: {
            transition: "all .2s ease-in-out",
            border: `.6px solid ${colors.charcoal}`, //fieldset border
            "&:hover": {
              border: `.6px solid ${colors.shadowBlue}`,
            },
          },
        },
      },

      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            "&.Mui-disabled": {
              color: theme.palette.primary.dark,
            },
          },

          sizeSmall: {
            height: "1.25rem",
            fontWeight: 500,
            fontSize: "0.688rem",
            lineHeight: "0.825rem",
            letterSpacing: "0.047rem",
          },
          sizeMedium: {
            height: "40px",
            fontWeight: 500,
          },
          sizeLarge: {
            height: "46px",
            fontWeight: 500,
            fontSize: "0.875rem",
            lineHeight: "1.05rem",
            letterSpacing: "0.053rem",
          },
          containedPrimary: {
            background: `${primary.background}`,
            color: `${primary.color}`,
            "@media(hover: hover)": {
              "&:hover": {
                background: `${primary.hover}`,
              },
            },
          },
          containedSecondary: {
            color: theme.palette.primary.main,
            background: theme.palette.primary.dark,
            "@media(hover: hover)": {
              "&:hover": {
                boxShadow: `0 0 0 0.4rem ${theme.palette.primary.dark}`,
                background: theme.palette.primary.dark,
              },
            },
          },
          outlinedPrimary: {
            color: `${colors.lightSteelBlue}`,
            // color: "#FFF",
            border: `1px solid ${colors.charcoal}`,
            "@media(hover: hover)": {
              "&:hover": {
                // transform: "scale(1.01)",
                transition: ".2s ease-in-out",
                color: "#FFF",
              },
            },
          },
        },
      },
    },
  };
  return createTheme(theme, components);
}

export const theme = createComponents(createTheme(baseTheme, lightPalette));
