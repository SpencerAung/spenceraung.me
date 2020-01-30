import Typography from 'typography'
// import irvingTheme from 'typography-theme-irving'
import moragaTheme from 'typography-theme-moraga'

// moragaTheme.headerFontFamily = ['Lato', 'sans-serif']
const typography = new Typography(moragaTheme)
const { rhythm, scale } = typography

export { rhythm, scale, typography as default }
