import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'design-mockup'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    /**
     * Maquette mise de cote, pas du code mort a supprimer.
     *
     * `WorkflowCanvas` presente le portfolio comme un workflow n8n : chaque
     * section devient un noeud d'un canevas deplacable, relie aux autres par des
     * cables animes. L'idee tient debout, elle n'a simplement jamais ete
     * branchee. `@xyflow/react`, qui fait tout le travail, n'est ni installe ni
     * declare dans package.json, et le `@ts-nocheck` en tete de fichier ne sert
     * qu'a masquer cet import introuvable. Rien ne l'importe, donc le bundle ne
     * le voit jamais et il ne coute rien a l'execution.
     *
     * On desactive les trois regles qu'il enfreint plutot que d'exclure le
     * fichier : `lint-staged` passe les chemins explicitement a eslint, et un
     * fichier exclu y declenche un avertissement fatal sous `--max-warnings 0`.
     * Ainsi il reste verifie sur tout le reste.
     *
     * Pour le reveiller : installer `@xyflow/react`, retirer le `@ts-nocheck`,
     * typer `NodeWrapper`, brancher `setNodes`, puis supprimer ce bloc.
     */
    files: ['src/app/WorkflowCanvas.tsx'],
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
);
