import { type SchemaTypeDefinition } from 'sanity'
import { project } from './project'
import { profile } from './profile'
import { about } from './about'
import { resume } from './resume'
import { blog } from './blog'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, profile, about, resume, blog],
}
