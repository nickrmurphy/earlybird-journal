Use bun instead of npm or yarn to install dependencies and run scripts.

This project uses SolidJS, not React. Make sure to use SolidJS syntax and features when writing components.

Try to keep the code simple and avoid unnecessary complexity.

Use Tailwind CSS for styling whenever possible.

When styling components, use the custom colors defined in main.css, plus black and white only.

Avoid building one-off components and markup. Instead create small stateless components that can be reused across the application.
Also check the src/components directory for existing components that can be reused.

When creating new components, make sure to follow the naming conventions used in the project. Use PascalCase for component names and kebab-case for file names.

Avoid adding unnecessary dependencies. If you need to add a new dependency, make sure it is necessary and provides significant value. 
Instead of adding a new dependency, consider using existing libraries or writing your own code.

Always generate commit messages in this pattern: <type>: <description>
feat: - new features
fix: - bug fixes
update: - improvements/changes
refactor: - code restructuring
style: - formatting, CSS changes
docs: - documentation
chore: - maintenance tasks
