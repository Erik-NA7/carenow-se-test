import { register } from 'tsconfig-paths'
import { join } from 'path'

const baseUrl = join(__dirname, '..')
const paths = {
  "@/*": [process.env.NODE_ENV === 'production' ? "dist/*" : "src/*"]
}

register({ baseUrl, paths })