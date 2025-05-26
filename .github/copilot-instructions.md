# Development Guidelines

## Package Management
Use `bun` as the package manager for installing dependencies and running scripts instead of npm or yarn.

## Framework
This project uses **SolidJS**, not React. Ensure all components use SolidJS syntax, patterns, and features.

## Code Philosophy
- Keep code simple and avoid unnecessary complexity
- Prioritize readability and maintainability
- Follow existing project patterns and conventions

## Styling
- Use **Tailwind CSS** for all styling
- Limit color palette to:
    - Custom colors defined in `main.css`
    - Black and white only
- Avoid inline styles or custom CSS when Tailwind classes are available

## Component Architecture
- Create small, stateless, reusable components
- Avoid building one-off components or markup
- Check `src/components` directory for existing components before creating new ones
- Follow naming conventions:
    - **PascalCase** for component names
    - **kebab-case** for file names

## Dependencies
- Minimize external dependencies
- Only add dependencies that provide significant value
- Consider using existing libraries or writing custom code before adding new packages
- Evaluate if the functionality can be achieved with current dependencies

## Commit Message Format
Use the pattern: `<type>: <description>`

### Types
- `feat`: New features
- `fix`: Bug fixes  
- `update`: Improvements/changes
- `refactor`: Code restructuring
- `style`: Formatting, CSS changes
- `docs`: Documentation
- `chore`: Maintenance tasks

### Guidelines
- Keep messages concise
- Focus on what changed, not why (unless complex)
- Use present tense ("add" not "added")
